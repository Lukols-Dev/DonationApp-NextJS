import { Copy } from "lucide-react";
import { Input } from "./input";

const InputCopy = () => {
  return (
    <div className="w-full h-11 relative">
      <Input readOnly className="pr-9" />
      <Copy className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2" />
    </div>
  );
};

export default InputCopy;
