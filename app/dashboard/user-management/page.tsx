"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { MEMO_API } from "@/constants/apis";
import apiClient from "@/components/axios/axiosConfig";
import Table from "@/components/dashboard/table";
import Filterbutton from "@/components/dashboard/filterbutton";
import Searchbar from "@/components/dashboard/searchbar";
import Sidebar from "@/components/dashboard/sidebar";
import TopbarButton from "@/components/button/memo-topbar";
import MemoPopUp from '@/components/container/memo-popup-notime';
import MemoButton from '@/components/button/memo-button'

import EditIcon from "@/components/ui/icons/dashboard/edit-icon";
import CancelIcon from "@/components/ui/icons/pop-up/cancel-icon"
import CaretLefttIcon from "@/components/ui/icons/dashboard/caret-left";
import CaretRightIcon from "@/components/ui/icons/dashboard/caret-right";


interface Teacher {
  teacherId: string;
  firstName: string;
  lastName: string;
  gender: string;
  position: string;
  class?: { level?: number; room?: number };
  email: string;
  phoneNumber: string;
}

interface Student {
  studentId: number; 
  firstName: string;
  lastName: string;
  classLevel: number;
  classRoom: number;
  gender: string;
  startDate: Date;
  parents?: ParentInfo[];
}

interface ParentInfo {
  parentId: number;
  firstName: string;
  lastName: string;
  relation: string;
  phoneNumber: string;
  emailParent: string;
}


const checkAuth = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    return payload.exp * 1000 > Date.now(); // ตรวจสอบว่าหมดอายุหรือยัง
  } catch (e) {
    console.log(e)
    return false;
  }
};

const teacherFilterOptions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "teacherId", label: "รหัสครู" },  
  { value: "firstName", label: "ชื่อ" },
  { value: "lastName", label: "นามสกุล" },
  { value: "gender", label: "เพศ" },
  { value: "position", label: "ตำแหน่ง" },
  { value: "classLevel", label: "ระดับชั้น" },
  { value: "classRoom", label: "ห้องเรียน" },
  { value: "email", label: "อีเมล" },  
  { value: "phoneNumber", label: "เบอร์โทร" },
];

const studentFilterOptions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "studentId", label: "รหัสนักเรียน" },
  { value: "firstName", label: "ชื่อ" },
  { value: "lastName", label: "นามสกุล" },
  { value: "gender", label: "เพศ" },
  { value: "classLevel", label: "ระดับชั้น" },
  { value: "classRoom", label: "ห้องเรียน" },
];

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParents, setSelectedParents] = useState<ParentInfo[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const rowsPerPage = 10;
  const router = useRouter();

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchType, setSearchType] = useState("ทั้งหมด");
  const [searchText, setSearchText] = useState(""); 
  const filterOptions = activeMenu === "รายชื่อครู" ? teacherFilterOptions : studentFilterOptions;

  useEffect(() => {
    if (!checkAuth()) {
      alert("Token หมดอายุ กรุณา Login ใหม่");
      localStorage.removeItem("token");
      router.push("/admin/login");
      return; 
    }
  }, [router]);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeMenu === "รายชื่อครู") {
          const response = await apiClient.get<{ data: { teachers: Teacher[] } }>(
            MEMO_API.teachersList
          );
          setTeachers(response.data.data.teachers || []);
        } else if (activeMenu === "รายชื่อนักเรียน") {
          const response = await apiClient.get<{ data: { students: Student[] } }>(
            MEMO_API.studentsList
          );
  
          const studentList = response.data.data.students.map((student) => ({
            ...student,
            startDate: new Date(student.startDate),
          }));
  
          setStudents(studentList);
        }
      } catch (err) {
        console.log(err);
        setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [activeMenu]);
  

  useEffect(() => {
    if (activeMenu === "รายชื่อครู") {
      let filtered = teachers;
      if (searchText.trim() !== "") {
        const searchLower = searchText.toLowerCase();
        filtered = teachers.filter((teacher) => {
          if (searchType === "ทั้งหมด" || searchType === "all") {
            return [
              ...Object.entries(teacher)
                .filter(([key]) => key !== "startDate"), 
              ["classRoom", teacher.class?.room], 
              ["classLevel", teacher.class?.level] 
            ].some(([_, value]) => String(value ?? "").toLowerCase().includes(searchLower));
          }
          if (searchType === "classRoom") {
            return String(teacher.class?.room ?? "").toLowerCase().includes(searchLower);
          }
          if (searchType === "classLevel") {
            return String(teacher.class?.level ?? "").toLowerCase().includes(searchLower);
          }
          return String(teacher[searchType as keyof Teacher] ?? "").toLowerCase().includes(searchLower);
        });
      }
  
      setFilteredTeachers(filtered);
    } else {
      let filtered = students;
  
      if (searchText.trim() !== "") {
        const searchLower = searchText.toLowerCase();
  
        filtered = students.filter((student) => {
          if (searchType === "ทั้งหมด" || searchType === "all") {
            return Object.entries(student)
              .filter(([key]) => key !== "startDate") 
              .some(([_, value]) => String(value ?? "").toLowerCase().includes(searchLower));
          }
  
          return String(student[searchType as keyof Student] ?? "").toLowerCase().includes(searchLower);
        });
      }
      setFilteredStudents(filtered);
    }
  }, [searchText, searchType, activeMenu, teachers, students]);
  
  
  
  
  

  const totalPages = Math.ceil((activeMenu === "รายชื่อครู" ? teachers.length : students.length) / rowsPerPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginateData = <T,>(data: T[]): T[] => 
    data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  
  const handleEdit = (id: string) => {
    alert(`แก้ไขข้อมูล ID: ${id}`);
  };

  const handleShowDetails = (parents: ParentInfo[]) => {
    setSelectedParents(parents);
    setShowPopup(true);
  };

  const teacherColumns = [
    { key: "teacherId", label: "รหัส", header: "รหัส" },
    { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
    { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
    { key: "gender", label: "เพศ", header: "เพศ" },
    { key: "position", label: "ตำแหน่ง", header: "ตำแหน่ง" },
    { key: "class", label: "ชั้น", header: "ชั้น" },
    { key: "email", label: "อีเมล", header: "อีเมล" },
    { key: "phoneNumber", label: "เบอร์โทร", header: "เบอร์โทร" },
    { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
  ];

  const studentColumns = [
    { key: "studentId", label: "รหัส", header: "รหัส" },
    { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
    { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
    { key: "gender", label: "เพศ", header: "เพศ" },
    { key: "classLevel", label: "ชั้น", header: "ชั้น" },
    { key: "details", label: "ข้อมูลเพิ่มเติม", header: "ข้อมูลเพิ่มเติม" },
    { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
  ];

  
  return (
    <div className="flex bg-system-white w-screen">

    
      <Sidebar />
      <div className="ml-4 pt-6 p-6 text-title-1 w-full bg-system-white">
      <div className="flex ">
          <TopbarButton name="รายชื่อครู" isActive={activeMenu === "รายชื่อครู"} onClick={() => { setActiveMenu("รายชื่อครู"); setCurrentPage(1); }} />
          <TopbarButton name="รายชื่อนักเรียน" isActive={activeMenu === "รายชื่อนักเรียน"} onClick={() => { setActiveMenu("รายชื่อนักเรียน"); setCurrentPage(1); }} />
        </div>

        <div className="pt-8">
          <p className="text-[20px] font-semibold">ระบบจัดการรายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}</p>
          <p className="text-[16px] text-body-2">รายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}ที่สมัครเข้าใช้งานระบบ Memo</p>
        </div>

        <div className="relative flex pt-6 w-full space-x-2">
           <div className="relative w-full flex">
              <Searchbar onSearch={setSearchText} />
              <Filterbutton options={filterOptions} selectedFilter={searchType} onChange={setSearchType} />
             
            </div>
          <button className="bg-system-error-2 rounded-sm w-32 text-system-white">ถังขยะ</button>
          <button className="bg-system-success-2 rounded-sm w-32 text-system-white">เพิ่มผู้ใช้</button>
        </div>
      

        {activeMenu === "รายชื่อครู" && (
          <Table 
            data={paginateData(filteredTeachers)}  
            columns={teacherColumns} 
            renderRow={(teacher) => [
              <span key={`id-${teacher.teacherId}`}>{teacher.teacherId}</span>,
              <span key={`fname-${teacher.teacherId}`}>{teacher.firstName}</span>,
              <span key={`lname-${teacher.teacherId}`}>{teacher.lastName}</span>,
              <span key={`gender-${teacher.teacherId}`}>{teacher.gender}</span>,
              <span key={`position-${teacher.teacherId}`}>{teacher.position}</span>,
              <span key={`class-${teacher.teacherId}`}>
                {teacher.class?.level ? `ป. ${teacher.class.level}` : "-"}
                {teacher.class?.room ? `/${teacher.class.room}` : ""}
              </span>,
              <span key={`email-${teacher.teacherId}`}>{teacher.email}</span>,
              <span key={`phone-${teacher.teacherId}`}>{teacher.phoneNumber}</span>,
              <div key={`action-${teacher.teacherId}`} className="flex justify-center">
                <button 
                  className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" 
                  onClick={() => handleEdit(teacher.teacherId)}
                >
                  <EditIcon className="h-6 w-6" />
                  <span>แก้ไข</span>
                </button>
              </div>,
            ]}
            loading={loading}
            error={error}
          />
          )}

{activeMenu === "รายชื่อนักเรียน" && (
  <Table 
  data={paginateData(filteredStudents)}  
    columns={studentColumns} 
    renderRow={(student) => [
      <span key={`${student.studentId}-id`}>{student.studentId}</span>,
      <span key={`${student.studentId}-firstName`}>{student.firstName}</span>,
      <span key={`${student.studentId}-lastName`}>{student.lastName}</span>,
      <span key={`${student.studentId}-gender`}>{student.gender}</span>,
      <span key={`${student.studentId}-class`}>ป. {student.classLevel}/{student.classRoom}</span>,
      <button 
        key={`${student.studentId}-details`} 
        className="text-system-button underline" 
        onClick={() => handleShowDetails(student.parents ?? [])}
      >
        รายละเอียด
      </button>,
      <div key={`${student.studentId}-actions`} className="flex justify-center">
        <button 
          className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" 
          onClick={() => handleEdit(student.studentId.toString())}
        >
          <EditIcon className="h-6 w-6" />
          <span>แก้ไข</span>
        </button>
      </div>,
    ]}
    loading={loading}
    error={error}
  />       
)}


          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mt-4  bg-white p-3 pl-20 ">
            <button 
              className="flex items-center space-x-2 border-x-2xsm border-y-2xsm  border-system-gray text-white rounded disabled:opacity-50 p-2" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
            <CaretLefttIcon className="h-6 w-6" />
            </button>

              <div className="flex">
                <div className="px-4 py-2 font-semibold text-primary-2 text-[16px] border-x-2xsm border-y-2xsm  border-system-gray">{currentPage} / {totalPages}</div> 
              </div>

            <button 
              className="flex items-center space-x-2 border-x-2xsm border-y-2xsm  border-system-gray text-white rounded disabled:opacity-50 p-2" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
            <CaretRightIcon className="h-6 w-6" />
            </button>
          </div>

          {showPopup && (
          <MemoPopUp show={showPopup} onClose={() => setShowPopup(false)}>
          <div className="w-full relative pl-4 pr-4">
            <h2 className="text-lg font-bold mb-2 mt-2">ข้อมูลผู้ปกครอง</h2>
              {selectedParents.length > 0 ? (
                selectedParents.map((parent) => (
                  <div key={parent.parentId} className="mb-2" >
                    <p><span className='font-semibold '>ชื่อ : </span> {parent.firstName} {parent.lastName}</p>
                    <p><span className='font-semibold '>อีเมล : </span> {parent.emailParent}</p>
                    <p><span className='font-semibold '>เบอร์โทร : </span> {parent.phoneNumber}</p>
                    <p><span className='font-semibold '>ความสัมพันธ์ : </span> {parent.relation}</p>
                  </div>
                  
                ))
              ) : (
                <p>ไม่มีข้อมูลผู้ปกครอง</p>
              )} <MemoButton  title="ย้อนกลับ" onClick={() => setShowPopup(false)} />
            </div>

        </MemoPopUp>



        )}

      </div>
      </div>
  );
};

export default Dashboard;




