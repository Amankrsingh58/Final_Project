import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const socket = io('https://tutorbackend-i63e.onrender.com'); 

const ChatPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!user?._id) return;
  
    // Join personal socket room
    socket.emit('setup', user._id);
  
    // Fetch old messages
    axios.get(`https://tutorbackend-i63e.onrender.com/api/messages/${userId}`, {
      withCredentials: true,
    }).then((res) => setMessages(res.data));
  
    // Listen for new incoming messages
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  
    return () => socket.off('receive_message');
  }, [userId, user]);
  

  const sendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
      senderId: user._id,
      receiverId: userId,
      text: input,
    };

    socket.emit('private_message', newMsg);
    setMessages((prev) => [...prev, { ...newMsg }]);
    setInput('');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow text-lg font-bold">
        Chat with Student
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
        <div
        key={i}
        className={`p-2 rounded max-w-xs ${
          msg.senderId === user._id
            ? 'bg-blue-200 self-end ml-auto'
            : 'bg-gray-200 self-start'
        }`}
      >

        <div>
        {msg.text}

        </div>
        <span className="block text-xs text-gray-600 mt-1">
          {format(new Date(msg.timestamp), 'MMMM d, yyyy, hh:mm')}
        </span>
      </div>
      
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white flex gap-2 shadow">
        <input
          className="flex-1 border border-gray-300 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
