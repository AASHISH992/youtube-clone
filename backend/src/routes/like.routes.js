import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  getVideoLikeStatus,
  getCommentLikeStatus,
    getVideoLikeCount,
    getCommentLikeCount,
} from "../controllers/like.controller.js";

const router = Router();

router.route("/videos/:videoId").post(verifyJWT, toggleVideoLike);

router.route("/videos/:videoId/status").get(verifyJWT, getVideoLikeStatus);

router.route("/videos/:videoId/count").get(getVideoLikeCount);

router.route("/videos").get(verifyJWT, getLikedVideos);

router.route("/comments/:commentId").post(verifyJWT, toggleCommentLike);
router
  .route("/comments/:commentId/status")
  .get(verifyJWT, getCommentLikeStatus);

router.route("/comments/:commentId/count").get(getCommentLikeCount);

router.route("/tweets/:tweetId").post(verifyJWT, toggleTweetLike);

export default router;
