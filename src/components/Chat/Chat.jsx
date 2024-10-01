import React, { useEffect, useRef, useState } from "react";
import NewRequest from "../../../utils/NewRequest";
import { useQuery } from "react-query";
import { GiPlayButton } from "react-icons/gi";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatlist, setchatlist] = useState([])
  const [activeChatId, setActiveChatId] = useState(null);
  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserdata = storedUserResponse?.data?.user || "";

  const chatproduct = sessionStorage.getItem("chardata");
  
  // const chatResponse = JSON.parse(chatproduct);

  let chatResponse = null;

  try {
    chatResponse = chatproduct ? JSON.parse(chatproduct) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }


  let senderId = loginuserdata?._id || "";
    if (!senderId) {
      senderId = localStorage.getItem("userdata") || "";
    }


     useEffect(() => {
       if (!senderId) {
         // If senderId is not available, redirect the user to the login page
         navigate("/LoginForm");
       }
     }, [senderId, navigate]);

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
    const response = await NewRequest.get(`/chat?userId=${senderId}&contactId=${selectedUser?._id || ""}`);
    return response?.data;
  }

  const fetchchatlist = async () => {
    try {
      const response = await NewRequest.get(`/chat/getmychat?userId=${senderId || ""}`
      );
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

  
    const [imageshow, setimageshow] = useState("");
    const [name, setname] = useState("");
    const [aboutMe, setaboutMe] = useState("");

  // User profile data
    useEffect(() => {
      NewRequest.get(`/users/${senderId || ""}`)
        .then((response) => {
          const userdata = response.data;
          const imageUrl = userdata?.image || "";
          const finalUrl = imageUrl && imageUrl.startsWith("https") ? imageUrl: imageLiveUrl(imageUrl);
          setimageshow(finalUrl || "");
          setname(userdata?.username || "");
          setaboutMe(userdata?.aboutMe || "");
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);


     const [searchQuery, setSearchQuery] = useState("");

  // Filtered chatlist based on the search query
  const filteredChatList = chatlist.filter(
    (chat) =>
      chat?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat?.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <div className="flex flex-col sm:flex-col lg:flex-row h-[80vh] w-full overflow-y-scroll lg:px-10 mt-5 lg:mt-28 sm:mt-2">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 sm:w-full h-auto  border-gray-300  rounded-md shadow-lg ">
          <div className="flex items-center bg-gray-300 p-4 rounded-sm">
            <img
              src={imageshow || ""}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            {/* Username and Message */}
            <div className="ml-4">
              <h3 className="font-bold text-gray-900">{name || ""}</h3>
              <p className="text-sm text-gray-600 truncate w-40">{aboutMe}</p>
            </div>
          </div>
          <div className="text-xl font-semibold p-3">
            <div className="relative">
              {/* Search Icon */}
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaSearch />
              </span>

              {/* Input Field */}
              <input
                type="text"
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none "
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 p-4">
            {filteredChatList.length > 0 ? (
              filteredChatList.map((chatlist, index) => (
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
                    // src={chatlist?.user?.image || ""}
                    src={
                      chatlist?.user?.image
                        ? chatlist?.user?.image.startsWith("https")
                          ? chatlist?.user?.image
                          : imageLiveUrl(chatlist.user.image)
                        : ""
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <h3 className="font-medium">
                        {" "}
                        {chatlist?.user.username || ""}
                      </h3>
                      <span className="text-sm font-semibold text-blue-600">
                        {/* {chatlist?.timestamp || ""} */}
                        {new Date(chatlist?.timestamp).toLocaleString("en-US", {
                          // day: "2-digit",
                          // month: "2-digit",
                          // year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {chatlist?.lastMessage || ""}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No chats found</p>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1">
          <div className="flex items-center bg-gray-300 p-4 rounded-sm ms-1">
            <img
              // src={imageshow || ""}
              src={
                selectedUser.image
                  ? selectedUser.image.startsWith("https")
                    ? selectedUser.image
                    : imageLiveUrl(selectedUser.image)
                  : ""
              }
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            {/* Username and Message */}
            <div className="ml-4">
              <h3 className="font-bold text-gray-900">
                {selectedUser?.username || ""}
              </h3>
              {/* <p className="text-sm text-gray-600 truncate w-40">{aboutMe}</p> */}
            </div>
          </div>
          <div className="p-1 h-[350px] sm:h-[200px] lg:h-[600px]">
            <div className="border border-gray-300 bg-[#FFFFFF] p-4 h-full flex flex-col justify-between w-full">
              <div
                className=" overflow-y-auto mb-5 flex-grow"
                ref={chatContainerRef}
              >
                {chatHistorydata &&
                  chatHistorydata.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-3 ${
                        chat.sender._id === senderId
                          ? "text-right mx-4"
                          : "text-left mx-4"
                      }`}
                    >
                      <div>
                        {/* {chat.sender} */}
                        <div
                          className={`flex ${
                            chat.sender._id === senderId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {/* Avatar for the sender */}
                          {chat.sender._id !== senderId && (
                            <img
                              src={
                                chat.sender.image
                                  ? chat.sender.image.startsWith("https")
                                    ? chat.sender.image
                                    : imageLiveUrl(chat.sender.image)
                                  : ""
                              }
                              // src={chat.sender.image ? (chat.sender.image.startsWith("https") ? chat.sender.image : imageLiveUrl(chat.sender.image)) : ""}
                              alt={chat.sender.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          )}

                          <div
                            className={`${
                              chat.sender._id === senderId
                                ? "bg-[#F5F7FB] text-black"
                                : " bg-indigo-600 text-white py-2 px-4 rounded-lg max-w-xs shadow-lg"
                            } py-2 px-4 rounded-lg max-w-xs shadow-lg`}
                          >
                            <div className="flex">
                              <p className=""> {chat?.content || ""}</p>
                            </div>
                            <p className="text-xs text-gray-400">
                              {new Date(chat.timestamp).toLocaleString(
                                "en-US",
                                {
                                  // day: "2-digit",
                                  // month: "2-digit",
                                  // year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>

                          {/* Show the current user's image if they are the sender */}
                          {chat.sender._id === senderId && (
                            <img
                              // src={chat.sender.image} // URL for the current user's image
                              src={
                                chat.sender.image
                                  ? chat.sender.image.startsWith("https")
                                    ? chat.sender.image
                                    : imageLiveUrl(chat.sender.image)
                                  : ""
                              }
                              alt={chat.sender.name} // Current user's name
                              className="w-8 h-8 rounded-full ml-2"
                            />
                          )}
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
                    className="flex-1 px-2 py-4 border border-gray-300 rounded focus:outline-none bg-[#E6EBF5] focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message..."
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 bg-[#7269EF] text-white rounded hover:bg-blue-600 transition duration-300"
                  >
                    {/* Send */}
                    <GiPlayButton size={34} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
