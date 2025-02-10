// import React from "react";

// interface TopbarButtonProps {
//   name: string;
//   isActive: boolean;
//   onClick: () => void;
// }

// const TopbarButton: React.FC<TopbarButtonProps> = ({ name, isActive, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         text-[16px] py-2 px-6 mb-2 w-44 font-medium 
//         rounded-[50px] flex justify-center items-center text-body-2
//         transition-colors cursor-pointer
//         ${isActive ? "bg-primary-1 text-title-1" : "bg-system-white "} 
//         hover:bg-title-1  hover:bg-opacity-10 
//       `}
//     >
//       <span className="text-center">{name}</span>
//     </button>
//   );
// };

// export default TopbarButton;

import React from "react";

interface TopbarButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TopbarButton: React.FC<TopbarButtonProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        text-[16px] py-4 px-6 mb-2 w-30 font-medium
        flex justify-center items-center text-body-2 
        transition-colors cursor-pointer relative
        ${isActive ? "text-primary-2" : "text-body-2"} 
        hover:bg-system-gray hover:bg-opacity-20
      `}
    >
      <span className="text-center">{name}</span>
      <div
        className={`absolute bottom-0 left-0 w-full h-[3px] transition-colors ${
          isActive ? "bg-primary-2" : "bg-system-gray"
        }`}
      ></div>
    </button>
  );
};

export default TopbarButton;
