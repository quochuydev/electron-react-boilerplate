import React, { useState } from 'react';

export default function InputArea({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setInput('');
      onSend(input);
    }
  };

  return (
    <div className="input-area">
      <textarea
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        style={{ width: '100%' }}
      />
      <button type="button" className="send-btn" onClick={handleSend}>
        ➤
      </button>
    </div>
  );
}
