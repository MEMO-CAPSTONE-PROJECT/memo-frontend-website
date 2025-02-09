
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface MemoPopUpProps {
  children: React.ReactNode;
  className?: string;
  onClose: () => void; 
  show: boolean; 
  redirectUrl?: string;
}

export default function MemoPopUp({
  children,
  className = '',
  show,
  onClose,
  redirectUrl,
}: Readonly<MemoPopUpProps>) {
  const router = useRouter();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (redirectUrl) {
          router.push(redirectUrl); 
        }
        onClose(); 
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, redirectUrl, router]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-title-1 bg-opacity-50 ${className}`}
    >
      <div className="relative bg-system-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="mb-4 flex flex-col items-center justify-center">{children}</div>
        <div className="flex justify-end space-x-4"></div>
      </div>
    </div>
  );
}
