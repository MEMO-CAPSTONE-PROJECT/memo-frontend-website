import React, { ReactNode, useState } from "react";

interface TableProps<T> {
  data: T[]; // Accept data of any type
  tableHead: ReactNode; // รับ <thead> จาก parent
  renderRow: (item: T, isSelected: boolean) => ReactNode; // Render function for rows, allowing flexibility
  selectedRows: Set<string>; // รับค่าที่เป็น Set ของ id ที่ถูกเลือก
  onRowSelect: (id: string) => void; // ฟังก์ชันที่ใช้ในการเลือกแถว
}

const TableComponent = <T extends { id: string }>({
  data,
  tableHead,
  renderRow,
  selectedRows,
  onRowSelect,
}: TableProps<T>) => {
  return (
    <div className="pt-6">
      <table className="min-w-full table-auto text-[16px]">
        {tableHead}
        <tbody>
          {data.map((item) => {
            const isSelected = selectedRows.has(item.id); 
            return (
              <tr
                key={item.id}
                className={`border-b-2xsm border-system-gray min-w-full table-auto text-[16px] ${
                  isSelected ? "bg-system-light-purple border-primary-2 border-b-2xsm" : "" 
                }`}
              >
                {renderRow(item, isSelected)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
