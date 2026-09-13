import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Tweet should not be empty");
  }

  const createdTweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  if (!createdTweet) {
    throw new ApiError(500, "Failed to create tweet");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const { ownerId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(ownerId)) {
    throw new ApiError(400, "Invalid Owner Id");
  }

  const aggregate = Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(ownerId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "tweeterDetails",
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
      $unwind: "$tweeterDetails",
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
        updatedAt: 1,
        username: "$tweeterDetails.username",
        avatar: "$tweeterDetails.avatar",
      },
    },
  ]);

  const allTweet = await Tweet.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  res
    .status(200)
    .json(new ApiResponse(200, allTweet, "Tweet fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { content } = req.body;

  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet Not Found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Tweet should not be empty");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
          content: content.trim(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  if (!updatedTweet) {
    throw new ApiError(500, "Failed to update tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet

  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet Not Found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deletedTweet) {
    throw new ApiError(500, "Failed to delete tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "Tweet deleted succcessfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
