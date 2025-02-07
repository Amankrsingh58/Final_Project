import React, { useState, useEffect } from 'react';

const MessageCard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const fetchMessage = async () => {
    //   const response = await fetch('/api/getMessages'); // Your API endpoint
    //   const data = await response.json();
    //   setMessages(data);
    // };

    const dummyData = [
      {
        id: 1,
        name: 'John Doe',
        phone: '+1234567890',
        msgSubjectDetail: 'Mathematics - Algebra',
        msgDetails: 'Looking for a tutor for algebra to understand the basics and advanced concepts.',
        solved: false
      },
      {
        id: 2,
        name: 'Jane Smith',
        phone: '+0987654321',
        msgSubjectDetail: 'Science - Biology',
        msgDetails: 'Seeking a tutor to help with high school biology, focusing on cellular biology and genetics.',
        solved: false
      },
      {
        id: 3,
        name: 'David Brown',
        phone: '+1122334455',
        msgSubjectDetail: 'English - Literature',
        msgDetails: 'Looking for assistance with analyzing classic literature and improving writing skills.',
        solved: false
      }
    ];

    setMessages(dummyData);
  }, []);

  const handleMarkSolved = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        message.solved = true;
      }
      return message;
    });

    setMessages(updatedMessages);

    // fetch('/api/updateMessage', { method: 'POST', body: JSON.stringify({ id, solved: true }) })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };

  const sortedMessages = [...messages].sort((a, b) => a.solved - b.solved);

  if (!messages.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-full mt-2 mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      {sortedMessages.map((message, index) => (
        <div
          key={message.id}
          className={`relative mb-4 p-4 bg-gray-900 rounded-lg shadow-md ${message.solved ? 'opacity-50' : ''}`}
        >
          <h3 className="text-2xl font-bold mb-2">{message.name}</h3>
          <p className="text-gray-400 text-sm mb-2">Phone: {message.phone}</p>
          <p className="text-gray-400 mb-4">{message.msgSubjectDetail}</p>
          <div className="text-sm text-gray-300">
            <p>{message.msgDetails}</p>
          </div>
          
          {!message.solved && (
            <button
              onClick={() => handleMarkSolved(message.id)}
              className="absolute top-2 right-2 bg-[#1abc9c] text-white py-1 px-3 rounded-full text-sm"
            >
              Not Solved
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageCard;
