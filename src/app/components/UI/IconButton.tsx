
import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
