"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import apiClient from "@/components/axios/axiosConfig";
import Table from "@/components/dashboard/table";
import { MEMO_API } from "@/constants/apis";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import PopUpAddAdminList from "@/components/dashboard/add-user/PopUpAddAdminList";
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

const Dashboard = () => {
  const [data, setData] = useState<AdminTable[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(MEMO_API.adminList);
        console.log(response);
        console.log(response.data.data);
        console.log(response.data); // ดูโครงสร้างของข้อมูล
        console.log(response.data.data.registers); // ตรวจสอบว่า fields ตรงหรือไม่

        if (response.data.data.registers) {
          const registers: AdminTable[] = response.data.data.registers;
          setData(registers);
        } else {
          setData([]);
        }
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
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
    { header: "Action", key: "action" }, // ✅ เพิ่มคอลัมน์ Action
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
                        onClick={() => handleEditAdmin(item)}
                        key={item.teacherId} // ใช้ key เพื่อระบุปุ่มแก้ไขเฉพาะแถว
                      >
                        <EditIcon className="h-6 w-6" />
                        <span>แก้ไข</span>
                      </button>

    ];
  };
  const handleEditAdmin = (item: AdminTable) => {
    console.log("แก้ไขข้อมูลของ:", item);
    // สามารถเปิด PopUp หรือทำการแก้ไขข้อมูลได้
  };
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);

  // ฟังก์ชันเปิด/ปิด PopUp
  const openAdminPopup = () => setIsAdminPopupOpen(true);
  const closeAdminPopup = () => setIsAdminPopupOpen(false);

  // ฟังก์ชันเมื่อเพิ่ม admin สำเร็จ
  const handleAddAdminSuccess = () => {
    // คุณสามารถทำสิ่งที่ต้องการหลังจากเพิ่ม admin สำเร็จ เช่น รีเฟรชข้อมูล
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
              onClick={openAdminPopup}
            />
            <MemoButton
              title="เพิ่มผู้ดูแลระบบ"
              variant="success"
              onClick={openAdminPopup}
            />
          </div>
          {/* เรียกใช้งาน PopUpAddAdmin */}
          <PopUpAddAdminList
            isOpen={isAdminPopupOpen}
            onClose={closeAdminPopup}
            onAddSuccess={handleAddAdminSuccess}
          />
          <Table
            columns={columns}
            data={data || []}
            renderRow={renderRow}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
