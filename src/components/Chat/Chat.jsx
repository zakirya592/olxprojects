import React, { useState } from "react";
import NewRequest from "../../../utils/NewRequest";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const senderId = "66a0a60182059f7e3fea2966"; // Replace with dynamic value if needed
  const receiverId = "66a352cc591bc231dac442aa"; // Replace with dynamic value if needed

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await NewRequest.post("/chat", {
        senderId,
        receiverId,
        content: message,
      });

      // Assuming the response returns the full chat message object
      setChatHistory([...chatHistory, response.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-col lg:flex-row  h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 sm:w-full bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Inbox</h2>
        <div className="space-y-4">
          {/* Chat list item */}
          <div className="flex items-center p-2 bg-white rounded cursor-pointer shadow">
            <img
              src="path_to_image"
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-medium">Harris</h3>
              <p className="text-gray-500 text-sm">
                brand new 15 pro max 256gb natural titanium unlocked
              </p>
              <span className="text-sm font-semibold text-blue-600">
                Rs 332,000
              </span>
            </div>
          </div>
          {/* Repeat above block for each chat item */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-5">
        <div className="border border-gray-300 p-4 h-full flex flex-col justify-between">
          <div className="max-h-72 overflow-y-auto mb-5 flex-grow">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  chat.senderId === senderId ? "directionrtl" : "directionltr"
                }`}
              >
                <strong>You:</strong> {chat.content}{" "}
                {/* Adjust this if the response data structure is different */}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
