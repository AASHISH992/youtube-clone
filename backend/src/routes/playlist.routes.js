import { Router } from "express";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/users/:userId").get(getUserPlaylists);

router.route("/:playlistId")
  .get(getPlaylistById)
  .patch(verifyJWT, updatePlaylist)
  .delete(verifyJWT, deletePlaylist);

router.route("/").post(verifyJWT, createPlaylist);

router.route("/:playlistId/videos/:videoId")
  .post(verifyJWT, addVideoToPlaylist)
  .delete(verifyJWT, removeVideoFromPlaylist);

export default router;
