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
import { useRouter } from 'next/navigation';

interface MemoPopUpProps {
  children: React.ReactNode;
  className?: string;
  onClose: () => void; // Make this required
  show: boolean; // Make this required
  redirectUrl?: string; // Add optional redirect URL
}

export default function MemoPopUp({
  children,
  className = '',
  show,
  onClose,
  redirectUrl,
}: MemoPopUpProps) {
  const router = useRouter();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (redirectUrl) {
          router.push(redirectUrl); 
        }
        onClose(); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, redirectUrl, router]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-title-1 bg-opacity-50 ${className}`}
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
