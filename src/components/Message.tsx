import React from 'react';

export default function Message({
  message,
}: {
  message: {
    id: number;
    text: string;
    createdAt: string;
  };
}) {
  return (
    <div
      key={message.id}
      className="message flex flex-col gap-[4px] text-right"
    >
      <div className="text-[11px] hidden">
        {new Date(message.createdAt).toLocaleString()}
      </div>
      <div className="p-[4px]">{message.text}</div>
    </div>
  );
}
