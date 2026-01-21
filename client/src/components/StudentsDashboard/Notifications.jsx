import React, { useState, useEffect } from "react";
import { useGetNoticeQuery } from "../../features/auth/noticeApi";
import { useSelector } from "react-redux";

const MessageCard = () => {
  const [messages, setMessages] = useState([]);
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const id = user._id;

  const { data, isLoading, isError } = useGetNoticeQuery({id});

  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );  }
    
    if (!messages.length) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          There was no Notification to show.
        </div>
      );
    }

    if (isError) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          There was an error fetching the student data.{data.error.message}
        </div>
      );
    }

  return (
    <div className="w-full max-w-full mt-2 mx-auto bg-white text-white p-6 rounded-lg shadow-lg">
      {messages && messages.map((message) => (
        <div
          key={message._id}
          className={`relative mb-4 p-4 bg-gray-100 rounded-lg shadow-md ${
            message.solved ? "opacity-50" : ""
          }`}
        >
          {/* <h3 className="text-2xl font-bold mb-2">{message.name}</h3> */}
          {/* <p className="text-gray-400 text-sm mb-2">Phone: {message.phone}</p> */}
          <p className="text-gray-900 mb-4">{message.subject}</p>
          <div className="text-sm text-gray-800">
            <p>{message.message}</p>
          </div>

        </div>
      ))}
      
    </div>
  );
};

export default MessageCard;
