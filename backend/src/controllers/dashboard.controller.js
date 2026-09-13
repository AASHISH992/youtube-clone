import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }
  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }
  const totalVideos = await Video.countDocuments({ owner: new mongoose.Types.ObjectId(channelId) });

  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  const totalLikes = await Like.countDocuments({ likedBy: channelId });

  const totalViews = await Video.aggregate([
    {
      $match: {
        owner: channelId,
        isPublished: true,
      },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalVideos, totalSubscribers, totalLikes, totalViews },
        "Channel stats fetched successfully"
      )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { channelId } = req.params;

  const { page = 1, limit = 10 } = req.query;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }
  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const aggregate = Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(channelId),
        isPublished: true,
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
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const allVideos = await Video.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  if (!allVideos) {
    throw new ApiError(500, "Failed to fetch videos");
  }

  res
    .status(200)
    .json(new ApiResponse(200, allVideos, " Videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
