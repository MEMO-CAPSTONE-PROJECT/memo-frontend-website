"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/components/axios/axiosConfig";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Table from "@/components/dashboard/table";
import { MEMO_API } from "@/constants/apis";
import Sidebar from "@/components/dashboard/sidebar";

import TopbarButton from "@/components/button/memo-topbar";
import MemoPopUp from "@/components/container/memo-popup-notime";
import MemoButton from "@/components/button/memo-button";
import TrashIcon from "@/components/ui/icons/dashboard/trash-icon";
import Searchbar from "@/components/dashboard/searchbar";

interface DeletedStudent {
  trashId: number;
  studentId: number;
  classRoom: number;
  classLevel: number;
  firstName: string;
  lastName: string;
  gender: string;
  emailStudent: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
}

interface DeletedTeacher {
  trashId: number;
  teacherId: number;
  position: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
}

type DeletedUser = DeletedStudent | DeletedTeacher;

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DeletedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
  const [selectedIds, setSelectedIds] = useState<number[]>([]); 
  const [deletingMode, setDeletingMode] = useState<boolean>(false); 
     const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          activeMenu === "รายชื่อครู"
            ? MEMO_API.teacherTrashes
            : MEMO_API.studentTrashes
        );
  
        const teacherData = response.data?.data?.trashedTeacher ?? [];
        const studentData = response.data?.data?.trashedStudent ?? [];
  
        const formattedData: DeletedUser[] =
          activeMenu === "รายชื่อครู"
            ? teacherData.map((item: any) => ({
                trashId: item.trashId,
                teacherId: item.teacherId,
                position: item.position,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                gender: item.gender,
                phoneNumber: item.phoneNumber,
                startDate: item.startDate,
                endDate: item.endDate,
              }))
            : studentData.map((item: any) => ({
                trashId: item.trashId,
                studentId: item.studentId,
                classRoom: item.classRoom,
                classLevel: item.classLevel,
                firstName: item.firstName,
                lastName: item.lastName,
                gender: item.gender,
                emailStudent: item.emailStudent,
                phoneNumber: item.phoneNumber,
                startDate: item.startDate,
                endDate: item.endDate,
              }));
  
        setData(formattedData);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        console.error(err);
      }
      setLoading(false);
    };
  
    fetchData();
  }, [activeMenu]);
  

  const renderRow = (item: DeletedUser) => {
    return [

      ...(deletingMode
        ? [
            <input
             
              type="checkbox"
              checked={selectedIds.includes(item.trashId)}
          onChange={() => handleSelectChange(item.trashId)}
            />,
          ]
        : []),
      "teacherId" in item ? item.teacherId : item.studentId, 
      item.firstName,
      item.lastName,
      item.gender,
      "teacherId" in item ? item.position : `ป.${item.classLevel}/${item.classRoom}`,
      "teacherId" in item ? item.email : item.emailStudent,
      item.phoneNumber,
      item.startDate ? (
        <div className="p-2"><span className="bg-system-success-light text-system-success-2 px-2 py-1 rounded-sm">
          {new Date(item.startDate).toLocaleDateString()}
        </span></div>
      ) : null,
      item.endDate ? (
        <span className="bg-system-error-light text-system-error-2 px-2 py-1 rounded-sm">
          {new Date(item.endDate).toLocaleDateString()}
        </span>
      ) : null,
    ];
  };
  
  
  

  // ปรับปรุง handleSelectChange ให้ทำงานได้ถูกต้อง
  const handleSelectChange = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((item) => item !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      setShowPopupDelete(true); // เปิด Popup ยืนยัน
    } else {
      alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
    }
  };
  
  const handleDeleteConfirm = async () => {
    
    try {
      const payload = { ids: selectedIds.map(String) }; // แปลง ID เป็น string[]
      const apiUrl = MEMO_API.allDeleteTrashes;
  
      const response = await apiClient.delete(apiUrl, {
        headers: { "Content-Type": "application/json" },
        data: payload, // ส่ง `ids` ที่เป็น string[]
      });
  
      if (response.status === 200) {
        setSelectedIds([]); // ล้างค่าที่เลือก
        setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.trashId)));
        console.log("ลบสำเร็จ")
      } else {
        console.log("ลบไม่สำเร็จ")
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการลบ");
      console.error(error);
    } finally {
      setShowPopupDelete(false); // ปิด Popup
    }
    setDeletingMode(false);
  };
  
  const handleCancelDelete = () => {
    setShowPopupDelete(false); // ปิด Popup ถ้าเลือก "ยกเลิก"
  };
  
  
  

  const handleToggleDeleteMode = () => {
    setDeletingMode(!deletingMode);
    // ล้างการเลือกข้อมูลเมื่อออกจากโหมดลบ
    if (deletingMode) {
      setSelectedIds([]);
    }
  };

  return (
    <AuthGuard>
      <div className="flex bg-system-white w-screen">
        <Sidebar />
        <div className="ml-4 pt-8 p-6 text-title-1 w-full">
          <div className="flex ">
            <TopbarButton
              name="รายชื่อครู"
              isActive={activeMenu === "รายชื่อครู"}
              onClick={() => setActiveMenu("รายชื่อครู")}
            />
            <TopbarButton
              name="รายชื่อนักเรียน"
              isActive={activeMenu === "รายชื่อนักเรียน"}
              onClick={() => setActiveMenu("รายชื่อนักเรียน")}
            />
          </div>

          <div className="pt-8">
            <p className="text-[20px] font-semibold">
              ระบบลบรายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
            </p>
            <p className="text-[16px] text-body-2">
              รายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
              ที่ถูกลบจากระบบ Memo{" "}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
  <Searchbar onSearch={setSearchText}  />
  
  <div className="flex space-x-2">
    <button
      className={`bg-system-error-2 rounded-sm w-32 text-system-white p-2 ${
        deletingMode && selectedIds.length === 0
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
      onClick={
        deletingMode ? handleDelete : () => setDeletingMode(true)
      }
      disabled={deletingMode && selectedIds.length === 0}
    >
      {deletingMode ? `ลบจำนวน ${selectedIds.length}` : "ถังขยะ"}
    </button>

    {deletingMode && (
      <button
        className="bg-body-2 rounded-sm w-32 text-system-white p-2"
        onClick={handleToggleDeleteMode}
      >
        ยกเลิก
      </button>
    )}
  </div>
</div>


<Table
  columns={
    activeMenu === "รายชื่อครู"
      ? [
          ...(deletingMode ? [{ header: "Select", key: "select" }] : []),
          { header: "รหัส", key: "Teacher ID" },
          { header: "ชื่อ", key: "First Name" },
          { header: "นามสกุล", key: "Last Name" },
          { header: "เพศ", key: "Gender" },
          { header: "ตำแหน่ง", key: "Position" },
          { header: "อีเมล", key: "Email" },
          { header: "เบอร์", key: "Phone Number" },
          { header: "วันเข้าสู่ระบบ", key: "Start Date" },
          { header: "วันออกจากระบบ", key: "End Date" },
        ]
      : [
          ...(deletingMode ? [{ header: "Select", key: "select" }] : []),
          { header: "รหัส", key: "studentId" },
          { header: "ชื่อ", key: "firstName" },
          { header: "นามสกุล", key: "lastName" },
          { header: "เพศ", key: "gender" },
          { header: "ชั้น", key: "classLevel" },
          { header: "อีเมล", key: "emailStudent" },
          { header: "เบอร์", key: "phoneNumber" },
          { header: "วันเข้าสู่ระบบ", key: "startDate" },
          { header: "วันออกจากระบบ", key: "endDate" },
        ]
  }
  data={data}
  renderRow={renderRow} // ✅ ใช้ renderRow เป็นตัวกำหนดค่า
  loading={loading}
  error={error}
/>

        </div>
        {showPopupDelete && ( 
  <MemoPopUp
    show={showPopupDelete}
    onClose={() => setShowPopupDelete(false)}
  >
    <TrashIcon className="w-44 h-44 p-6 mr-2 bg-system-error-2 mb-6 rounded-full mt-6" />
    <p className="text-center text-[18px] font-bold">
      ต้องการลบรายชื่อที่เลือกหรือไม่?
    </p>
    <div className="flex justify-between mt-6 w-full space-x-2 pl-4 pr-4 mb-2">
      <MemoButton
        title="ยกเลิก"
        variant="cancleghost"
        onClick={handleCancelDelete}
      />
      <MemoButton
        title="ยืนยัน"
        variant="cancle"
        onClick={handleDeleteConfirm}
      />
    </div>
  </MemoPopUp>
)}

      </div>
    </AuthGuard>
  );
};

export default Dashboard;
