import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleSubscription,
  getChannelSubscribers,
  getSubscribedChannels,
  getSubscriptionStatus,
  getChannelSubscribersCount,
} from "../controllers/subscription.controller.js";

const router = Router();

router
  .route("/:channelId")
  .get(verifyJWT, getChannelSubscribers)
  .patch(verifyJWT, toggleSubscription);

router.route("/").get(verifyJWT, getSubscribedChannels);

router.route("/:channelId/status").get(verifyJWT, getSubscriptionStatus);

router.route("/:channelId/count").get(getChannelSubscribersCount);

export default router;
