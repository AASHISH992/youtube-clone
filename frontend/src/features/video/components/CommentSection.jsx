import {
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
  AvatarShapeAvatarSizeExtraSmall,
  AvatarShapeAvatarSizeSmall,
  Input,
  Button,
} from "../../../shared/components/index.js";
import defaultAvatar from "../../../assets/346569.png";
import { LikeButton } from "./";
import { useComment } from "../hooks/useComment.js";
import { formatDate } from "../../../shared/utils/index.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { useState } from "react";
import { ButtonLink } from "../../../shared/components/ButtonLink.jsx";

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

  const { isLoggedIn, user } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();

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

        <div className="flex h-19 my-2  group w-full ">
          <div>
            <AvatarShapeAvatarSizeExtraSmall>
              <img
                src={isLoggedIn && user?.avatar ? user.avatar : defaultAvatar}
                alt="Your avatar"
                className="rounded-xl w-full h-full"
              />
            </AvatarShapeAvatarSizeExtraSmall>
          </div>
          <form className="w-full group ml-3" onSubmit={handleSubmit}>
            <Input
              value={commentText}
              placeholder="Add a comment..."
              className="w-full h-6 border-b border-gray-300 outline-none focus:border-black "
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />

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
                textColor={commentText.trim() ? "text-white" : "text-gray-500"}
                disabled={!commentText.trim()}
              >
                Comment
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments */}
      <AllComments comments={comments?.docs || []} />
    </div>
  );
}

function AllComments({ comments = [] }) {
  return (
    <div className="flex flex-wrap whitespace-pre-line w-full">
      {comments.map((comment) => (
        <Comments
          key={comment._id}
          id={comment._id}
          authorAvatar={comment.avatar}
          authorUsername={comment.username}
          commentContent={comment.content}
          uploadDate={formatDate(comment.createdAt)}
        />
      ))}
    </div>
  );
}

function Comments({
  authorAvatar,
  authorUsername,
  uploadDate,
  commentContent,
  likesCount,
}) {
  return (
    <div className="flex w-full h-20 mb-4">
      <AvatarShapeAvatarSizeSmall>
        <img
          src={authorAvatar}
          alt="author"
          className="rounded-xl w-full h-full"
        />
      </AvatarShapeAvatarSizeSmall>

      <div className="ml-3 w-full ">
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

        <div className="w-full text-md">{commentContent}</div>

        <div className="h-8 w-full flex">
          <LikeButton />

          <AttributedStringHost>
            <AttributedStringWhiteSpacePreWrap>
              <p className="pl-2 text-gray-500 text-sm font-medium antialiased h-full flex justify-center items-center ">
                44K
              </p>
            </AttributedStringWhiteSpacePreWrap>
          </AttributedStringHost>
        </div>
      </div>
    </div>
  );
}

export { CommentSection };
