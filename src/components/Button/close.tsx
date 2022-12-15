import React, {FC} from "react";

interface ButtonProps{
  onClick?: (() => Promise<void>) | (() => void);
}

const Close: FC<ButtonProps> = ({onClick}) => {
  return (
    <button 
      onClick={onClick}
      className="absolute shadow-md  text-gray-500 border-gray-100 bg-gray-100 rounded-3xl p-1 w-7 text-sm -top-2 -right-2 hover:bg-slate-200 hover:text-gray-700" 
    >
    x
    </button>
  );
};

export default Close;
