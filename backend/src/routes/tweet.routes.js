import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.route("/:ownerId").get(getUserTweets);

router.route("/").post(verifyJWT, createTweet);

router.route("/:tweetId")
  .patch(verifyJWT, updateTweet)
  .delete(verifyJWT, deleteTweet);

export default router;
