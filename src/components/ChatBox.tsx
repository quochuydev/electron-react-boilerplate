import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import CountUpTimer from './CountUpTimer';

declare global {
  interface Window {
    api: {
      saveMessage: (text: string) => Promise<any>;
      getMessages: () => Promise<
        {
          id: number;
          text: string;
          createdAt: string;
        }[]
      >;
    };
  }
}

export default function ChatBox() {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
      createdAt: string;
    }[]
  >([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const msgs = await window.electron.getMessages();
    setMessages(msgs);
  };

  const send = async (text: string) => {
    await window.electron.saveMessage(text);
    fetchMessages();
  };

  const handleSend = async () => {
    if (input.trim()) {
      setInput('');
      await send(input);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const [transparent, setTransparent] = useState(false);

  return (
    <div className="chat-box">
      <div
        className="flex items-center gap-4 draggable"
        style={{
          backgroundColor: transparent ? 'rgba(0, 0, 0, 0.2)' : 'black',
          borderBottom: '1px solid white',
        }}
      >
        <button
          className="icon-btn"
          type="button"
          onClick={() => setTransparent((prev) => !prev)}
        >
          {transparent ? '💡' : '💡'}
        </button>
        <CountUpTimer onFinish={(time: string) => send(`Finished: ${time}`)} />
      </div>

      <div
        style={{
          backgroundColor: transparent ? 'rgba(0, 0, 0, 0.1)' : 'black',
        }}
      >
        <div className="messages" ref={scrollRef}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button type="button" className="send-btn" onClick={handleSend}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
