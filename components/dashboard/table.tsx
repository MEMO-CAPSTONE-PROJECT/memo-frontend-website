import React from "react";

interface Column {
  header: string;
  key: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  renderRow: (item: any) => React.ReactNode[]; 
  loading?: boolean;
  error?: string | null;
}

const Table: React.FC<TableProps> = ({ columns, data, renderRow, loading, error }) => {
  return (
    <div className="w-full overflow-x-auto">
      {loading && <p className="text-center p-4">กำลังโหลดข้อมูล...</p>}
      {error && <p className="text-center text-secondary-3 p-4">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse mt-4">
          <thead>
          <tr className=" bg-primary-2 text-system-white text-[16px]">
              {columns.map((col) => (
                <th key={col.key} className={`border p-3 font-semibold ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border border-b-2xsm border-system-gray min-w-full table-auto text-[16px] text-center">
                  {renderRow(item).map((cell, cellIndex) => (
                    <td key={`${index}-${cellIndex}`} className={`border p-2 ${columns[cellIndex]?.className || ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
