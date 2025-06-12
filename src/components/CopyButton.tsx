import React, { useState } from 'react';

export default function Message({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={handleCopy} className="icon-btn">
      {copied ? '✅ ' : '📝'}
    </button>
  );
}
