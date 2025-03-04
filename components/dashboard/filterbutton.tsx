// components/FilterDropdown.tsx
import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonProps {
  options: FilterOption[];
  selectedFilter: string;
  onChange: (value: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ options, selectedFilter, onChange }) => {
  return (
    <select
      className="p-2 bg-system-white border-2xsm border-title-1 rounded-sm w-48 font-semibold "
      value={selectedFilter}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterButton;
