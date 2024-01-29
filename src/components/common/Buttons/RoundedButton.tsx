import { Menu } from "lucide-react";
import Magnetic from "../Magnetic";

const RoundedButton = () => {
  return (
    <Magnetic>
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black cursor-pointer text-white px-15 py-3">
        <Menu />
      </div>
    </Magnetic>
  );
};

export default RoundedButton;
