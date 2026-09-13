import {Router} from "express"
import {
    getChannelStats,
    getChannelVideos
} from "../controllers/dashboard.controller.js";

const router = Router();

router.route("/:channelId").get(getChannelStats);
router.route("/:channelId/videos").get(getChannelVideos);

export default router;
