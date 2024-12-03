'use client';


import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

// Component to display the message content
const ChatMessage = ({ content }) => {
  return (
    <div className="message-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

const Chat = () => {
  const [selectedApi, setSelectedApi] = useState('/api/openai');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: selectedApi,
  });

  const chatContainer = useRef(null);

  // Handle API selection changes
  const handleApiChange = (e) => {
    setSelectedApi(e.target.value);
  };

  // Scroll to the latest message
  const scroll = () => {
    if (chatContainer.current) {

      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current
      console.log('Scrolling:', { offsetHeight, scrollHeight, scrollTop })
      chatContainer.current.scrollTo(0, scrollHeight)
    }
  }


  // Scroll when messages are updated
  useEffect(() => {
    scroll();
  }, [messages]);

  // Render the chat messages
  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`chat-line ${
              message.role === 'user' ? 'user-chat' : 'ai-chat'
            } flex items-start mb-4`}
          >
            <Image
              src={message.role === 'user' ? '/user.png' : '/robot.png'}
              alt="avatar"
              width={40}
              height={40}
              className="avatar rounded-full"
            />
            <div className="ml-4 flex-grow">
              <div
                className={`message p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-gray-300 text-gray-900'
                }`}
                style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              {index < messages.length - 1 && (
                <div className="horizontal-line my-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="chat flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl shadow-2xl">
      {/* Chat messages */}
      <div
        ref={chatContainer}
        className="flex-grow p-6 overflow-y-auto bg-gradient-to-b from-gray-100 to-white rounded-t-xl"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
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
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="chat-form flex items-center bg-gray-200 p-3 rounded-full mx-4 mb-4"
      >
        <input
          name="input-field"
          type="text"
          value={input}
          onChange={(e) => {
            console.log('Input changed:', e.target.value)
            handleInputChange(e)
          }}

          placeholder="How can I help..."
          className="flex-grow bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none px-3"
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
  )
}


export default Chat;
