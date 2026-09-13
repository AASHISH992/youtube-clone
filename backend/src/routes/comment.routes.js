import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/video/:videoId")
  .get(getVideoComments)
  .post(verifyJWT, addComment);

router.route("/:commentId")
  .patch(verifyJWT, updateComment)
  .delete(verifyJWT, deleteComment);

export default router;
