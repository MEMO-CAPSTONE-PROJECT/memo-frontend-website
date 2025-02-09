// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "@/components/dashboard/sidebar";
// import TopbarButton from "@/components/button/memo-topbar";
// import SearchIcon from "@/components/ui/icons/dashboard/search-icon";
// import { MEMO_API } from "@/constants/apis";
// import Table from "@/components/dashboard/table";
// import EditIcon from "@/components/ui/icons/dashboard/edit-icon";

// interface Teacher {
//   teacherId: string;
//   firstName: string;
//   lastName: string;
//   class?: { level?: number; room?: number };
//   email: string;
//   phoneNumber: string;
// }

// interface Student {
//   studentId: string;
//   firstName: string;
//   lastName: string;
//   classLevel: number;
//   classRoom: number;
//   emailStudent: string;
//   phoneNumber: string;
// }

// const Dashboard = () => {
//   const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         if (activeMenu === "รายชื่อครู") {
//           const response = await axios.get(MEMO_API.teachersList);
//           setTeachers(response.data.data.teachers || []);
//         } else if (activeMenu === "รายชื่อนักเรียน") {
//           const response = await axios.get(MEMO_API.parentsList);
//           const studentList = response.data.data.parents.flatMap((parent: { students?: Student[] }) => parent.students || []);
//           setStudents(studentList);
//         }
//       } catch (err) {
//         setError("ไม่สามารถโหลดข้อมูลได้");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [activeMenu]);

//   const handleEdit = (id: string) => {
//     alert(`แก้ไขข้อมูล ID: ${id}`);
//   };
  
//   const teacherColumns = [
//     { key: "teacherId", label: "รหัส", header: "รหัส" },
//     { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
//     { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
//     { key: "position", label: "ตำแหน่ง", header: "ตำแหน่ง" },
//     { key: "class", label: "ชั้น", header: "ชั้น" },
//     { key: "email", label: "อีเมล", header: "อีเมล" },
//     { key: "phoneNumber", label: "เบอร์โทร", header: "เบอร์โทร" },
//     { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
//   ];
  
//   const studentColumns = [
//     { key: "studentId", label: "รหัส", header: "รหัส" },
//     { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
//     { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
//     { key: "classLevel", label: "ชั้น", header: "ชั้น" },
//     { key: "emailStudent", label: "อีเมล", header: "อีเมล" },
//     { key: "phoneNumber", label: "เบอร์โทร", header: "เบอร์โทร" },
//     { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
//   ];

//   return (
//     <div className="flex bg-system-white w-screen">
//       <Sidebar />
//       <div className="ml-4 pt-8 p-6 text-title-1 w-full">
//         <div className="flex space-x-10">
//           <TopbarButton name="รายชื่อครู" isActive={activeMenu === "รายชื่อครู"} onClick={() => setActiveMenu("รายชื่อครู")} />
//           <TopbarButton name="รายชื่อนักเรียน" isActive={activeMenu === "รายชื่อนักเรียน"} onClick={() => setActiveMenu("รายชื่อนักเรียน")} />
//         </div>

//         <div className="pt-4">
//           <p className="text-[20px] font-semibold">ระบบจัดการรายชื่อนักเรียน</p>
//           <p className="text-[16px] text-body-2">ระบบจัดการรายชื่อนักเรียน</p>
//         </div>

//         <div className="relative flex pt-6 w-full mr-4 space-x-2">
//           <div className="relative w-full">
//             <input type="text" placeholder="ค้นหารายชื่อ" className="w-full pl-10 p-2 border-2xsm border-title-1 rounded-sm bg-system-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//           <button className="bg-system-error-2 rounded-sm w-32 text-system-white">ถังขยะ</button>
//           <button className="bg-system-success-2 rounded-sm w-32 text-system-white">เพิ่มผู้ใช้</button>
//         </div>

//         {activeMenu === "รายชื่อครู" && (
//           <Table 
//             data={teachers} 
//             columns={teacherColumns} 
//             renderRow={(teacher) => [
//               teacher.teacherId,
//               teacher.firstName,
//               teacher.lastName,
//               teacher.position,
//               `${teacher.class?.level ? `ป. ${teacher.class.level}` : "-"} ${teacher.class?.room ?`/ ${teacher.class.room}` : ""}`,
//               teacher.email,
//               teacher.phoneNumber,

//               <div className="flex justify-center">
//               <button className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" onClick={() => handleEdit(teacher.teacherId)}>
//                 <EditIcon className="h-6 w-6 "/>
//                 <span>แก้ไข</span>
//               </button>
//               </div>
//             ]}
//             loading={loading}
//             error={error}
//           />
//         )}

//         {activeMenu === "รายชื่อนักเรียน" && (
//           <Table 
//             data={students} 
//             columns={studentColumns} 
//             renderRow={(student) => [
//               student.studentId,
//               student.firstName,
//               student.lastName,
//               `ป.${student.classLevel}/${student.classRoom}`,
//               student.emailStudent,
//               student.phoneNumber,
//               <div className="flex justify-center">
//               <button className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" onClick={() => handleEdit(student.studentId)}>
//               <EditIcon className="h-6 w-6 "/>
//               <span>แก้ไข</span>
//             </button>
//             </div>
//             ]}
//             loading={loading}
//             error={error}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/dashboard/sidebar";
import TopbarButton from "@/components/button/memo-topbar";
import SearchIcon from "@/components/ui/icons/dashboard/search-icon";
import { MEMO_API } from "@/constants/apis";
import Table from "@/components/dashboard/table";
import EditIcon from "@/components/ui/icons/dashboard/edit-icon";

interface Teacher {
  teacherId: string;
  firstName: string;
  lastName: string;
  class?: { level?: number; room?: number };
  email: string;
  phoneNumber: string;
}

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  classLevel: number;
  classRoom: number;
  emailStudent: string;
  phoneNumber: string;
  parents?: ParentInfo[];
}

interface ParentInfo {
  parentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeMenu === "รายชื่อครู") {
          const response = await axios.get(MEMO_API.teachersList);
          setTeachers(response.data.data.teachers || []);
        } else if (activeMenu === "รายชื่อนักเรียน") {
          const response = await axios.get(MEMO_API.parentsList);
          const studentList = response.data.data.parents.flatMap(
            (parent: { students?: Student[] }) =>
              parent.students?.map((student) => ({
                ...student,
                parents: response.data.data.parents.filter((p: any) =>
                  p.students?.some((s: any) => s.studentId === student.studentId)
                ),
              })) || []
          );
          setStudents(studentList);
        }
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeMenu]);

  const handleEdit = (id: string) => {
    alert(`แก้ไขข้อมูล ID: ${id}`);
  };

  const handleShowDetails = (parents: ParentInfo[]) => {
    if (parents.length > 0) {
      alert(
        parents
          .map(
            (parent) =>
              `ชื่อ: ${parent.firstName} ${parent.lastName}\nอีเมล: ${parent.email}\nเบอร์โทร: ${parent.phoneNumber}`
          )
          .join("\n\n")
      );
    } else {
      alert("ไม่มีข้อมูลผู้ปกครอง");
    }
  };

  const teacherColumns = [
    { key: "teacherId", label: "รหัส", header: "รหัส" },
    { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
    { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
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
    { key: "classLevel", label: "ชั้น", header: "ชั้น" },
    { key: "emailStudent", label: "อีเมล", header: "อีเมล" },
    { key: "phoneNumber", label: "เบอร์โทร", header: "เบอร์โทร" },
    { key: "details", label: "ข้อมูลเพิ่มเติม", header: "ข้อมูลเพิ่มเติม" },
    { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
  ];

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
          <button className="bg-system-error-2 rounded-sm w-32 text-system-white">ถังขยะ</button>
          <button className="bg-system-success-2 rounded-sm w-32 text-system-white">เพิ่มผู้ใช้</button>
        </div>

        {activeMenu === "รายชื่อครู" && (
          <Table 
            data={teachers} 
            columns={teacherColumns} 
            renderRow={(teacher) => [
              teacher.teacherId,
              teacher.firstName,
              teacher.lastName,
              teacher.position,
              `${teacher.class?.level ? `ป. ${teacher.class.level}` : "-"} ${teacher.class?.room ?`/ ${teacher.class.room}` : ""}`,
              teacher.email,
              teacher.phoneNumber,
              <div className="flex justify-center">
                <button className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" onClick={() => handleEdit(teacher.teacherId)}>
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
            data={students} 
            columns={studentColumns} 
            renderRow={(student) => [
              student.studentId,
              student.firstName,
              student.lastName,
              `ป.${student.classLevel}/${student.classRoom}`,
              student.emailStudent,
              student.phoneNumber,
              <button className=" text-system-button underline" onClick={() => handleShowDetails(student.parents || [])}>
                รายละเอียด
              </button>,
              <div className="flex justify-center">
              <button className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2" onClick={() => handleEdit(student.studentId)}>
                <EditIcon className="h-6 w-6" />
                <span>แก้ไข</span>
              </button>
            </div>,
            ]}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;


