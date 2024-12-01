import MemoInputTextHelper from "@/components/input/memo-input-text-helper";
import React from 'react';

interface MemoInputHeaderProps {
  text: string;
  type: string;
  name: string;
  placeholder: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemoInputHeader: React.FC<MemoInputHeaderProps> = ({
  text,
  type,
  name,
  placeholder,
  error,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-lg font-medium text-body-1 mb-2">
        {text}
      </label>
      <MemoInputTextHelper
        type={type}
        name={name}
        placeholder={placeholder}
        error={error}
        value={value}
        onChange={onChange}
        size="full"
      />
    </div>
  );
};

export default MemoInputHeader;
