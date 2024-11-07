// src/components/ChatWithData.js
'use client'
import React, { useState } from 'react'

export default function ChatWithData() {
  const [chatMessage, setChatMessage] = useState('')
  const [responses, setResponses] = useState([])

  const handleSend = () => {
    if (chatMessage.trim()) {
      setResponses([...responses, chatMessage]) 
      setChatMessage('')
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <h3 className="text-lg font-medium mb-2">Chat with Data</h3>
      <div className="flex-1 overflow-y-auto mb-2 p-2 bg-gray-50 rounded">
        {responses.map((response, index) => (
          <p key={index} className="text-sm mb-1">{response}</p>
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
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  )
}
