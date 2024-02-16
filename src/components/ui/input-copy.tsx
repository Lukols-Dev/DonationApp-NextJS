"use client";

import { Copy } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

interface Props {
  value?: string;
}

const InputCopy = ({ value }: Props) => {
  const [isTooltip, setTooltip] = useState<boolean>(false);

  const copyToClipboard = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        setTooltip(true);
        setTimeout(() => {
          setTooltip(false);
        }, 2000);
      } catch (err) {
        setTooltip(false);
        console.error("Error copy to clipboard:", err);
      }
    }
  };
  return (
    <div className="w-full h-11 relative">
      <Input readOnly className="pr-9" value={value} />
      <Copy
        className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        onClick={copyToClipboard}
      />
      {isTooltip && (
        <span className="absolute -bottom-4 right-0 text-xs">Skopiowano</span>
      )}
    </div>
  );
};

export default InputCopy;
