import { useClipboard } from "@/hooks/use-clipboard";
import { Clipboard } from "lucide-react";
import React from "react";

export const CodeRenderer = ({ data }: { data: any }) => {
  const { copyToClipboard, copied } = useClipboard();
  const formattedData = JSON.stringify(data, null, 2);

  return (
    <div className="font-mono relative bg-muted w-full h-64 flex flex-col overflow-hidden">
      <pre className="p-4 rounded-md overflow-auto">{formattedData}</pre>
      <button
        className="absolute top-4 right-4 text-sm text-muted-foreground p-1"
        onClick={() => copyToClipboard(formattedData)}
      >
        {copied ? "Copied!" : <Clipboard className="size-4" />}
      </button>
    </div>
  );
};
