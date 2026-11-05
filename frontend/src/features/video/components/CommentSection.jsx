import {
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
  AvatarShapeAvatarSizeExtraSmall,
  AvatarShapeAvatarSizeSmall,
  Input,
  Button,
} from "../../../shared/components/index.js";
import { Pen, Trash, Flag } from "lucide-react";

import defaultAvatar from "../../../assets/346569.png";
import { LikeButton, DislikeButton } from "./";
import { useComment } from "../hooks/useComment.js";
import { formatDate } from "../../../shared/utils/index.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { useState } from "react";
import ThreeDotMenu from "../../../shared/components/ThreeDotMenu.jsx";
import { useLike } from "../hooks/useLike.js";
import { useNavigate } from "react-router-dom";

function CommentSection({ videoId }) {
  const {
    comments,
    isLoading,
    error,
    addComment,
    deleteComment,
    updateComment,
  } = useComment(videoId);
  const [commentText, setCommentText] = useState("");

  const navigate = useNavigate();

  async function handleDislike(e) {
    e.preventDefault();
    console.log("disliked");
  }

  const { isLoggedIn, user } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    if (!commentText.trim()) {
      alert("Please fill all the fields");
      return;
    }

    await addComment(videoId, commentText.trim());
    setCommentText("");
  }

  return (
    <div className="w-full h-full">
      <div className=" w-full my-6 ">
        <div className="flex w-full h-7 mb-4">
          <div className="flex mr-8">
            {/* Total Comments */}
            <div>
              <AttributedStringHost>
                <AttributedStringWhiteSpacePreWrap>
                  <p className="text-xl font-bold antialiased h-full flex justify-center items-center ">
                    {comments.totalDocs}
                  </p>
                </AttributedStringWhiteSpacePreWrap>
              </AttributedStringHost>
            </div>

            <div>
              <AttributedStringHost>
                <AttributedStringWhiteSpacePreWrap>
                  <p className="text-xl font-bold antialiased h-full flex justify-center  items-center pl-2">
                    Comments
                  </p>
                </AttributedStringWhiteSpacePreWrap>
              </AttributedStringHost>
            </div>
          </div>
          <div>
            <AttributedStringHost>
              <AttributedStringWhiteSpacePreWrap>
                <p className="text-md font-medium antialiased h-full flex justify-center  items-center pl-2">
                  Sort By
                </p>
              </AttributedStringWhiteSpacePreWrap>
            </AttributedStringHost>
          </div>
        </div>

        <div
          className={`flex my-2  group w-full ${commentText.trim() ? "h-19" : "h-9"} `}
        >
          <img
            src={isLoggedIn && user?.avatar ? user.avatar : defaultAvatar}
            alt="Your avatar"
            className="rounded-full size-6 "
          />

          <form className="w-full group ml-3" onSubmit={handleSubmit}>
            <input
              value={commentText}
              placeholder="Add a comment..."
              className="text-sm w-full h-6 border-b border-gray-300 outline-none focus:border-black "
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />

            {commentText.trim() && (
              <div className="flex my-2 gap-2 justify-end">
                <Button
                  type="button"
                  className="w-20 h-9 border-gray-300 outline-none "
                  bgColor="bg-white hover:bg-gray-300"
                  textColor="text-black"
                  onClick={() => {
                    setCommentText("");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="w-26 h-9 px-2 border-gray-300 outline-none"
                  bgColor={commentText.trim() ? "bg-black " : "bg-gray-100"}
                  textColor={
                    commentText.trim() ? "text-white" : "text-gray-500"
                  }
                  disabled={!commentText.trim()}
                >
                  Comment
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Comments */}
      <AllComments
        comments={comments?.docs || []}
        onDeleteComment={deleteComment}
        onUpdateComment={updateComment}
        currentUser={user}
        handleDislike={handleDislike}
      />
    </div>
  );
}
function AllComments({
  comments = [],
  onDeleteComment,
  onUpdateComment,
  currentUser,
  handleDislike,
}) {
  return (
    <div className="flex flex-wrap whitespace-pre-line w-full">
      {comments.map((comment) => {
        // Build unique actions per unique comment item
        const menuItems = [];

        // Simple YouTube-style logic: only let the author edit or delete their own comment
        const isAuthor =
          currentUser &&
          (currentUser._id === comment.owner ||
            currentUser.username === comment.username);

        if (isAuthor) {
          menuItems.push(
            {
              label: "Edit",
              icon: <Pen className="size-4 mr-2 inline" />,
              onClick: () => {
                const newText = prompt("Edit your comment:", comment.content);
                if (newText && newText.trim() !== comment.content) {
                  onUpdateComment(comment._id, newText.trim());
                }
              },
            },
            {
              label: "Delete",
              icon: <Trash className="size-4 mr-2 inline" />,
              onClick: () => {
                if (confirm("Are you sure you want to delete this comment?")) {
                  onDeleteComment(comment._id);
                }
              },
              isDanger: true,
            },
          );
        } else {
          // Standard options visible to anyone else
          menuItems.push({
            label: "Report",
            icon: <Flag className="size-4 mr-2 inline" />,
            onClick: () => alert(`Reported comment ${comment._id}`),
          });
        }

        return (
          <Comments
            key={comment._id}
            id={comment._id}
            isAuthor={isAuthor}
            authorAvatar={comment.avatar}
            authorUsername={comment.username}
            commentContent={comment.content}
            uploadDate={formatDate(comment.createdAt)}
            menuItems={menuItems}
            handleDislike={handleDislike}
          />
        );
      })}
    </div>
  );
}

function Comments({
  id,
  isAuthor,
  authorAvatar,
  authorUsername,
  uploadDate,
  commentContent,
  menuItems,
  handleDislike,
}) {
  const { isLiked, like, likeCount } = useLike({ commentId: id });

  return (
    <div className={`flex w-full mb-4 ${!isAuthor ? "h-20" : "h-12"}`}>
      <AvatarShapeAvatarSizeSmall>
        <img
          src={authorAvatar}
          alt="author"
          className="rounded-xl w-full h-full"
        />
      </AvatarShapeAvatarSizeSmall>

      <div className="flex justify-between ml-3 w-full ">
        <div>
          <div className="text-sm flex w-full">
            <AttributedStringHost>
              <AttributedStringWhiteSpacePreWrap>
                <p className="mr-1">{`@ ${authorUsername}`}</p>
              </AttributedStringWhiteSpacePreWrap>
            </AttributedStringHost>

            <AttributedStringHost>
              <AttributedStringWhiteSpacePreWrap>
                <p className="text-gray-600">{`${uploadDate}`}</p>
              </AttributedStringWhiteSpacePreWrap>
            </AttributedStringHost>
          </div>

          <div className="flex w-full text-md">{commentContent}</div>
          {!isAuthor && (
            <div className="h-9 w-full flex">
              <button onClick={() => like()} type="button">
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  className="h-full"
                />
              </button>
              <button onClick={handleDislike} type="button">
                <DislikeButton />
              </button>
            </div>
          )}
        </div>
        <ThreeDotMenu items={menuItems} />
      </div>
    </div>
  );
}

export { CommentSection };
