import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaBell } from "react-icons/fa";
import { useQuery } from "react-query";
import NewRequest from "../../../utils/NewRequest";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000"); // Backend URL

function NotificationComponent() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load existing notifications when connected
    socket.on("loadNotifications", (data) => {
      setNotifications(data);
    });

    // Listen for new notifications
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      // Clean up socket listeners on component unmount
      socket.off("loadNotifications");
      socket.off("receiveNotification");
    };
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".notification-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserdata = storedUserResponse?.data?.user || "";

  let senderId = loginuserdata?._id || "";
  if (!senderId) {
    senderId = localStorage.getItem("userdata") || "";
  }
  const fetchchatlist = async () => {
    try {
      const response = await NewRequest.get(
        `/chat/getmychat?userId=${senderId || ""}`
      );
      // setchatlist(response.data);
      console.log(response.data, "response.data");
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
   fetchchatlist()
  }, []);

  const { data: NotificationData } = useQuery("Notification", AllNotification);
  async function AllNotification() {
    const response = await NewRequest.post(`/chat/deliver`, {
      receiverId: senderId,
    });
    return response?.data;
  }

  return (
    <div className="notification-dropdown" style={{ position: "relative" }}>
      {/* Notification Bell Icon */}
      <div className="relative">
        <FaBell size={24} className="cursor-pointer" onClick={toggleDropdown} />
        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {NotificationData?.result?.matchedCount || ""}
        </div>
      </div>

      {notifications.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: 0,
            right: -5,
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          {notifications.length}
        </span>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="bg-white text-black right-0 absolute overflow-hidden"
          style={{
            top: "30px",
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <div className="p-4 font-bold">Notifications</div>
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                }}
              >
                {notif.message || "New Notification"}
              </div>
            ))
          ) : (
            <div style={{ padding: "10px", textAlign: "center" }}>
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationComponent;
