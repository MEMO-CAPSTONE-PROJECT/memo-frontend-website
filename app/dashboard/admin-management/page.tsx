"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import apiClient from "@/components/axios/axiosConfig";
import Table from "@/components/dashboard/table";
import { MEMO_API } from "@/constants/apis";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import PopUpAddAdminList from "@/components/dashboard/add-user/PopUpAddAdminList";
import PopUpEditAdminList from "@/components/dashboard/Edit-popup/PopUpEditAdmin"; // Import PopUpEditAdminList
import MemoButton from "@/components/button/memo-button";
import Searchbar from "@/components/dashboard/searchbar";
import EditIcon from "@/components/ui/icons/dashboard/edit-icon";

interface AdminTable {
  teacherId: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AdminData {
  teacherId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminManagement = () => {
  const [data, setData] = useState<AdminTable[] | undefined>(undefined);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [errorGet, setErrorGet] = useState<string | null>(null);
  const [isAdminAddPopupOpen, setIsAdminAddPopupOpen] = useState(false);
  const [isAdminEditPopupOpen, setIsAdminEditPopupOpen] = useState(false); // State for edit popup
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null); // Selected admin for edit

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAdd(true);
      setErrorGet(null);
      try {
        const response = await apiClient.get(MEMO_API.adminList);
        if (response.data.data.registers) {
          const registers: AdminTable[] = response.data.data.registers;
          setData(registers);
        } else {
          setData([]);
        }
      } catch (err: any) {
        setErrorGet(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoadingAdd(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "รหัสครู", key: "teacherId" },
    { header: "ชื่อ", key: "firstName" },
    { header: "นามสกุล", key: "lastName" },
    { header: "ชื่อผู้ใช้", key: "username" },
    { header: "อีเมล", key: "email" },
    { header: "Action", key: "action" },
  ];

  const renderRow = (item: AdminTable) => {
    return [
      item.teacherId,
      item.firstName,
      item.lastName,
      item.username,
      item.email,
      <button
        className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2"
        onClick={() => handleEditAdmin(item)} // Call edit on button click
        key={item.teacherId} 
      >
        <EditIcon className="h-6 w-6" />
        <span>แก้ไข</span>
      </button>,
    ];
  };

  const handleEditAdmin = (item: AdminTable) => {
    const adminData: AdminData = {
      teacherId: item.teacherId,
      firstName: item.firstName,
      lastName: item.lastName,
      userName: item.username,  // แปลง username เป็น userName
      email: item.email,
      password: "",  // กำหนดค่าเริ่มต้น
      confirmPassword: "",  // กำหนดค่าเริ่มต้น
    };
  
    setSelectedAdmin(adminData);  // ตั้งค่า state ให้เป็น AdminData
    setIsAdminEditPopupOpen(true);  // เปิด PopUp
  };

  const closeAdminAddPopup = () => setIsAdminAddPopupOpen(false);
  const openAdminAddPopup = () => setIsAdminAddPopupOpen(true);

  const handleAddAdminSuccess = () => {
    console.log("Admin Added Successfully!");
  };

  return (
    <AuthGuard>
      <div className="flex bg-system-white w-screen">
        <Sidebar />

        <div className="ml-4 pt-8 p-6 text-title-1 w-full">
          <div className="pt-4">
            <p className="text-[20px] font-semibold">
              ระบบจัดการรายชื่อผู้ดูแลระบบ
            </p>
            <p className="text-[16px] text-body-2">
              ระบบจัดการรายชื่อผู้ดูแลระบบ
            </p>
          </div>
          <div className="relative flex pt-6 w-full space-x-2">
            <div className="relative w-full flex"></div>
            <MemoButton
              title="ลบผู้ดูแลระบบ"
              variant="cancle"
              onClick={openAdminAddPopup}
            />
            <MemoButton
              title="เพิ่มผู้ดูแลระบบ"
              variant="success"
              onClick={openAdminAddPopup}
            />
          </div>
          {/* เรียกใช้งาน PopUpAddAdmin */}
          <PopUpAddAdminList
            isOpen={isAdminAddPopupOpen}
            onClose={closeAdminAddPopup}
            onAddSuccess={handleAddAdminSuccess}
          />
          {/* เรียกใช้งาน PopUpEditAdminList */}
          <PopUpEditAdminList
            isOpen={isAdminEditPopupOpen}
            onClose={() => setIsAdminEditPopupOpen(false)}
            onEditSuccess={() => console.log("Admin Edited Successfully!")}
            adminData={selectedAdmin} // Pass selected admin data to the popup
          />
          <Table
            columns={columns}
            data={data || []}
            renderRow={renderRow}
            loading={loadingAdd}
            error={errorGet}
          />
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminManagement;
