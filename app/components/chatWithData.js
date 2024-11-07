// src/components/ChatWithData.js
'use client'
import React, { useState } from 'react'

export default function ChatWithData() {
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState([]) // New state to hold messages

  const handleSend = () => {
    if (chatMessage.trim()) {
      setMessages([...messages, chatMessage]) // Add new message to the conversation
      setChatMessage('') // Clear input after sending
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <h3 className="text-lg font-medium mb-2">Chat with Data</h3>
      
      {/* Conversation display */}
      <div className="mb-4 p-2 border border-gray-200 rounded h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-1 text-gray-700">
            {message}
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type your question here..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button
          onClick={handleSend} // Trigger sending message
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
