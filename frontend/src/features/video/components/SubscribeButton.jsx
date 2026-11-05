import { useSubscription } from "../hooks/useSubscription.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { useNavigate } from "react-router-dom";

function SubscribeButton({ channelOwnerId }) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const isOwner = user?._id === channelOwnerId;

  const { isSubscribe, subscribe } = useSubscription({
    channelId: channelOwnerId,
  });
  async function handleSubscribe() {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    subscribe();
  }

  return (
    <div className="h-full">
      {!isOwner && (
        <button
          type="button"
          onClick={handleSubscribe}
          className="flex items-center justify-center size-full"
        >
          <div
            className={`flex font-medium text-sm px-3 items-center justify-center  size-full  rounded-full ${isSubscribe ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-black text-white hover:bg-black/85"}`}
          >
            {isSubscribe ? "Subscribed" : "Subscribe"}
          </div>
        </button>
      )}
    </div>
  );
}

export { SubscribeButton };
