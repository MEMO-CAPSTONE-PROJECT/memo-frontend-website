"use client";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import apiClient from "@/components/axios/axiosConfig";
import MemoButton from "@/components/button/memo-button";
import MemoPopUp from "@/components/container/memo-popup-notime"; // เพิ่ม Import สำหรับ MemoPopUp
import PopUpAddAdminList from "@/components/dashboard/add-user/PopUpAddAdminList";
import PopUpEditAdminList from "@/components/dashboard/Edit-popup/PopUpEditAdmin";
import Searchbar from "@/components/dashboard/searchbar";
import Sidebar from "@/components/dashboard/sidebar";
import Table from "@/components/dashboard/table";
import EditIcon from "@/components/ui/icons/dashboard/edit-icon";
import TrashIcon from "@/components/ui/icons/dashboard/trash-icon";
import { MEMO_API } from "@/constants/apis";
import { useEffect, useState } from "react";

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
  const [isAdminEditPopupOpen, setIsAdminEditPopupOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null);
  const [searchText, setSearchText] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [deletingMode, setDeletingMode] = useState(false);
  const openAdminAddPopup = () => setIsAdminAddPopupOpen(true);
  const closeAdminAddPopup = () => setIsAdminAddPopupOpen(false);
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setErrorGet(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData to load data initially
  }, []); // Empty dependency array to call on mount

  const columns = [
    ...(deletingMode ? [{ key: "select", header: "เลือก" }] : []),
    { header: "รหัสครู", key: "teacherId" },
    { header: "ชื่อ", key: "firstName" },
    { header: "นามสกุล", key: "lastName" },
    { header: "ชื่อผู้ใช้", key: "username" },
    { header: "อีเมล", key: "email" },
    { header: "แอ็คชั่น", key: "action" },
  ];

  const renderRow = (item: AdminTable): (JSX.Element | string | number)[] => [
    ...(deletingMode
      ? [
          <input
            key={`checkbox-${item.teacherId}`}
            type="checkbox"
            checked={selectedAdmins.includes(item.teacherId)}
            onChange={() => handleSelectAdmin(item.teacherId)}
          />,
        ]
      : []),
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

  const handleEditAdmin = (item: AdminTable) => {
    const adminData: AdminData = {
      teacherId: item.teacherId,
      firstName: item.firstName,
      lastName: item.lastName,
      userName: item.username,
      email: item.email,
      password: "",
      confirmPassword: "",
    };

    setSelectedAdmin(adminData);
    setIsAdminEditPopupOpen(true);
  };

  const handleSelectAdmin = (id: number) => {
    setSelectedAdmins((prev) =>
      prev.includes(id)
        ? prev.filter((adminId) => adminId !== id)
        : [...prev, id]
    );
  };

  const handleToggleDeleteMode = () => {
    setDeletingMode(!deletingMode);
    setSelectedAdmins([]);
  };

  const handleDeleteSelected = async () => {
    if (selectedAdmins.length === 0) return;
    setShowPopupDelete(true);
    console.log(searchText);
  };

  const handleConfirmDelete = async () => {
    if (selectedAdmins.length === 0) return;

    try {
      const idsToDelete = selectedAdmins.map((id) => id.toString());
      await apiClient.delete(MEMO_API.adminDeleteList, {
        data: { ids: idsToDelete },
      });
      fetchData();
      setShowPopupDelete(false);
      setSelectedAdmins([]);
    } catch (error) {
      console.error("Error deleting:", error);
      setShowPopupDelete(false);
    }
  };
  const handleAddAdminSuccess = () => {
    console.log("Admin Added Successfully!");
    fetchData();
  };
  const handleEditSuccess = () => {
    console.log("Admin Edited Successfully!");
    fetchData();
    setIsAdminEditPopupOpen(false);
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
          <div className="relative flex pt-6 w-full items-center">
            <div className="flex-1 pr-4">
              <Searchbar onSearch={setSearchText} />
            </div>
            <div className="flex space-x-2">
              {deletingMode ? (
                <button
                  className="w-36 bg-system-error-2 text-system-white hover:bg-system-error-2-hover rounded-sm px-4 py-2"
                  onClick={handleDeleteSelected}
                  disabled={selectedAdmins.length === 0}
                >
                  ลบจำนวน {selectedAdmins.length}
                </button>
              ) : (
                <button
                  className="w-36 bg-system-error-2 text-system-white hover:bg-system-error-2-hover rounded-sm px-4 py-2"
                  onClick={handleToggleDeleteMode}
                >
                  ถังขยะ
                </button>
              )}
              {deletingMode && (
                <button
                  className="w-36 bg-body-2 text-system-white rounded-sm px-4 py-2"
                  onClick={handleToggleDeleteMode}
                >
                  ยกเลิก
                </button>
              )}

              {/* ซ่อนปุ่มเพิ่มผู้ดูแลระบบเมื่ออยู่ในโหมดลบ */}
              {!deletingMode && (
                <button
                  className="w-36 bg-system-success-2 text-system-white hover:bg-system-success-2-hover rounded-sm px-4 py-2"
                  onClick={openAdminAddPopup}
                >
                  เพิ่มผู้ดูแลระบบ
                </button>
              )}
            </div>
          </div>

          {/* Confirm Delete Popup */}
          {showPopupDelete && (
            <MemoPopUp
              show={showPopupDelete}
              onClose={() => setShowPopupDelete(false)}
            >
              <TrashIcon className="w-44 h-44 p-6 mr-2 bg-system-error-2 mb-6 rounded-full mt-6" />
              <p className="text-center text-[18px] font-bold">
                ต้องการลบผู้ดูแลระบบที่เลือกหรือไม่?
              </p>
              <div className="flex justify-between mt-6 w-full space-x-2 pl-4 pr-4 mb-2">
                <MemoButton
                  title="ยกเลิก"
                  variant="cancleghost"
                  onClick={() => setShowPopupDelete(false)}
                />
                <MemoButton
                  title="ยืนยัน"
                  variant="cancle"
                  onClick={handleConfirmDelete}
                />
              </div>
            </MemoPopUp>
          )}

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
            onEditSuccess={handleEditSuccess} // Pass the success callback
            adminData={selectedAdmin}
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
