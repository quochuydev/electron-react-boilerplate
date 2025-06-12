import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import CountUpTimer from './CountUpTimer';
import ConfirmModal from './ConfirmModal';
import InputArea from './InputArea';
import MessageAction from './MessageAction';

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
      deleteMessages: (ids: number[]) => Promise<any>;
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const msgs = await window.electron.getMessages();
    setMessages(msgs);
  };

  const deleteMessages = async (ids: number[]) => {
    await window.electron.deleteMessages(ids);
    fetchMessages();
  };

  const send = async (text: string) => {
    await window.electron.saveMessage(text);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const [transparent, setTransparent] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<
    {
      id: number;
      text: string;
      createdAt: string;
    }[]
  >([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="chat-box">
      <ConfirmModal
        isOpen={openDeleteModal}
        onConfirm={async () => {
          if (selectedMessages.length) {
            await deleteMessages(selectedMessages.map((m) => m.id));
          }
          setSelectedMessages([]);
          setOpenDeleteModal(false);
        }}
        onCancel={() => setOpenDeleteModal(false)}
        message="Are you sure you want to delete these messages?"
      />

      <div
        className="flex items-center gap-[4px] draggable"
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
          💡
        </button>

        <CountUpTimer onFinish={(time: string) => send(`Finished: ${time}`)} />

        {!!selectedMessages.length && (
          <MessageAction
            onClick={() => setOpenDeleteModal(true)}
            selectedMessages={selectedMessages}
            setSelectedMessages={setSelectedMessages}
          />
        )}
      </div>

      <div
        style={{
          backgroundColor: transparent ? 'rgba(0, 0, 0, 0.1)' : 'black',
        }}
      >
        <div className="messages" ref={scrollRef}>
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isSelected={selectedMessages?.some((m) => m.id === message.id)}
              onClick={() => {
                if (selectedMessages?.some((m) => m.id === message.id)) {
                  setSelectedMessages((prev) =>
                    prev.filter((m) => m.id !== message.id),
                  );
                } else {
                  setSelectedMessages((prev) => [...prev, message]);
                }
              }}
            />
          ))}
        </div>

        <InputArea onSend={send} />
      </div>
    </div>
  );
}
