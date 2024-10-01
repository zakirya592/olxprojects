import React, { useState } from "react";

const Commentproduct = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !comment) {
      alert("Please fill in both fields.");
      return;
    }

    const newComment = { email, comment };
    setSubmittedComments([...submittedComments, newComment]);
    setEmail("");
    setComment("");
  };

  return (
    <div className="p-4 shadow w-full">
      <h2 className="font-bold text-lg mb-2">Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block  font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full p-2 border-b border-gray-300 focus:border-b-2 focus:border-blue-500 outline-none active:border-b-2 rounded-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-medium mb-1">
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
  );
};

export default Commentproduct;
