import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const LikeSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

LikeSchema.plugin(mongooseAggregatePaginate);

export const Like = mongoose.model("Like", LikeSchema);

