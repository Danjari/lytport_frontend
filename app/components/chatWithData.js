'use client'
import { useChat } from "ai/react" 
import ReactMarkdown from 'react-markdown' // Importing ReactMarkdown for rendering markdown content
import Image from "next/image" 
import { useRef, useEffect, useState } from 'react' 

// Defining the ChatMessage component
const ChatMessage = ({ content }) => {
  return (
    <div className="message-content">
      <ReactMarkdown>{content}</ReactMarkdown> 
    </div>
  )
}

// Defining the Chat component
const Chat = () => {
  // State to manage the selected API
  const [selectedApi, setSelectedApi] = useState('/api/openai')
  // Using the useChat hook to manage chat state and actions
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: selectedApi // Passing the selected API to the hook
  })

  // Ref for the chat container to manage scrolling
  const chatContainer = useRef(null)

  // Function to handle API selection change
  const handleApiChange = (e) => {
    setSelectedApi(e.target.value) // Updating the selected API state
  }

  // Function to scroll the chat container to the latest message
  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight) // Scroll to the bottom of the container
      }
    }
  }

  // Effect to scroll to the latest message when messages change
  useEffect(() => {
    scroll() // Calling the scroll function
  }, [messages]) // Dependency on messages

  // Function to render chat responses
  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`chat-line ${
              message.role === "user" ? "user-chat" : "ai-chat"
            } flex items-start mb-4`}
          >
            <Image
              src={message.role === "user" ? "/user.png" : "/robot.png"}
              alt="avatar"
              width={40}
              height={40}
              className="avatar rounded-full"
            />
            <div className="ml-4 flex-grow">
              <p
                className={`message p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-900"
                }`}
                style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
              >
                <ChatMessage content={message.content} /> 
              </p>
              {index < messages.length - 1 && (
                <div className="horizontal-line my-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Returning the Chat component
  return (
    <div className="chat flex flex-col h-full">
      <div
        ref={chatContainer}
        className="flex-grow p-4 overflow-y-auto bg-gray-100"
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        {renderResponse()}
      </div>

      <form
        onSubmit={handleSubmit}
        className="chat-form flex items-center bg-gray-200 p-3 rounded-full mx-4 mb-4"
      >
        <input
          name="input-field"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="How can I help..."
          className="flex-grow bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none px-3"
          autoComplete="off"
        />
        <div className="relative left-0 mt-0 w-30 md:w-[150px] bg-gray-200 text-gray-800 rounded-md shadow-lg mx-4">
          <select
            value={selectedApi}
            onChange={handleApiChange}
            className="block w-full bg-gray-300 text-gray-800 rounded-md py-2 px-3 focus:outline-none"
          >
            <option value="/api/openai">GPT-4o</option>
            <option value="/api/bedrock">llama3-70b</option>
          </select>
        </div>
        <button type="submit">
          <Image src="/send.png" alt="send" width={20} height={20} />
        </button>
      </form>
    </div>
  )
}

export default Chat