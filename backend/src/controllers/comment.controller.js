import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const aggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "commenterDetails",
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
    {
      $unwind: "$commenterDetails",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,
        username: "$commenterDetails.username",
        avatar: "$commenterDetails.avatar",
      },
    },
  ]);

  const allVideoComment = await Comment.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allVideoComment,
        "Video's comment fetched successfully"
      )
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video

  const { content } = req.body;
  const { videoId } = req.params;

  if (!content?.trim()) {
    throw new ApiError(400, "Comment should not be empty");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const addedComment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  if (!addedComment) {
    throw new ApiError(500, "Failed to add comment");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, addedComment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content, videoId } = req.body;

  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment Not Found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Comment should not be empty");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { returnDocument: "after" }
  );

  if (!updatedComment) {
    throw new ApiError(500, "Failed to update comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment

  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment Not Found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(500, "Failed to delete comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted succcessfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
