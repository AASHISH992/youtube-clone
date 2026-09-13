import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video Not Found");
  }

  const likedVideo = await Like.findOne({
    video: new mongoose.Types.ObjectId(videoId),
    likedBy: req.user._id,
  });

  if (!likedVideo) {
    const like = await Like.create({
      video: new mongoose.Types.ObjectId(videoId),
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Failed to like video");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video liked successfully"));
  } else {
    await Like.deleteOne({
      video: new mongoose.Types.ObjectId(videoId),
      likedBy: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video disliked successfully"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment Not Found");
  }

  const likedComment = await Like.findOne({
    comment: new mongoose.Types.ObjectId(commentId),
    likedBy: req.user._id,
  });

  if (!likedComment) {
    const like = await Like.create({
      comment: new mongoose.Types.ObjectId(commentId),
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Failed to like comment");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment liked successfully"));
  } else {
    await Like.deleteOne({
      comment: new mongoose.Types.ObjectId(commentId),
      likedBy: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment disliked successfully"));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet Not Found");
  }

  const likedTweet = await Like.findOne({
    tweet: new mongoose.Types.ObjectId(tweetId),
    likedBy: req.user._id,
  });
  if (!likedTweet) {
    const like = await Like.create({
      tweet: new mongoose.Types.ObjectId(tweetId),
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Failed to like tweet");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Tweet liked successfully"));
  } else {
    await Like.deleteOne({
      tweet: new mongoose.Types.ObjectId(tweetId),
      likedBy: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Tweet disliked successfully"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const { page = 1, limit = 10 } = req.query;

  const aggregate = Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user._id),
        video: { $ne: null }, // Select only likes that belong to a video( there are some likes without a video example comment, tweet, etc)
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideos",
        pipeline: [
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
                  },
                },
              ],
            },
          },
          { $unwind: "$owner" },
          {
            $project: {
              _id: 1,
              videoFile: 1,
              thumbnail: 1,
              title: 1,
              description: 1,
              duration: 1,
              views: 1,
              avatar: "$owner.avatar",
              username: "$owner.username",
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$likedVideos",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: "$likedVideos._id",
        createdAt: "$likedVideos.createdAt",
        videoFile: "$likedVideos.videoFile",
        thumbnail: "$likedVideos.thumbnail",
        title: "$likedVideos.title",
        description: "$likedVideos.description",
        duration: "$likedVideos.duration",
        views: "$likedVideos.views",
        avatar: "$likedVideos.avatar",
        username: "$likedVideos.username",
      },
    },
  ]);

  const allLikedVideos = await Like.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, allLikedVideos, " Liked Video fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
