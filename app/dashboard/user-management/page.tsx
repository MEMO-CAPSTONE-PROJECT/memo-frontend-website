"use client";
import { useEffect, useState } from "react";

import AuthGuard from "@/components/AuthGuard/AuthGuard";
import apiClient from "@/components/axios/axiosConfig";
import MemoButton from "@/components/button/memo-button";
import TopbarButton from "@/components/button/memo-topbar";
import MemoPopUp from "@/components/container/memo-popup-notime";
import UploadStudentExcel from "@/components/dashboard/add-user-excel/UploadStudentExcel";
import UploadTeacherExcel from "@/components/dashboard/add-user-excel/UploadTeacherExcel";
import PopUpAddStudentList from "@/components/dashboard/add-user/PopUpAddStudentList";
import PopUpAddTeacherList from "@/components/dashboard/add-user/PopUpAddTeacherList";
import PopUpEditStudent from "@/components/dashboard/Edit-popup/PopUpEditStudent";
import PopUpEditTeacher from "@/components/dashboard/Edit-popup/PopUpEditTeacher";
import Filterbutton from "@/components/dashboard/filterbutton";
import Searchbar from "@/components/dashboard/searchbar";
import Sidebar from "@/components/dashboard/sidebar";
import Table from "@/components/dashboard/table";
import { MEMO_API } from "@/constants/apis";

import CaretLefttIcon from "@/components/ui/icons/dashboard/caret-left";
import CaretRightIcon from "@/components/ui/icons/dashboard/caret-right";
import EditIcon from "@/components/ui/icons/dashboard/edit-icon";
import TrashIcon from "@/components/ui/icons/dashboard/trash-icon";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

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
  studentId: string;
  firstName: string;
  lastName: string;
  classLevel: number;
  classRoom: number;
  gender: string;
  startDate: Date;
  displayName: string;
  phoneNumber: string;
  email: string;
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
  { value: "email", label: "อีเมล" },
  { value: "phoneNumber", label: "เบอร์โทร" },
];

export default function UserManagement() {
  const [activeMenu, setActiveMenu] = useState<string>("รายชื่อครู");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParents, setSelectedParents] = useState<ParentInfo[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setshowPopupDelete] = useState(false);
  const rowsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchType, setSearchType] = useState("ทั้งหมด");
  const [searchText, setSearchText] = useState("");

  const filterOptions =
    activeMenu === "รายชื่อครู" ? teacherFilterOptions : studentFilterOptions;

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
        console.log(response.data.data);
        const studentList =
          response.data.data.students?.map((student) => ({
            ...student,
            startDate: new Date(student.startDate),
          })) || [];

        setStudents(studentList);
      }
    } catch (err) {
      console.log(err);
      setError("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
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
              ...Object.entries(teacher).filter(([key]) => key !== "startDate"),
              ["classRoom", teacher.class?.room],
              ["classLevel", teacher.class?.level],
            ].some(([value]) =>
              String(value ?? "")
                .toLowerCase()
                .includes(searchLower)
            );
          }
          if (searchType === "classRoom") {
            return String(teacher.class?.room ?? "")
              .toLowerCase()
              .includes(searchLower);
          }
          if (searchType === "classLevel") {
            return String(teacher.class?.level ?? "")
              .toLowerCase()
              .includes(searchLower);
          }
          return String(teacher[searchType as keyof Teacher] ?? "")
            .toLowerCase()
            .includes(searchLower);
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
              .some(([value]) =>
                String(value ?? "")
                  .toLowerCase()
                  .includes(searchLower)
              );
          }
          return String(student[searchType as keyof Student] ?? "")
            .toLowerCase()
            .includes(searchLower);
        });
      }
      setFilteredStudents(filtered);
    }
  }, [searchText, searchType, activeMenu, teachers, students]);

  const totalPages = Math.ceil(
    (activeMenu === "รายชื่อครู" ? teachers.length : students.length) /
      rowsPerPage
  );
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginateData = <T,>(data: T[]): T[] => {
    if (!Array.isArray(data)) {
      console.error("paginateData: data is not an array!", data);
      return [];
    }
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  };

  const handleShowDetails = (parents: ParentInfo[]) => {
    setSelectedParents(parents);
    setShowPopup(true);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletingMode, setDeletingMode] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const handleToggleDeleteMode = () => {
    setDeletingMode(!deletingMode);

    if (activeMenu === "รายชื่อครู") {
      setSelectedTeachers([]);
    } else if (activeMenu === "รายชื่อนักเรียน") {
      setSelectedStudents([]);
    }
  };

  const handleSelectTeacher = (teacherId: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleDeleteSelected = async () => {
    setshowPopupDelete(true);

    if (activeMenu === "รายชื่อครู" && selectedTeachers.length === 0) return;
    if (activeMenu === "รายชื่อนักเรียน" && selectedStudents.length === 0)
      return;

    try {
      let apiUrl = "";
      let selectedIds: string[] = [];

      if (activeMenu === "รายชื่อครู") {
        selectedIds = selectedTeachers;
        apiUrl = MEMO_API.teacherDelete;
      } else if (activeMenu === "รายชื่อนักเรียน") {
        selectedIds = selectedStudents;
        apiUrl = MEMO_API.studentDelete;
      }
      const payload = JSON.stringify({ ids: selectedIds.map(String) });
      console.log("Payload ที่ส่งไปยัง API:", payload);
      console.log("Deleting:", selectedIds);
      console.log("API URL:", apiUrl);

      const response = await apiClient.delete(apiUrl, {
        headers: { "Content-Type": "application/json" },
        data: payload,
      });

      if (response.status === 200) {
        console.log("ลบสำเร็จ:", selectedIds);
        handleCancelDelete();
        setDeletingMode(false);

        if (activeMenu === "รายชื่อครู") {
          setTeachers((prev) =>
            prev.filter((teacher) => !selectedIds.includes(teacher.teacherId))
          );
          setSelectedTeachers([]);
        } else if (activeMenu === "รายชื่อนักเรียน") {
          setStudents((prev) =>
            prev.filter((student) => !selectedIds.includes(student.studentId))
          );
          setSelectedStudents([]);
        }
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบ:", error);
    }
  };

  const handleDeleteConfirm = () => {
    setshowPopupDelete(false);
    handleDeleteSelected();
  };

  const handleCancelDelete = () => {
    setSelectedTeachers([]);
    setshowPopupDelete(false);
    setDeletingMode(false);
  };

  const teacherColumns = [
    ...(deletingMode ? [{ key: "select", label: "", header: "เลือก" }] : []),
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
    ...(deletingMode ? [{ key: "select", label: "", header: "เลือก" }] : []),
    { key: "studentId", label: "รหัส", header: "รหัส" },
    { key: "firstName", label: "ชื่อ", header: "ชื่อ" },
    { key: "lastName", label: "นามสกุล", header: "นามสกุล" },
    { key: "gender", label: "เพศ", header: "เพศ" },
    { key: "classLevel", label: "ชั้น", header: "ชั้น" },
    { key: "displayName", label: "ชื่อผู้ใช้", header: "ชื่อผู้ใช้" },
    { key: "email", label: "อีเมล", header: "อีเมล" },
    { key: "phoneNumber", label: "เบอร์โทร", header: "เบอร์โทร" },
    { key: "details", label: "ข้อมูลเพิ่มเติม", header: "ข้อมูลเพิ่มเติม" },
    { key: "action", label: "แอคชั่น", header: "แอคชั่น" },
  ];

  const [isOpenPopUpExcel, setIsOpenPopUpExcel] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );
  const [isPopupEditeTeacherOpen, setIsPopupEditeTeacherOpen] = useState(false);
  const [isPopUpEditStudentOpen, setIsPopUpEditStudentOpen] = useState(false); // Updated state name
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [studentData, setStudentData] = useState<any>(null);

  const handleEditTeacher = (id: string) => {
    setSelectedTeacherId(id); // Set the teacher ID for the popup
    setIsPopupEditeTeacherOpen(true); // Open the popup
  };
  const handleEditStudent = (studentId: string) => {
    console.log("Selected Student ID: ", studentId);
    console.log("Students List: ", students);

    const studentToEdit = students.find(
      (student) => String(student.studentId) === String(studentId)
    );

    console.log("Found Student: ", studentToEdit);

    if (studentToEdit) {
      setSelectedStudentId(studentId);
      setStudentData(studentToEdit);
      setIsPopUpEditStudentOpen(true);
    } else {
      console.error("Student not found!");
    }
  };

  const handleCloseEditStudentPopUp = () => {
    setIsPopUpEditStudentOpen(false); // Close the pop-up
    setSelectedStudentId(null);
    setStudentData(null); // Clear student data
  };

  return (
    <AuthGuard>
      <div className="flex bg-system-white w-full">
        <Sidebar />
        {/* <div className="ml-4 pt-6 p-6 text-title-1 w-fit bg-system-white"> */}
        <div className="flex-1 p-8 text-title-1 w-full bg-system-white">
          <div className="flex ">
            <TopbarButton
              name="รายชื่อครู"
              isActive={activeMenu === "รายชื่อครู"}
              onClick={() => {
                setActiveMenu("รายชื่อครู");
                setCurrentPage(1);
              }}
            />
            <TopbarButton
              name="รายชื่อนักเรียน"
              isActive={activeMenu === "รายชื่อนักเรียน"}
              onClick={() => {
                setActiveMenu("รายชื่อนักเรียน");
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="pt-8">
            <p className="text-[20px] font-semibold">
              ระบบจัดการรายชื่อ
              {activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
            </p>
            <p className="text-[16px] text-body-2">
              รายชื่อ{activeMenu === "รายชื่อครู" ? "คุณครู" : "นักเรียน"}
              ที่ใช้งานระบบ Memo
            </p>
          </div>

          <div className="relative flex pt-6 w-full space-x-2">
            <div className="relative w-full flex">
              <Searchbar onSearch={setSearchText} />
              <Filterbutton
                options={filterOptions}
                selectedFilter={searchType}
                onChange={setSearchType}
              />
            </div>

            <button
              className={`bg-system-error-2 rounded-sm w-32 text-system-white ${
                deletingMode &&
                (activeMenu === "รายชื่อครู"
                  ? selectedTeachers.length === 0
                  : selectedStudents.length === 0)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={
                deletingMode
                  ? () => setshowPopupDelete(true)
                  : handleToggleDeleteMode
              }
              disabled={
                deletingMode &&
                (activeMenu === "รายชื่อครู"
                  ? selectedTeachers.length === 0
                  : selectedStudents.length === 0)
              }
            >
              {deletingMode
                ? `ลบจำนวน ${
                    activeMenu === "รายชื่อครู"
                      ? selectedTeachers.length
                      : selectedStudents.length
                  }`
                : "ถังขยะ"}
            </button>

            {deletingMode && (
              <button
                className="bg-body-2 rounded-sm w-32 text-system-white "
                onClick={handleToggleDeleteMode}
              >
                ยกเลิก
              </button>
            )}

            <div
              className="relative inline-block"
              onMouseLeave={() => setIsOpen(false)} // ปิดเมนูเมื่อเอาเมาส์ออก
            >
              {!deletingMode && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex flex-row justify-center items-center gap-x-sm bg-system-success-2 rounded-sm w-32 text-system-white h-full"
                >
                  เพิ่มผู้ใช้ <CaretDown weight="bold" size={20} />
                </button>
              )}

              {isOpen && (
                <div className="absolute right-0 w-48 bg-system-white border border-2 border-xsm border-system-gray rounded-sm overflow-hidden">
                  <button
                    onClick={() => {
                      setIsPopupOpen(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-body-2"
                  >
                    เพิ่มผู้ใช้จาก Form
                  </button>
                  <button
                    onClick={() => setIsOpenPopUpExcel(true)}
                    className="block w-full text-left px-4 py-2 hover:bg-body-2"
                  >
                    เพิ่มผู้ใช้จาก Excel
                  </button>
                </div>
              )}
            </div>
          </div>

          {activeMenu === "รายชื่อครู" && (
            <Table
              data={paginateData(filteredTeachers)}
              columns={teacherColumns}
              renderRow={(teacher) => [
                ...(deletingMode
                  ? [
                      <input
                        key={`checkbox-${teacher.teacherId}`}
                        type="checkbox"
                        checked={selectedTeachers.includes(teacher.teacherId)}
                        onChange={() => handleSelectTeacher(teacher.teacherId)}
                      />,
                    ]
                  : []),

                <span key={`id-${teacher.teacherId}`}>
                  {teacher.teacherId}
                </span>,
                <span key={`fname-${teacher.teacherId}`}>
                  {teacher.firstName}
                </span>,
                <span key={`lname-${teacher.teacherId}`}>
                  {teacher.lastName}
                </span>,
                <span key={`gender-${teacher.teacherId}`}>
                  {teacher.gender}
                </span>,
                <span key={`position-${teacher.teacherId}`}>
                  {teacher.position}
                </span>,
                <span key={`class-${teacher.teacherId}`}>
                  {teacher.class?.level ? `ป. ${teacher.class.level}` : "-"}
                  {teacher.class?.room ? `/${teacher.class.room}` : ""}
                </span>,
                <span key={`email-${teacher.teacherId}`}>{teacher.email}</span>,
                <span key={`phone-${teacher.teacherId}`}>
                  {teacher.phoneNumber}
                </span>,
                <div
                  key={`action-${teacher.teacherId}`}
                  className="flex justify-center"
                >
                  <div
                    key={`action-${teacher.teacherId}`}
                    className="flex justify-center"
                  >
                    <button
                      className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2"
                      onClick={() => handleEditTeacher(teacher.teacherId)} // Trigger edit
                    >
                      <EditIcon className="h-6 w-6" />
                      <span>แก้ไข</span>
                    </button>
                  </div>
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
                ...(deletingMode
                  ? [
                      <input
                        key={`checkbox-${student.studentId}`}
                        type="checkbox"
                        checked={selectedStudents.includes(student.studentId)}
                        onChange={() => handleSelectStudent(student.studentId)}
                      />,
                    ]
                  : []),
                <span key={`${student.studentId}-id`}>
                  {student.studentId}
                </span>,
                <span key={`${student.studentId}-firstName`}>
                  {student.firstName}
                </span>,
                <span key={`${student.studentId}-lastName`}>
                  {student.lastName}
                </span>,
                <span key={`${student.studentId}-gender`}>
                  {student.gender}
                </span>,
                <span key={`${student.studentId}-class`}>
                  ป. {student.classLevel}/{student.classRoom}
                </span>,
                <span key={`${student.studentId}-gender`}>
                  {student.displayName}
                </span>,
                <span key={`${student.studentId}-email`}>{student.email}</span>,
                <span key={`${student.studentId}-phoneNumber`}>
                  {student.phoneNumber}
                </span>,
                <button
                  key={`${student.studentId}-details`}
                  className="text-system-button underline"
                  onClick={() => handleShowDetails(student.parents ?? [])}
                >
                  รายละเอียด
                </button>,
                <div
                  key={`${student.studentId}-actions`}
                  className="flex justify-center"
                >
                  <button
                    className="bg-system-button text-system-white px-2 py-2 rounded-sm flex items-center space-x-2"
                    onClick={() =>
                      handleEditStudent(student.studentId.toString())
                    }
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
              <div className="px-4 py-2 font-semibold text-primary-2 text-[16px] border-x-2xsm border-y-2xsm  border-system-gray">
                {currentPage} / {totalPages}
              </div>
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
                    <div key={parent.parentId} className="mb-2">
                      <p>
                        <span className="font-semibold ">ชื่อ : </span>{" "}
                        {parent.firstName} {parent.lastName}
                      </p>
                      <p>
                        <span className="font-semibold ">อีเมล : </span>{" "}
                        {parent.emailParent}
                      </p>
                      <p>
                        <span className="font-semibold ">เบอร์โทร : </span>{" "}
                        {parent.phoneNumber}
                      </p>
                      <p>
                        <span className="font-semibold ">ความสัมพันธ์ : </span>{" "}
                        {parent.relation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>ไม่มีข้อมูลผู้ปกครอง</p>
                )}{" "}
                <MemoButton
                  title="ย้อนกลับ"
                  onClick={() => setShowPopup(false)}
                />
              </div>
            </MemoPopUp>
          )}

          {showPopupDelete && (
            <MemoPopUp
              show={showPopupDelete}
              onClose={() => setshowPopupDelete(false)}
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

          {activeMenu === "รายชื่อครู" ? (
            <PopUpAddTeacherList
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onAddSuccess={() => fetchData()}
            />
          ) : (
            <PopUpAddStudentList
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onAddSuccess={() => fetchData()}
            />
          )}

          {isOpenPopUpExcel &&
            (activeMenu === "รายชื่อครู" ? (
              <UploadTeacherExcel
                onClose={() => {
                  setIsOpenPopUpExcel(false);
                  fetchData();
                }}
              />
            ) : (
              <UploadStudentExcel
                onClose={() => {
                  setIsOpenPopUpExcel(false);
                  fetchData();
                }}
              />
            ))}

          {isPopupEditeTeacherOpen && selectedTeacherId && (
            <PopUpEditTeacher
              isOpen={isPopupEditeTeacherOpen}
              teacherId={selectedTeacherId}
              initialData={(() => {
                const teacher = teachers.find(
                  (t) => t.teacherId === selectedTeacherId
                );
                if (teacher) {
                  return {
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    position: teacher.position,
                    gender: teacher.gender,
                    class: {
                      level: String(teacher.class?.level || ""),
                      room: String(teacher.class?.room || ""),
                    },
                    email: teacher.email || "",
                    phoneNumber: teacher.phoneNumber || "",
                  };
                } else {
                  return {
                    firstName: "",
                    lastName: "",
                    position: "",
                    gender: "",
                    class: {
                      level: "",
                      room: "",
                    },
                    email: "",
                    phoneNumber: "",
                  };
                }
              })()}
              onClose={() => setIsPopupEditeTeacherOpen(false)}
              onEditSuccess={() => {
                setIsPopupEditeTeacherOpen(false);
                fetchData();
              }}
            />
          )}

          {isPopUpEditStudentOpen && studentData && selectedStudentId && (
            <PopUpEditStudent
              isOpen={isPopUpEditStudentOpen}
              onClose={handleCloseEditStudentPopUp}
              onEditSuccess={handleCloseEditStudentPopUp}
              studentId={selectedStudentId}
              initialData={studentData}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
