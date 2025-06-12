/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';

export default function MessageAction({
  onClick,
  selectedMessages,
  setSelectedMessages,
}: {
  onClick: () => void;
  selectedMessages: {
    id: number;
    text: string;
    createdAt: string;
  }[];
  setSelectedMessages: (
    messages: {
      id: number;
      text: string;
      createdAt: string;
    }[],
  ) => void;
}) {
  return (
    <div>
      <button className="icon-btn" type="button" onClick={onClick}>
        🗑️ ({selectedMessages.length})
      </button>
      <button
        className="icon-btn"
        type="button"
        onClick={() => setSelectedMessages([])}
      >
        ❌
      </button>
    </div>
  );
}
