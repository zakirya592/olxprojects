import React, { useEffect, useState, useMemo } from "react";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const Commentproduct = ({
  productdata,
  layout = "default",
  onReviewsChange,
}) => {
  const navigate = useNavigate();
  const productid = productdata?._id || "";
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [replyText, setReplyText] = useState("");
  const [rating, setRating] = useState(2.5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString || "{}");
  const loginuserdata = storedUserResponse?.data?.user || "";
  let senderId = loginuserdata?._id || "";

  const getcommentdata = async () => {
    try {
      const response = await NewRequest.get(`/comment/replay/${productid}`);
      setComments(response?.data?.comments || []);
    } catch (error) {
      console.error(error, "error fetching comments");
    }
  };

  useEffect(() => {
    if (productid) getcommentdata();
  }, [productid]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userIds = [];

        comments.forEach((comment) => {
          const userId = comment?.userId?._id;
          if (userId) userIds.push(userId);

          (comment.replies || []).forEach((reply) => {
            const replyUserId = reply?.userId?._id;
            if (replyUserId) userIds.push(replyUserId);
          });
        });

        const uniqueUserIds = [...new Set(userIds)];
        const userPromises = uniqueUserIds.map((userId) =>
          NewRequest.get(`/users/${userId}`)
        );
        const responses = await Promise.all(userPromises);
        const fetchedUserDetails = responses.map((res) => res.data);

        const userDetailsMap = {};
        fetchedUserDetails.forEach((user) => {
          userDetailsMap[user._id] = user;
        });
        setUserDetails(userDetailsMap);
      } catch (error) {
        console.log(error, "Error fetching user data");
      }
    };

    if (comments.length) fetchUserDetails();
  }, [comments]);

  if (!senderId) {
    senderId = localStorage.getItem("userdata") || "";
  }

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!senderId) {
      navigate("/LoginForm");
      return;
    }
    try {
      const response = await NewRequest.post("/comment", {
        userId: senderId,
        productId: productid,
        commentText: comment,
        rating: rating,
      });
      toast.success(response?.data?.message || `Comment added successfully.`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      setComment("");
      setRating(2.5);
      setShowReviewForm(false);
      await getcommentdata();
      onReviewsChange?.();
    } catch (error) {
      console.log(error, "errorr");
    }
  };

  const [replyCommentId, setReplyCommentId] = useState(null);
  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };
  const handleReplyClick = (commentId) => {
    setReplyCommentId(commentId);
  };

  const handleAddReply = async (commentId) => {
    if (!senderId) {
      navigate("/LoginForm");
      return;
    }
    try {
      const response = await NewRequest.post("/comment/replay", {
        userId: senderId,
        productId: productid,
        commentId: commentId,
        commentText: replyText,
        rating: "5",
      });
      toast.success(response?.data?.message || `Reply added successfully.`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      setReplyText("");
      setReplyCommentId(null);
      await getcommentdata();
      onReviewsChange?.();
    } catch (error) {
      console.log(error, "error adding reply");
    }
  };

  const ratingStats = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    comments.forEach((c) => {
      const r = Number(c.rating);
      if (!Number.isFinite(r)) return;
      const b = Math.min(5, Math.max(1, Math.round(r)));
      dist[b] += 1;
      sum += r;
    });
    const n = comments.length;
    const average = n ? sum / n : 0;
    return { dist, average, total: n };
  }, [comments]);

  const renderReplies = (comment) => {
    const replies = comment.replies || [];
    if (replies.length === 0) return null;
    return (
      <div className="pdp-review-replies">
        {replies.map((reply, replyIndex) => {
          const replyUser = userDetails[reply?.userId?._id] || {};
          const replyUserImage = replyUser.image
            ? replyUser.image
            : "fallback-image-url.png";
          const replyImageUrl = replyUserImage.startsWith("https")
            ? replyUserImage
            : imageLiveUrl(replyUserImage);

          return (
            <div key={replyIndex} className="pdp-review-reply-row">
              <img
                src={replyImageUrl}
                alt=""
                className="pdp-review-avatar"
              />
              <div>
                <div className="pdp-review-name">{replyUser?.username || "User"}</div>
                <div className="pdp-review-body">{reply.commentText}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const reviewFormEl = (
    <form className="pdp-review-form" onSubmit={handleAddCompany}>
      <label className="pdp-review-label" htmlFor="pdp-review-text">
        Your review
      </label>
      <Stack spacing={1} className="pdp-review-stars">
        <Rating
          name="review-rating"
          precision={0.5}
          value={rating}
          onChange={(event, newValue) => handleRating(newValue)}
          sx={{
            "& .MuiRating-iconFilled": { color: "#f5b301" },
            "& .MuiRating-iconEmpty": { color: "#e5e7eb" },
          }}
        />
      </Stack>
      <label className="pdp-review-label" htmlFor="pdp-review-text">
        Comment
      </label>
      <textarea
        id="pdp-review-text"
        value={comment}
        onChange={handleCommentChange}
        required
        className="pdp-review-textarea"
        rows={3}
        placeholder="Share your experience with this product"
      />
      <button type="submit" className="pdp-review-submit">
        Post review
      </button>
    </form>
  );

  if (layout === "split") {
    return (
      <div className="pdp-reviews-split">
        <div className="pdp-reviews-split__grid">
          <div className="pdp-reviews-left">
            <h3 className="pdp-reviews-heading">Ratings</h3>
            <div className="pdp-reviews-summary-card">
              <div className="pdp-reviews-summary-top">
                <span className="pdp-reviews-average">
                  {ratingStats.total
                    ? ratingStats.average.toFixed(1)
                    : "—"}
                </span>
                <Rating
                  name="avg-display"
                  value={ratingStats.total ? ratingStats.average : 0}
                  precision={0.1}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#f5b301" },
                    "& .MuiRating-iconEmpty": { color: "#e5e7eb" },
                  }}
                />
              </div>
              <p className="pdp-reviews-sub">
                {ratingStats.total}{" "}
                {ratingStats.total === 1 ? "Product Rating" : "Product Ratings"}
              </p>

              <div className="pdp-reviews-dist">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingStats.dist[star];
                  const pct = ratingStats.total
                    ? (count / ratingStats.total) * 100
                    : 0;
                  return (
                    <div key={star} className="pdp-reviews-dist-row">
                      <span className="pdp-reviews-dist-label">
                        {star}{" "}
                        <span className="pdp-reviews-dist-star" aria-hidden>
                          ★
                        </span>
                      </span>
                      <div className="pdp-reviews-dist-track">
                        <div
                          className="pdp-reviews-dist-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="pdp-reviews-dist-count">{count}</span>
                    </div>
                  );
                })}
              </div>

              <p className="pdp-reviews-cta-text">
                Share your thoughts with other customers
              </p>
              <button
                type="button"
                className="pdp-reviews-write-btn"
                onClick={() => setShowReviewForm((v) => !v)}
              >
                Write a review
              </button>
              {showReviewForm ? reviewFormEl : null}
            </div>
          </div>

          <div className="pdp-reviews-right">
            <h3 className="pdp-reviews-heading">
              Customer Reviews ({comments.length})
            </h3>
            <div className="pdp-reviews-list">
              {comments.length === 0 ? (
                <p className="pdp-tabs__empty">No reviews yet. Be the first.</p>
              ) : (
                comments.map((comment, index) => {
                  const user = userDetails[comment?.userId?._id] || {};
                  const userImage = user.image
                    ? user.image
                    : "fallback-image-url.png";
                  const finalUrl =
                    userImage && userImage.startsWith("https")
                      ? userImage
                      : imageLiveUrl(userImage);
                  const dateStr = comment?.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "";

                  return (
                    <article key={index} className="pdp-review-item">
                      <div className="pdp-review-item-head">
                        <div className="pdp-review-item-left">
                          <img
                            src={finalUrl}
                            alt=""
                            className="pdp-review-avatar"
                          />
                          <div>
                            <div className="pdp-review-name">
                              {user?.username || "Customer"}
                            </div>
                            <div className="pdp-review-date">{dateStr}</div>
                          </div>
                        </div>
                        <Rating
                          name={`r-${index}`}
                          precision={0.5}
                          value={Number(comment?.rating) || 0}
                          readOnly
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled": { color: "#f5b301" },
                            "& .MuiRating-iconEmpty": { color: "#e5e7eb" },
                          }}
                        />
                      </div>
                      <p className="pdp-review-body">{comment.commentText}</p>
                      <button
                        type="button"
                        className="pdp-review-reply-link"
                        onClick={() => handleReplyClick(comment._id)}
                      >
                        Reply
                      </button>
                      {replyCommentId === comment._id && (
                        <div className="pdp-review-reply-box">
                          <textarea
                            value={replyText}
                            onChange={handleReplyChange}
                            className="pdp-review-textarea"
                            placeholder="Write your reply..."
                            rows={2}
                          />
                          <button
                            type="button"
                            className="pdp-review-submit pdp-review-submit--sm"
                            onClick={() => handleAddReply(comment._id)}
                          >
                            Post Reply
                          </button>
                        </div>
                      )}
                      {renderReplies(comment)}
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 shadow w-full mt-5">
        <form onSubmit={handleAddCompany}>
          <div className="mb-4">
            <label htmlFor="comment" className="block font-medium mb-1">
              Your Review:
            </label>
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                value={rating}
                onChange={(event, newValue) => handleRating(newValue)}
              />
            </Stack>

            <label htmlFor="comment" className="block font-medium mb-1 mt-4">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              required
              className="w-full p-2 border-b border-gray-300 focus:border-b-2 focus:border-blue-500 outline-none active:border-b-2 rounded-none"
              rows="1"
              placeholder="Write your comment here"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#03C3FF] text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="mt-3 p-4">
        {comments.map((comment, index) => {
          const user = userDetails[comment?.userId?._id] || {};
          const userImage = user.image
            ? user.image
            : "fallback-image-url.png";
          const finalUrl =
            userImage && userImage.startsWith("https")
              ? userImage
              : imageLiveUrl(userImage);

          return (
            <div key={index} className="mb-6">
              <div className="flex justify-between">
                <div className="flex items-start space-x-3 ">
                  <div className="flex-shrink-0">
                    <img
                      src={finalUrl}
                      alt={user?.username || "User"}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      {user?.username || "User Name"}
                    </div>
                    <div className="text-gray-700">{comment.commentText}</div>
                    <button
                      className="text-blue-500 text-sm hover:underline mt-1"
                      onClick={() => handleReplyClick(comment._id)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Rating
                    name="half-rating"
                    precision={0.5}
                    value={comment?.rating}
                    readOnly
                  />
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    {new Date(comment?.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              {replyCommentId === comment._id && (
                <div className="ml-12 mt-3">
                  <textarea
                    value={replyText}
                    onChange={handleReplyChange}
                    className="w-full p-2 border rounded"
                    placeholder="Write your reply..."
                    rows={1}
                  ></textarea>
                  <button
                    onClick={() => handleAddReply(comment._id)}
                    className="mt-2 bg-[#03C3FF] text-white py-1 px-3 rounded"
                  >
                    Post Reply
                  </button>
                </div>
              )}

              {(comment.replies || []).length > 0 && (
                <div className="ml-12 mt-3 space-y-3">
                  {(comment.replies || []).map((reply, replyIndex) => {
                    const replyUser = userDetails[reply?.userId?._id] || {};
                    const replyUserImage = replyUser.image
                      ? replyUser.image
                      : "fallback-image-url.png";
                    const replyImageUrl = replyUserImage.startsWith("https")
                      ? replyUserImage
                      : imageLiveUrl(replyUserImage);

                    return (
                      <div
                        key={replyIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={replyImageUrl}
                            alt={replyUser?.username || "User"}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold">
                            {replyUser?.username || "User Name"}
                          </div>
                          <div className="text-gray-700">
                            {reply.commentText}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Commentproduct;
