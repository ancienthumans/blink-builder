import { useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string, timeout: number = 1000) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, timeout);
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  return { copied, copyToClipboard };
}
