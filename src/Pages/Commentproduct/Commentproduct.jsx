import React, { useEffect, useState } from "react";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const Commentproduct = (productdata) => {

    const navigate = useNavigate();
    const productid = productdata?.productdata?.cardData?._id || "";
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [replyText, setReplyText] = useState("");
    const [rating, setRating] = useState(2.5);
    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    const loginuserdata = storedUserResponse?.data?.user || "";
    let senderId = loginuserdata?._id || "";


    const getcommentdata = () => {
        NewRequest.get(`/comment/replay/${productid}`)
            .then((response) => {
                console.log(response.data.comments, "response data");
                setComments(response?.data?.comments || []);

            })
            .catch((error) => {
                console.error(error, "error in posting comment");
            });
    };

    useEffect(() => {
        getcommentdata();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userIds = [];

                comments.forEach((comment) => {
                    const userId = comment?.userId?._id;
                    if (userId) userIds.push(userId);

                    // Collect userIds from replies
                    comment.replies.forEach((reply) => {
                        const replyUserId = reply?.userId?._id;
                        if (replyUserId) userIds.push(replyUserId);
                    });
                });

                // Fetch unique user details
                const uniqueUserIds = [...new Set(userIds)];
                const userPromises = uniqueUserIds.map((userId) =>
                    NewRequest.get(`/users/${userId}`)
                );
                const responses = await Promise.all(userPromises);
                const fetchedUserDetails = responses.map((res) => res.data);

                // Store user details mapped by userId for quick lookup
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
        if (!senderId) {
            navigate("/LoginForm");
        }
        e.preventDefault();
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
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setComment("");
            setRating(2.5)
            getcommentdata();
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
        }
        try {
            const response = await NewRequest.post("/comment/replay", {
                userId: senderId,
                productId: productid,
                commentId: commentId,
                commentText: replyText,
                rating: "5",
            });
            toast.success(response?.data?.message || `Reply added successfully.`,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
            setReplyText("");
            setReplyCommentId(null);
            getcommentdata();
        } catch (error) {
            console.log(error, "error adding reply");
        }
    };

    return (
      <>
        <div className="p-4 shadow w-full">
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
                      {/* {chatlist?.timestamp || ""} */}
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

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-12 mt-3 space-y-3">
                    {comment.replies.map((reply, replyIndex) => {
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
                            {/* <button
                                                className="text-blue-500 text-sm hover:underline mt-1"
                                                onClick={() =>
                                                  handleReplyClick(replyUser._id)
                                                }
                                              >
                                                Reply
                                              </button> */}
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
