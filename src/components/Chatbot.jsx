import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.scrollTop = scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/chat', { message: input });
      setMessages([...newMessages, { text: response.data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = (msg) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const messageWithLinks = msg.text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });

    return <div className={`message ${msg.sender}`}>{messageWithLinks}</div>;
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-messages" ref={messagesContainerRef}>
            {messages.map((msg, index) => (
              <div key={index}>{renderMessage(msg)}</div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="send-button">➔</button>
          </div>

        </div>
      )}
      {location.pathname !== '/' && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '💬'}
        </button>
      )}
    </div>
  );
};

export default Chatbot;
