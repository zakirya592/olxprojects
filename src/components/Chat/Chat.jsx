import React, { useEffect, useRef, useState } from "react";
import NewRequest from "../../../utils/NewRequest";
import { useQuery } from "react-query";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatlist, setchatlist] = useState([])
  const [activeChatId, setActiveChatId] = useState(null);
  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserdata = storedUserResponse.data.user;

  const chatproduct = sessionStorage.getItem("chardata");
  const chatResponse = JSON.parse(chatproduct);


  const senderId = loginuserdata?._id;

  const [selectedUser, setSelectedUser] = useState(chatResponse || "");

  const receiverId = chatResponse?._id || "";

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const {
    data: chatHistorydata,
    refetch
  } = useQuery(["chatdata", selectedUser?._id], fetchUpcomingEventsData);
  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get(`/chat?userId=${senderId}&contactId=${selectedUser?._id}`);
    return response?.data;
  }

  const fetchchatlist = async () => {
    try {
      const response = await NewRequest.get(`/chat/getmychat?userId=${loginuserdata?._id}`
      );
      console.log(response, "response");

      setchatlist(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };


  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await NewRequest.post("/chat", {
        senderId,
        receiverId: selectedUser?._id || "",
        content: message,
      });
      //  fetchChatHistory();
      refetch()
      setChatHistory([...chatHistory, response.data]);
      setMessage("");
      fetchchatlist()
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedUser(chat?.user);
    console.log(chat?.user);
    setActiveChatId(chat?.user._id);

  };

  useEffect(() => {
    if (selectedUser) {
      refetch(); // Refetch chat history for the selected user
    }
  }, [selectedUser, refetch]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action of the enter key (which is usually submitting a form)
      handleSendMessage();
    }
  };

  useEffect(() => {
    //  fetchChatHistory();
    fetchchatlist()
  }, [senderId]);

  const chatContainerRef = useRef(null);

useEffect(() => {
  // Scroll to the bottom of the chat container whenever chatHistorydata changes
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [chatHistorydata]);


  return (
    <div className="flex flex-col sm:flex-col lg:flex-row h-[80vh] overflow-y-scroll lg:px-10 mt-5 lg:mt-40 sm:mt-2">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 sm:w-full  border-gray-300 rounded-md shadow-lg ">
        <h2 className="text-xl font-semibold mb-4 p-3">Inbox</h2>
        <div className="space-y-4 p-4">
          {chatlist.map((chatlist, index) => (
            <div
              className={`flex items-center p-2 rounded cursor-pointer shadow ${
                activeChatId === chatlist?.user._id
                  ? "bg-gray-300"
                  : "bg-gray-100"
              }`}
              key={index}
              onClick={() => handleChatSelection(chatlist)}
            >
              <img
                src={chatlist?.user?.image || ""}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">
                  {" "}
                  {chatlist?.user.username || ""}
                </h3>
                <p className="text-gray-500 text-sm">
                  {chatlist?.lastMessage || ""}
                </p>
                <span className="text-sm font-semibold text-blue-600">
                  {/* {chatlist?.timestamp || ""} */}
                  {new Date(chatlist?.timestamp).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-5">
        <div className="border border-gray-300 p-4 h-full flex flex-col justify-between">
          <div
            className=" overflow-y-auto mb-5 flex-grow"
            ref={chatContainerRef}
          >
            {chatHistorydata &&
              chatHistorydata.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    chat.senderId === senderId ? "directionrtl" : "directionltr"
                  }`}
                >
                  <div>
                    <div className="flex justify-between w-full">
                      <div className="flex">
                        <p> {chat?.content || ""}</p>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(chat.timestamp).toLocaleString("en-US", {
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
                onKeyDown={handleKeyDown}
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
