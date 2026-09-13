import mongoose, { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  if (channelId === req.user._id.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const subscription = await Subscription.findOne({
    channel: channelId,
    subscriber: req.user._id,
  });
  if (!subscription) {
    const subscribed = await Subscription.create({
      channel: channelId,
      subscriber: req.user._id,
    });

    if (!subscribed) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, " Failed to subscribe channel"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, " Channel subscribed successfully"));
  } else {
    const unsubscribed = await Subscription.deleteOne({
      channel: channelId,
      subscriber: req.user._id,
    });

    if (!unsubscribed) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Failed to unsubscribe channel"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Channel unsubscribed successfully"));
  }
});

// controller to return subscriber list of a channel
const getChannelSubscribers = asyncHandler(async (req, res) => {
  // get channel
  // validate channel
  // lookup user id where channel === given channel
  // then count document how using $count
  // $project count
  // return res
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  //const skip = (page - 1) * limit;

  //const subscriberCount = await Subscription.aggregate([
  //  {
  //
  //  $match: {
  //      channel: new mongoose.Types.ObjectId(channel),
  //    },
  //  },
  //    {
  //     $count: "totalSubscribers",
  //   },
  //  ]);

  //  const totalSubscriberCount =
  //    subscriberCount.length > 0 ? subscriberCount[0].totalSubscribers : 0;

  //  const totalSubscriberCount = await Subscription.countDocuments({
  //      channel: channelId,
  //  });

  // const totalPages = Math.ceil(totalSubscriberCount / limit);

  //  let subscribers = [];
  //  if (totalSubscriberCount > 0) {
  //    subscribers = await Subscription.aggregate([
  //      {
  //        $match: {
  //          channel: new mongoose.Types.ObjectId(channelId),
  //        },
  //     },
  //     {
  //       $lookup: {
  //        from: "users",
  //        localField: "subscriber",
  //        foreignField: "_id",
  //       as: "subscriber",
  //       pipeline: [
  //         {
  //          $project: {
  //            username: 1,
  //            avatar: 1,
  //         },
  //       },
  //     ],
  //  },
  //},
  // {
  //  $unwind: "$subscriber",
  //},
  // {
  //  $project: {
  //    _id: "$subscriber._id",
  //    username: "$subscriber.username",
  //   avatar: "$subscriber.avatar",
  // },
  //},
  //{
  //  $skip: skip,
  //},
  // {
  //   $limit: limit,
  // },
  //]);
  // }

  const aggregate = Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
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
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: "$subscriber._id",
        username: "$subscriber.username",
        avatar: "$subscriber.avatar",
      },
    },
  ]);

  const subscribers = await Subscription.aggregatePaginate(aggregate, {
    page,
    limit,
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  //  const { subscriberId } = req.params;

  const subscriberId = req.user._id;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber id");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  //there is still a database call, but aggregatePaginate() is supposed to make that call.
  //If you await the aggregation first,
  //you've already executed it and lost the pipeline that the plugin needs to work with.

  const aggregate = Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelDetails",
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
      $unwind: "$channelDetails",
    },
    {
      $project: {
        _id: "$channelDetails._id",
        username: "$channelDetails.username",
        avatar: "$channelDetails.avatar",
      },
    },
  ]);

  const subscribedChannels = await Subscription.aggregatePaginate(aggregate, {
    page,
    limit,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed channels fetched successfully"
      )
    );
});

export { toggleSubscription, getChannelSubscribers, getSubscribedChannels };
