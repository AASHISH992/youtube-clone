import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleSubscription,
  getChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/:channelId")
  .get(verifyJWT, getChannelSubscribers)
  .patch(verifyJWT, toggleSubscription);

router.route("/").get(verifyJWT, getSubscribedChannels);

export default router;
