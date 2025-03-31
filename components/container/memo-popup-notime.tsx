import React from 'react';

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
}: Readonly<MemoPopUpProps>) {

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-title-1 bg-opacity-50 ${className}`}
    >
      <div className="relative bg-system-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center justify-center">{children}</div>
        <div className="flex justify-end space-x-4"></div>
      </div>
    </div>
  );
}
