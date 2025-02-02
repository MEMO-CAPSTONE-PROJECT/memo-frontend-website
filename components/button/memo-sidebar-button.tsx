import React from "react";

interface SidebarButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode; 
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ name, isActive, onClick, icon }) => {
  return (
<button
  onClick={onClick}
  className={`
    text-[16px] py-3 px-4 mb-2 w-full
    rounded-[15px] flex items-center
    ${isActive ? "bg-primary-2-hover text-system-white" : "bg-transparent text-system-white"}
    hover:bg-system-white hover:bg-opacity-25
    cursor-pointer transition-colors
  `}
>
  <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 ">{icon}</span> 
  <span className="ml-2 text-left flex-1">{name}</span> 
</button>


  );
};

export default SidebarButton;

