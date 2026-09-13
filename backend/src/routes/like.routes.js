import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
} from "../controllers/like.controller.js";

const router = Router();

router.route("/videos/:videoId")
    .post(verifyJWT, toggleVideoLike);

router.route("/videos")
    .get(verifyJWT, getLikedVideos);

router.route("/comments/:commentId")
    .post(verifyJWT, toggleCommentLike);

router.route("/tweets/:tweetId")
    .post(verifyJWT, toggleTweetLike);


export default router;
