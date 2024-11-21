"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown"; // For rendering markdown content
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ChatMessage component to render markdown
const ChatMessage = ({ content }) => {
  return (
    <div className="message-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

// Main Chat component
const Chat = () => {
  const [selectedApi, setSelectedApi] = useState("/api/openai");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: selectedApi,
  });

  const chatContainer = useRef(null);

  // Function to handle API change
  const handleApiChange = (e) => setSelectedApi(e.target.value);

  // Scroll to the latest message
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Render messages
  const renderResponse = () => (
    <div className="response">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`chat-line ${
            message.role === "user" ? "user-chat" : "ai-chat"
          } flex items-start mb-6`}
        >
          <Image
            src={message.role === "user" ? "/user.png" : "/robot.png"}
            alt="avatar"
            width={50}
            height={50}
            className="avatar rounded-full border border-gray-300 shadow-lg"
          />
          <div className="ml-4 flex-grow">
            <p
              className={`message p-4 rounded-xl shadow-md ${
                message.role === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-800 text-white"
              }`}
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.5rem",
                wordBreak: "break-word",
              }}
            >
              <ChatMessage content={message.content} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Main return
  return (
    <div className="chat flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl shadow-2xl">
      {/* Chat messages */}
      <div
        ref={chatContainer}
        className="flex-grow p-6 overflow-y-auto bg-gradient-to-b from-gray-100 to-white rounded-t-xl"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {messages.length > 0 ? (
          renderResponse()
        ) : (
          <div className="text-center text-gray-400 mt-10 italic">
            Start a conversation by typing below...
          </div>
        )}
      </div>

      {/* Chat input form */}
      <form
        onSubmit={handleSubmit}
        className="chat-form flex items-center bg-gray-100 p-4 rounded-b-xl border-t border-gray-300"
      >
        <input
          name="input-field"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow bg-white border border-gray-300 rounded-full py-2 px-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          autoComplete="off"
        />
        <select
          value={selectedApi}
          onChange={handleApiChange}
          className="ml-4 bg-white border border-gray-300 text-gray-800 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          <option value="/api/openai">GPT-4</option>
          <option value="/api/bedrock">Llama3-70B</option>
        </select>
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          <Image src="/send.png" alt="send" width={24} height={24} />
        </button>
      </form>
    </div>
  );
};

export default Chat;