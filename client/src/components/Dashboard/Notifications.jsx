import React, { useState, useEffect } from 'react';
import { useGetAllHelpFormsQuery, useMarkMessageAsSolvedMutation } from '../../features/auth/helpFormApi';

const MessageCard = () => {
  const { data: helpForms, error, isLoading, isError } = useGetAllHelpFormsQuery();
  const [messages, setMessages] = useState([]);
  const [markMessageAsSolved] = useMarkMessageAsSolvedMutation();

  useEffect(() => {
    if (helpForms?.data) {
      setMessages(helpForms.data);
    }
  }, [helpForms]);

  const handleMarkSolved = async (id) => {
    try {
      await markMessageAsSolved({ id }).unwrap();
      console.log('Message marked as solved');
    } catch (error) {
      console.error('Error marking message as solved:', error);
    }
  };

  if (isLoading || !messages) {
    return  (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return <div className='text-white'>Error: {error.message}</div>;
  }

  if (helpForms?.data?.length <= 0) {
    return <div>No issues found...</div>;
  }

  if (messages.length === 0) {
    return <div>Loading still...</div>;
  }

  const sortedMessages = [...messages].sort((a, b) => a.solved - b.solved);

  return (
    <div className="w-full max-w-full mt-2 mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      {messages.user && sortedMessages && sortedMessages.map((message) => (
        <div
          key={message._id}
          className={`relative mb-4 p-4 bg-gray-900 rounded-lg shadow-md ${message.solved ? 'opacity-50' : ''}`}
        >
          <h3 className="text-2xl font-bold mb-2">{message.user.userName}</h3>
          <p className="text-gray-400 text-sm mb-2">Email: {message.user.email}</p>
          <p className="text-gray-400 mb-4">{message.role}</p>
          <div className="text-sm text-gray-300">
            <p className="text-gray-400 mb-4">Subject: {message.subject}</p>
            <p className="text-gray-400 mb-4">Desc: {message.message}</p>
          </div>
          
          {!message.solved && (
            <button
              onClick={() => handleMarkSolved(message._id)}
              className="cursor-pointer absolute top-2 right-2 bg-[#1abc9c] text-white py-1 px-3 rounded-full text-sm"
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
