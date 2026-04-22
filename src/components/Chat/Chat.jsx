import React, { useEffect, useRef, useState } from "react";
import NewRequest from "../../../utils/NewRequest";
import { useQuery } from "react-query";
import { GiPlayButton } from "react-icons/gi";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar } from "@mui/material";

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatlist, setchatlist] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserdata = storedUserResponse?.data?.user || "";
  const chatproduct = sessionStorage.getItem("chardata");
  let chatResponse = null;
  const chatContainerRef = useRef(null);
  const [imageshow, setimageshow] = useState("");
  const [name, setname] = useState("");
  const [aboutMe, setaboutMe] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(chatResponse);
  const [isChatListVisible, setIsChatListVisible] = useState(false);

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
      navigate("/LoginForm");
    }
  }, [senderId, navigate]);

  const receiverId = chatResponse?._id || "";
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const { data: chatHistorydata, refetch } = useQuery(
    ["chatdata", selectedUser?._id],
    fetchUpcomingEventsData
  );
  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get(
      `/chat?userId=${senderId}&contactId=${selectedUser ? selectedUser._id : chatResponse?._id || ""}`
    );
    return response?.data;
  }

  const fetchchatlist = async () => {
    try {
      const response = await NewRequest.get(
        `/chat/getmychat?userId=${senderId || ""}`
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
        receiverId: selectedUser ? selectedUser._id : chatResponse?._id || "",
        content: message,
      });
      //  fetchChatHistory();
      refetch();
      setChatHistory([...chatHistory, response.data]);
      setMessage("");
      fetchchatlist();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedUser(chat?.user);
    setActiveChatId(chat?.user._id);

 NewRequest.post(
      `/chat/read?senderId=${senderId}&receiverId=${chat?.user?._id || ""}`
    );


  };

  useEffect(() => {
    if (selectedUser) {
      refetch();
    }
  }, [selectedUser, refetch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    fetchchatlist();
  }, [senderId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistorydata]);

  // User profile data
  useEffect(() => {
    NewRequest.get(`/users/${senderId || ""}`)
      .then((response) => {
        const userdata = response.data;
        const imageUrl = userdata?.image || "";
        const finalUrl =
          imageUrl && imageUrl.startsWith("https")
            ? imageUrl
            : imageLiveUrl(imageUrl);
        setimageshow(finalUrl || "");
        setname(userdata?.username || "");
        setaboutMe(userdata?.aboutMe || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [Responseimageshow, setResponseimageshow] = useState("");
  const [Responsename, setResponsename] = useState("");

  useEffect(() => {
    NewRequest.get(`/users/${chatResponse?._id || ""}`)
      .then((response) => {
        const userdata = response.data;
        const imageUrl = userdata?.image || "";
        const finalUrl =
          imageUrl && imageUrl.startsWith("https")
            ? imageUrl
            : imageLiveUrl(imageUrl);
        setResponseimageshow(finalUrl || "");
        setResponsename(userdata?.username || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filtered chatlist based on the search query
  const filteredChatList = chatlist.filter(
    (chat) =>
      chat?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat?.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChatUser = selectedUser || chatResponse;
  const hasActiveConversation = Boolean(activeChatUser);
  const showSidebarOnMobile = isChatListVisible || !hasActiveConversation;

  return (
    <div className="mx-auto mt-2 flex h-[calc(100vh-130px)] min-h-[520px] w-full max-w-[1440px] flex-col gap-3 px-2 sm:mt-3 md:px-4 lg:mt-8 lg:flex-row lg:px-8">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm lg:hidden"
        onClick={() => setIsChatListVisible(!isChatListVisible)}
      >
        {isChatListVisible ? (
          <>
            <RxCross2 className="text-base" />
            <span>Hide Conversations</span>
          </>
        ) : (
          <>
            <IoReorderThree className="text-lg" />
            <span>Show Conversations</span>
          </>
        )}
      </div>

      <aside
        className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block lg:w-[360px] ${
          showSidebarOnMobile ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 p-4">
          {imageshow ? (
            <img src={imageshow} alt="Avatar" className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <Avatar className="h-11 !w-11" />
          )}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">{name || "My Profile"}</h3>
            <p className="truncate text-xs text-slate-500">{aboutMe || "Start messaging your buyers and sellers"}</p>
          </div>
        </div>

        <div className="p-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <FaSearch />
            </span>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="max-h-[calc(100vh-290px)] space-y-2 overflow-y-auto p-3 lg:max-h-[calc(100vh-320px)]">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chatItem, index) => (
              <button
                type="button"
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  activeChatId === chatItem?.user?._id
                    ? "border-indigo-200 bg-indigo-50 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
                key={index}
                onClick={() => {
                  handleChatSelection(chatItem);
                  setIsChatListVisible(false);
                }}
              >
                {chatItem?.user?.image ? (
                  <img
                    src={
                      chatItem.user.image.startsWith("https")
                        ? chatItem.user.image
                        : imageLiveUrl(chatItem.user.image)
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <Avatar className="h-10 !w-10" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {chatItem?.user?.username || "Unknown user"}
                    </h3>
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {chatItem?.timestamp ? formatTime(chatItem.timestamp) : ""}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">{chatItem?.lastMessage || "No messages yet"}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
              No matching conversations found.
            </p>
          )}
        </div>
      </aside>

      <section
        className={`flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:min-h-[520px] ${
          showSidebarOnMobile ? "hidden lg:flex" : "flex"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 p-4">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 lg:hidden"
            onClick={() => setIsChatListVisible(true)}
            aria-label="Back to conversation list"
          >
            <IoChevronBack />
          </button>
          {activeChatUser?.image ? (
            <img
              src={
                activeChatUser.image.startsWith("https")
                  ? activeChatUser.image
                  : imageLiveUrl(activeChatUser.image)
              }
              alt="Avatar"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : Responseimageshow ? (
            <img
              src={
                Responseimageshow.startsWith("https")
                  ? Responseimageshow
                  : imageLiveUrl(Responseimageshow)
              }
              alt="Avatar"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <Avatar className="h-11 !w-11" />
          )}
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {activeChatUser?.username || Responsename || "Conversation"}
            </h3>
            <p className="text-xs text-slate-500">Messages are end-to-end on your account</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-gradient-to-b from-slate-50 to-white px-2 py-3 md:px-4">
          <div className="mb-3 flex-1 overflow-y-auto pr-1" ref={chatContainerRef}>
            {chatHistorydata?.length ? (
              chatHistorydata.map((chat, index) => {
                const isSender = chat.sender?._id === senderId;
                return (
                  <div
                    key={index}
                    className={`mb-3 flex items-end gap-2 ${isSender ? "justify-end" : "justify-start"}`}
                  >
                    {!isSender &&
                      (chat.sender?.image ? (
                        <img
                          src={
                            chat.sender.image.startsWith("https")
                              ? chat.sender.image
                              : imageLiveUrl(chat.sender.image)
                          }
                          alt={chat.sender?.name || "Sender"}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar className="h-8 !w-8" />
                      ))}

                    <div
                      className={`max-w-[88%] rounded-2xl px-3 py-2 shadow-sm sm:px-4 md:max-w-[65%] ${
                        isSender
                          ? "rounded-br-md bg-indigo-600 text-white"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <p className="break-words text-sm">{chat?.content || ""}</p>
                      <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${isSender ? "text-indigo-100" : "text-slate-400"}`}>
                        <span>{chat?.timestamp ? formatTime(chat.timestamp) : ""}</span>
                        {isSender &&
                          (chat.status === "read" ? (
                            <DoneAllIcon sx={{ fontSize: 15, color: "#bfdbfe" }} />
                          ) : chat.status === "delivered" ? (
                            <DoneAllIcon sx={{ fontSize: 15 }} />
                          ) : (
                            <CheckIcon sx={{ fontSize: 15 }} />
                          ))}
                      </div>
                    </div>

                    {isSender &&
                      (chat.sender?.image ? (
                        <img
                          src={
                            chat.sender.image.startsWith("https")
                              ? chat.sender.image
                              : imageLiveUrl(chat.sender.image)
                          }
                          alt={chat.sender?.name || "You"}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar className="h-8 !w-8" />
                      ))}
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center px-4">
                <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-500">
                  No messages yet. Send your first message to start this conversation.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-2 md:p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white sm:py-3"
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSendMessage}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <GiPlayButton size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
