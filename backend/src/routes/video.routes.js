import { Router } from "express";
import {
  publishVideo,
  getVideoById,
  updateThumbnail,
  updateVideoDetails,
  deleteVideoById,
  getAllVideos,
  togglePublishStatus,
  updatePublishStatus,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/publish").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo
);

router.route("/").get(getAllVideos);

router.route("/:videoId")
  .get(getVideoById)
  .patch(verifyJWT, updatePublishStatus)
  .delete(verifyJWT, deleteVideoById)


router.route("/:videoId/thumbnail")
  .patch(verifyJWT, upload.single("thumbnail"), updateThumbnail);

router.route("/:videoId/details").patch(verifyJWT, updateVideoDetails);
router.route("/:videoId/toggle-publish").patch(verifyJWT, togglePublishStatus);

export default router;
