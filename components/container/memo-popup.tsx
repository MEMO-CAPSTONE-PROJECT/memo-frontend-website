// import React from 'react';

// interface MemoPopUpProps {
//   children: React.ReactNode;
//   className?: string;
//   onClose?: () => void;
//   show?: boolean;
// }

// export default function MemoPopUp({
//   children,
//   className = '',
//   show = false,
//   onClose,
// }: Readonly<MemoPopUpProps>) {
//   if (!show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-title-1 bg-opacity-50 ${className}`}
//       onClick={onClose}
//     >
//       <div
//         className="relative bg-system-white rounded-lg shadow-lg p-6 w-full max-w-md"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="mb-4 flex flex-col items-center justify-center ">{children}</div>
//         <div className="flex justify-end space-x-4 ">

//         </div>
//       </div>
      
//     </div>
//   );
// }
import React, { useEffect } from 'react';

interface MemoPopUpProps {
  children: React.ReactNode;
  className?: string;
  onClose: () => void; // Make this required
  show: boolean; // Make this required
}

export default function MemoPopUp({
  children,
  className = '',
  show,
  onClose,
}: MemoPopUpProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Ensure onClose is called
      }, 5000); // 5 seconds

      // Cleanup timer on component unmount or if `show` changes
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-title-1 bg-opacity-50 ${className}`}
      onClick={onClose}
    >
      <div
        className="relative bg-system-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex flex-col items-center justify-center">{children}</div>
        <div className="flex justify-end space-x-4"></div>
      </div>
    </div>
  );
}
