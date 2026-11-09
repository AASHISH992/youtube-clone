import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const isVideoOwner = async (videoId, loggedInUser) => {
  const existingVideo = await Video.findById(videoId);

  if (!existingVideo) {
    throw new ApiError(404, "Video not found");
  }

  if (existingVideo.owner.toString() !== loggedInUser?._id.toString()) {
    throw new ApiError(403, "Only owner is allowed to change");
  }

  return existingVideo;
};

const publishVideo = asyncHandler(async (req, res) => {
  // get video data
  // check is empty
  //upload videofile on cloudinary
  //create video
  //return res
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "title and description are required");
  }

  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!(videoFileLocalPath && thumbnailLocalPath)) {
    throw new ApiError(400, "video file and thumbnail are required");
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);

  if (!videoFile) {
    throw new ApiError(500, "Failed to upload video file on cloud storage");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(500, "Failed to upload thumbnail on cloud storage");
  }
  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration: videoFile.duration,
    owner: req.user._id,
    videoFilePublicId: videoFile.public_id,
    thumbnailPublicId: thumbnail.public_id,
  });

  if (!video) {
    throw new ApiError(500, "Failed to publish video in the database");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video upload successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  // get videoid
  // validate video id
  // in video add username , fullname , avatar
  // check if video present or not
  // increase views count
  // add video into watch history
  // return res

  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid vider id format");
  }
  // Increment views. If the video doesn't exist, findByIdAndUpdate() returns null.
  const updatedVideoViewCount = await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: { views: 1 },
    },
    { returnDocument: "after" }
  );

  if (!updatedVideoViewCount) {
    throw new ApiError(404, "Video not found");
  }
  //  const video = await Video.findById(videoId).populate(
  //   "owner",
  //  "username fullName avatar"
  // );

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        "owner._id": 1,
        "owner.username": 1,
        "owner.avatar": 1,
        "owner.fullName": 1,
        thumbnail: 1,
        videoFile: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        createdAt: 1,
        _id: 1,
      },
    },
  ]);

  if (req.user?._id) {
    const videoObjectId = new mongoose.Types.ObjectId(videoId);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        watchHistory: { video: videoObjectId },
      },
    });

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          watchHistory: {
            video: new mongoose.Types.ObjectId(videoId),
            watchedAt: new Date(),
          },
        },
      },
      { returnDocument: "after" }
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video[0], "Video fetched successfully"));
});

const getAllVideos = asyncHandler(async (req, res) => {
  // get /videos?page=2&limit=10&query= node
  // Read req.query
  // Build $match object
  // $match filter videos
  // $lookup owner details
  // $unwind owner array -> object
  // $project keep required fields
  // $sort
  // aggregatePaginate()
  // return res
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const matchStage = {
    isPublished: true,
  };

  // Search by title
  if (query?.trim()) {
    matchStage.title = {
      $regex: query,
      $options: "i",
    };
  }

  //Filter by uploader
  if (userId) {
    if (!mongoose.isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid user id");
    }
    matchStage.owner = new mongoose.Types.ObjectId(userId);
  }

  const aggregate = Video.aggregate([
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        createdAt: 1,
        owner: 1,
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    },
  ]);

  const videos = await Video.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const updateThumbnail = asyncHandler(async (req, res) => {
  // get video id
  // get video thumbnail
  // check video id's owner and logged in user'id
  // check it is not video file
  // upload thumbnail on cloudinary
  // unlink thumbnail
  // update thumbnail
  // return res

  const { videoId } = req.params;

  const video = await isVideoOwner(videoId, req.user);
  //const existingVideo = await Video.findById(videoId);

  //if (!existingVideo) {
  // throw new ApiError(404, "Video not found");
  //}

  //if (existingVideo.owner.toString() !== req.user?._id.toString()) {
  // throw new ApiError(403, "Only owner is allowed to change");
  //}

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(500, "error in uploading on cloud storage");
  }

  const updatedThumbnail = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        thumbnail: thumbnail.url,
        thumbnailPublicId: thumbnail.public_id,
      },
    },
    { returnDocument: "after" }
  );
  if (!updatedThumbnail) {
    throw new ApiError(500, "failed to upload video");
  }

  const deleteResult = await deleteOnCloudinary(
    video.thumbnailPublicId,
    "image"
  );

  if (deleteResult.result !== "ok") {
    throw new ApiError(500, "Failed to delete thumbnail on cloud storage");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "thumbnail updated successfully"));
});

const updateVideoDetails = asyncHandler(async (req, res) => {
  // check isVideoOwner same as logged in user otherwise throw error
  // get title and discription
  // check title and discription shouldn't be empty
  //update details
  // return res

  const { videoId } = req.params;

  await isVideoOwner(videoId, req.user);

  const { title, description } = req.body;

  const updatedFields = {};

  if (title?.trim()) {
    updatedFields.title = title.trim();
  }
  if (description?.trim()) {
    updatedFields.description = description.trim();
  }
  if (Object.keys(updatedFields).length === 0) {
    throw new ApiError(400, "Title or Discription is required");
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: updatedFields,
    },
    { returnDocument: "after" }
  );

  if (!updatedVideo) {
    throw new ApiError(500, "Failed to update video details");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideo, "Video details updated successfully")
    );
  //  if (!(
  //    [title].some((field) => field?.trim() === "") &&
  //    [description].some((field) => field?.trim() === "")
  //  )) {
  //    throw new ApiError(400, "Title or Discription is required");
  //  }

  //  let updatedVideoTitle;
  //  if ([title].some((field) => field?.trim() !== "")) {
  //    updatedVideoTitle = await Video.findByIdAndUpdate(
  //      req.video._id,
  //      {
  //        $set: {
  //          title: title,
  //        },
  //      },
  //      { returnDocument: "after" }
  //    );
  //    if (!updatedVideoTitle) {
  //      throw new ApiError(500, "Failed to update title");
  //    }
  //  }
  //
  //  let updatedVideoDescription;
  //  if ([description].some((field) => field?.trim() !== "")) {
  //    updatedVideoDescription = await Video.findByIdAndUpdate(
  //      req.video._id,
  //      {
  //        $set: {
  //          description: description,
  //        },
  //      },
  //      { returnDocument: "after" }
  //    );
  //    if (!updatedVideoDescription) {
  //      throw new ApiError(500, "Failed to update description");
  //    }
  //  }
  //  if (!updatedVideoTitle) {
  //    return res
  //      .status(200)
  //      .json(
  //        new ApiResponse(
  //          200,
  //          updatedVideoDescription,
  //          "Discription updated successfully"
  //        )
  //      );
  //  } else if (!updatedVideoDescription) {
  //    return res
  //      .status(200)
  //      .json(
  //        new ApiResponse(200, updatedVideoTitle, "Title updated successfully")
  //      );
  //  } else {
  //    return res
  //      .status(200)
  //      .json(
  //        new ApiResponse(
  //          200,
  //          { updatedVideoTitle, updatedVideoDescription },
  //          "Title and Discription updated successfully"
  //        )
  //      );
  //  }
});

const deleteVideoById = asyncHandler(async (req, res) => {
  // get video id
  // check isVideoOwner
  // find video
  // delete video
  // return res

  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid vider id format");
  }

  const video = await isVideoOwner(videoId, req.user);

  const deletedVideo = await deleteOnCloudinary(
    video.videoFilePublicId,
    "video"
  );

  const deletedThumbnail = await deleteOnCloudinary(
    video.thumbnailPublicId,
    "image"
  );

  if (deletedVideo.result !== "ok") {
    throw new ApiError(500, "Failed to delete video on cloud");
  }

  if (deletedThumbnail.result !== "ok") {
    throw new ApiError(500, "Failed to delete thumbnail on cloud");
  }

  const deleteVideoMetaData = await Video.findByIdAndDelete(videoId);

  if (!deleteVideoMetaData) {
    throw new ApiError(500, "Failed to delete video metadata");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video deleted successfully"));
});

// If we want toggle button
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid vider id format");
  }

  const video = await isVideoOwner(videoId, req.user);

  const updatedVideo = await Video.findByIdAndUpdate(videoId, {
    $set: {
      isPublished: !video.isPublished,
    },
  });

  if (!updatedVideo) {
    throw new ApiError(500, "Failed to toggle");
  }

  return res.status(200).json(new ApiResponse(200, "Toggle Successfully"));
});

// this one for if data comes from  req.body
const updatePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { isPublished } = req.body;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id format");
  }

  if (typeof isPublished !== "boolean") {
    throw new ApiError(400, "isPublished must be a boolean");
  }

  await isVideoOwner(videoId, req.user);

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished,
      },
    },
    {
      returnDocument: "after",
    }
  );

  if (!updatedVideo) {
    throw new ApiError(500, "Failed to update publish status");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedVideo,
        `Video ${isPublished ? "published" : "unpublished"} successfully`
      )
    );
});

export {
  publishVideo,
  getVideoById,
  updateThumbnail,
  updateVideoDetails,
  deleteVideoById,
  getAllVideos,
  togglePublishStatus,
  updatePublishStatus,
};
