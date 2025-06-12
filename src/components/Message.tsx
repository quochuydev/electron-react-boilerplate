/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import CopyButton from './CopyButton';

export default function Message({
  message,
  onClick,
  isSelected,
}: {
  message: {
    id: number;
    text: string;
    createdAt: string;
  };
  isSelected: boolean;
  onClick: () => void;
}) {
  const formattedMessage = (input: string) => {
    return input
      .split('\n')
      .map((line, index) => <div key={index}>{line}</div>);
  };

  return (
    <div key={message.id} className="flex items-center gap-[8px]">
      <div>
        <CopyButton text={message.text} />
      </div>
      <div
        key={message.id}
        className="message flex flex-col gap-[4px] p-[4px]"
        style={{
          backgroundColor: isSelected ? 'rgba(255,255,255,0.9)' : 'white',
        }}
        onClick={onClick}
      >
        {formattedMessage(message.text)}
      </div>
    </div>
  );
}
