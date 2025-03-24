"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import TopbarButton from "@/components/button/memo-topbar";
import Filterbutton from "@/components/dashboard/filterbutton";
import Searchbar from "@/components/dashboard/searchbar";
import apiClient from "@/components/axios/axiosConfig";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Table from "@/components/dashboard/table";
import { MEMO_API } from "@/constants/apis";
import axios from "axios";


  interface TeacherData {
    registerId: number;
    status: string;
    role:string;
    registerTeacherData: {
      position: string;
      class?: { level?: number; room?: number };
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      phoneNumber: string;
    };
  }
  interface StudentData {
    registerId: number;
    status: string;
    role:string;
    registerStudentData: {
      student: {
        classRoom: string;
        classLevel: string;
        displayName: string;
        firstName: string;
        lastName: string;
        gender: string;
        emailStudent: string;
        phoneNumber: string;
        parentPhoneNumber: string;
      };
    };
  }
const UserRequests = () => {

    const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(MEMO_API.allUserRequests);
        const registers = response.data.data.registers;
        
        setTeachers(
          registers
            .filter((item: any) => item.role === "teacher" && item.registerTeacherData)
            .map((item: any) => ({
              registerId: item.registerId,
              status: item.status,
              role: item.role,
              registerTeacherData: item.registerTeacherData,
            }))
        );
        
        setStudents(
          registers
            .filter((item: any) => item.role === "student" && item.registerStudentData)
            .map((item: any) => ({
              registerId: item.registerId,
              status: item.status,
              role: item.role,
              registerStudentData: item.registerStudentData,
            }))
        );
        
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลได้");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    


  const columnsTeacher = [
    { header: "ID", key: "id", className: "w-20" },
    { header: "ชื่อ", key: "firstName" },
    { header: "นามสกุล", key: "lastName" },
    { header: "ตำแหน่ง", key: "position" },
    { header: "ชั้น", key: "class" },
    { header: "เพศ", key: "gender", className: "w-24" },
    { header: "อีเมล", key: "email" },
    { header: "เบอร์โทรศัพท์", key: "phoneNumber" },
    { header: "สถานะ", key: "status", className: "w-32" },
    { header: "แอคชั่น", key: "action", className: "w-40" },
  ];

  // 🔹 คอลัมน์ของนักเรียน
  const columnsStudent = [
    { header: "ID", key: "id", className: "w-20" },
    { header: "ชื่อ", key: "firstName" },
    { header: "นามสกุล", key: "lastName" },
    { header: "ชั้น", key: "classLevelRoom" },
    { header: "เพศ", key: "gender", className: "w-24" },
    { header: "อีเมล", key: "emailStudent" },
    { header: "เบอร์โทรศัพท์", key: "phoneNumber" },
    { header: "สถานะ", key: "status", className: "w-32" },
    { header: "แอคชั่น", key: "action", className: "w-40" },
  ];
  
  const handleApprove = async (id: number, role: string) => {
    try {
      const apiUrl =
        role === "teacher" ? MEMO_API.teacherApprove : MEMO_API.studentApprove;
      
      await axios.put(apiUrl, { id: id.toString() });
  
      console.log(`✅ อนุมัติสำเร็จ ID: ${id}`);
      fetchData();
    } catch (error) {
      console.error(`❌ อนุมัติไม่สำเร็จ ID: ${id}`, error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.put(MEMO_API.allUserDecline, { id: id.toString() });
  
      console.log(`❌ ปฏิเสธสำเร็จ ID: ${id}`);
      fetchData();
    } catch (error) {
      console.error(`⚠️ ปฏิเสธไม่สำเร็จ ID: ${id}`, error);
    }
  };

  const getStatusCell = (status: string) => {
    let bgColor = "bg-gray-200"; 
    if (status === "อนุมัติ") bgColor = "bg-system-success-light border-system-success-2 rounded-sm text-system-success-2";
    else if (status === "ไม่อนุมัติ") bgColor = "bg-secondary-4 border-system-success-2 rounded-sm text-system-error-2 ";
    else if (status === "รอดำเนินการ") bgColor = "bg-system-blue text-system-button border-system-button rounded-sm";
  
    return <span className={`px-2 py-1 rounded text-center ${bgColor}`}>{status}</span>;
  };  
  
  const renderRow = (item: TeacherData | StudentData) => {
    const actionButtons = (id: number, role: string) => (
      <div className="flex gap-2">
        <button
          className="bg-system-success-2 text-system-white px-6 py-2 rounded-sm flex items-center space-x-2"
          onClick={() => handleApprove(id, role)}
        >
          อนุมัติ
        </button>
        <button
          className="bg-system-error-2 text-system-white px-6 py-2 rounded-sm flex items-center space-x-2"
          onClick={() => handleReject(id)}
        >
          ปฏิเสธ
        </button>
      </div>
    );
  
    if (item.role === "teacher") {
      const teacher = item as TeacherData;
      const classLevel = teacher.registerTeacherData.class?.level
        ? `ป.${teacher.registerTeacherData.class.level}`
        : "";
      const classRoom = teacher.registerTeacherData.class?.room
        ? `/${teacher.registerTeacherData.class.room}`
        : "";
      const classDisplay = classLevel || classRoom ? `${classLevel}${classRoom}` : "-";
  
      return [
        teacher.registerId,
        teacher.registerTeacherData.firstName,
        teacher.registerTeacherData.lastName,
        teacher.registerTeacherData.position,
        classDisplay,
        teacher.registerTeacherData.gender,
        teacher.registerTeacherData.email,
        teacher.registerTeacherData.phoneNumber,
        getStatusCell(teacher.status), 
        statusFilter === "รอดำเนินการ" ? actionButtons(teacher.registerId, teacher.role) : null, 
      ].filter((col) => col !== null); 
    } else {
      const student = item as StudentData;
      return [
        student.registerId,
        student.registerStudentData.student.firstName,
        student.registerStudentData.student.lastName,
        `ป.${student.registerStudentData.student.classLevel}/${student.registerStudentData.student.classRoom}`,
        student.registerStudentData.student.gender,
        student.registerStudentData.student.emailStudent,
        student.registerStudentData.student.phoneNumber,
        getStatusCell(student.status),
        statusFilter === "รอดำเนินการ" ? actionButtons(student.registerId, student.role) : null, 
      ].filter((col) => col !== null); 
    }
  };
  
  
  const [statusFilter, setStatusFilter] = useState<string>("รอดำเนินการ");

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };
  
  // ตรวจสอบข้อมูลที่ต้องแสดงในตาราง
  const data: (TeacherData | StudentData)[] =
    activeMenu === "รายชื่อครู" ? teachers : students;
  
  // ฟิลเตอร์ข้อมูลตามสถานะที่เลือก
  const filteredData = data.filter((item) => item.status === statusFilter);
  
  // เลือกคอลัมน์ที่ต้องการแสดง
  const baseColumns =
    activeMenu === "รายชื่อครู" ? columnsTeacher : columnsStudent;
  
  // ถ้าเลือก "รอดำเนินการ" ให้แสดงคอลัมน์ action แต่ถ้าเป็นสถานะอื่นให้ซ่อน
  const filteredColumns =
    statusFilter === "รอดำเนินการ"
      ? baseColumns
      : baseColumns.filter((col) => col.key !== "action");

  return (
    <AuthGuard>
    <div className="flex bg-system-white w-screen">
      <Sidebar />

      <div className="ml-4 pt-6 p-6 text-title-1 w-full bg-system-white">
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
            ระบบจัดการคำขอสร้างบัญชี
            {activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
          </p>
          <p className="text-[16px] text-body-2">
          รายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
            ที่สมัครเข้าใช้งานระบบ Memo และรอการอนุมัติ
          </p>
        </div>

        <div className="flex gap-2 my-4">
  <button
    className={`px-4 py-2 rounded ${statusFilter === "อนุมัติ" ? "bg-green-500 text-white" : "bg-gray-200"}`}
    onClick={() => handleStatusFilter("อนุมัติ")}
  >
    อนุมัติ
  </button>
  <button
    className={`px-4 py-2 rounded ${statusFilter === "ไม่อนุมัติ" ? "bg-red-500 text-white" : "bg-gray-200"}`}
    onClick={() => handleStatusFilter("ไม่อนุมัติ")}
  >
    ไม่อนุมัติ
  </button>
  <button
    className={`px-4 py-2 rounded ${statusFilter === "รอดำเนินการ" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    onClick={() => handleStatusFilter("รอดำเนินการ")}
  >
    รอดำเนินการ
  </button>
</div>

<Table<TeacherData | StudentData>
  columns={filteredColumns}
  data={filteredData}
  renderRow={renderRow}
  loading={loading}
  error={error}
/>


        </div>
      </div>
    </AuthGuard>
  );
};

export default UserRequests;
