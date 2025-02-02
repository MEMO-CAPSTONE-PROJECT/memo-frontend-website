"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import TopbarButton from "@/components/button/memo-topbar";
import SearchIcon from "@/components/ui/icons/dashboard/search-icon";
import TableComponent from "@/components/dashboard/table";
import { students as initialStudents } from "@/app/data/students";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [students, setStudents] = useState(initialStudents);

  const tableHeaders = ["รหัส", "ชื่อ", "นามสกุล", "ชั้น", "ข้อมูลผู้ปกครอง", "แอคชั่น"];

  const renderRow = (student: typeof students[0], isSelected: boolean) => {
    const rowData = [
      showCheckboxes ? (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCheckboxChange(student.id)}
          className="w-4 h-4"
        />
      ) : (
        <div className="w-4 h-4" />
      ),
      student.id,
      student.firstName,
      student.lastName,
      student.grade,
      <button className="underline text-system-button">{student.guardianInfo}</button>,
      <button className="flex items-center bg-system-button text-system-white rounded-sm px-2 py-1">แก้ไข</button>
    ];

    return (
      <>
        {rowData.map((data, index) => (
          <td key={index} className="px-4 py-2 border">{data}</td>
        ))}
      </>
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      newSelectedRows.has(id) ? newSelectedRows.delete(id) : newSelectedRows.add(id);
      return newSelectedRows;
    });
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(true);
    setSelectedRows(new Set());
    setSelectAll(false);
    setIsDeleteMode(true);
  };

  const cancelDelete = () => {
    setShowCheckboxes(false);
    setIsDeleteMode(false);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectAll ? new Set() : new Set(students.map((student) => student.id)));
    setSelectAll(!selectAll);
  };

  const handleDelete = () => {
    setStudents(students.filter((student) => !selectedRows.has(student.id)));
    setSelectedRows(new Set());
    setIsDeleteMode(false);
    setShowCheckboxes(false); // Hide checkboxes after delete
  };

  return (
    <div className="flex bg-system-white w-screen">
      <Sidebar />
      <div className="ml-4 pt-8 p-6 text-title-1 w-full">
        <div className="flex space-x-10">
          <TopbarButton name="รายชื่อครู" isActive={activeMenu === "รายชื่อครู"} onClick={() => setActiveMenu("รายชื่อครู")} />
          <TopbarButton name="รายชื่อนักเรียน" isActive={activeMenu === "รายชื่อนักเรียน"} onClick={() => setActiveMenu("รายชื่อนักเรียน")} />
        </div>
        <div className="pt-4">
          <p className="text-[20px] font-semibold">ระบบจัดการรายชื่อนักเรียน</p>
          <p className="text-[16px] text-body-2">ระบบจัดการรายชื่อนักเรียน</p>
        </div>
        <div className="relative flex pt-6 w-full mr-4 space-x-2">
          <div className="relative w-full">
            <input type="text" placeholder="ค้นหารายชื่อ" className="w-full pl-10 p-2 border-2xsm border-title-1 rounded-sm bg-system-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          {isDeleteMode ? (
            <>
              <button onClick={handleDelete} disabled={selectedRows.size === 0} className={`rounded-sm w-32 text-system-white ${selectedRows.size === 0 ? 'bg-body-2 cursor-not-allowed' : 'bg-system-error-2'}`}>
                ลบผู้ใช้ {selectedRows.size} ราย
              </button>
              <button onClick={cancelDelete} className="bg-system-success-2 rounded-sm w-32 text-system-white">ยกเลิก</button>
            </>
          ) : (
            <>
              <button onClick={toggleCheckboxes} className="bg-system-error-2 rounded-sm w-32 text-system-white">ถังขยะ</button>
              <button className="bg-system-success-2 rounded-sm w-32 text-system-white">เพิ่มผู้ใช้</button>
            </>
          )}
        </div>
        <TableComponent
          data={students}
          tableHead={
            <thead>
              <tr>
                {showCheckboxes && (
                  <th className="px-4 py-2 bg-primary-2 text-system-white text-left">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="w-4 h-4" />
                  </th>
                )}
                {tableHeaders.map((header, index) => (
                  <th key={index} className="px-4 py-2 bg-primary-2 text-system-white text-left">{header}</th>
                ))}
              </tr>
            </thead>
          }
          renderRow={renderRow}
          selectedRows={selectedRows}
          onRowSelect={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;