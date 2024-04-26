import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentBox from "./CommentBox";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [moreComments, setMoreComments] = useState([]);
  console.log(moreComments);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch("/api/comment/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setMoreComments([data, ...comment]);
      }
      // console.log(data);
    } catch (error) {
      // console.error(error);
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setMoreComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>{" "}
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className=" text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in comment.
          <Link className="text-blue-500 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment.."
            rows="3"
            maxLength="200"
            className="px-4 "
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining.
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>

          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {moreComments.length === 0 ? (
        <p className="text-sm my-5">No comments yet.</p>
      ) : (
        <>
          {" "}
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{moreComments.length}</p>
            </div>
          </div>
          {moreComments.map((comment) => (
            <CommentBox key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
}