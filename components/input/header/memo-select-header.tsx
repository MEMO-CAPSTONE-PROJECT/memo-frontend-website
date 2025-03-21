import MemoSelectHelper, { MemoSelectHelperProps } from "@/components/input/memo-select-helper";
import React from 'react';

interface MemoSelectHeaderProps extends MemoSelectHelperProps {
  name: string
  label: string
}

const MemoSelectHeader: React.FC<MemoSelectHeaderProps> = ({ name, label, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-lg font-medium text-body-1 mb-2 ">
        {label}
      </label>
      <MemoSelectHelper size="full" name={name} {...props} />
    </div>
  );
};

export default MemoSelectHeader;
