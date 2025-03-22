
import React, { useState } from "react";
import axios from "axios";
import { MEMO_API } from "@/constants/apis";

import MemoButton from "@/components/button/memo-button";

interface UploadTeacherExcelProps {
  onSuccess: (message: string) => void;
  onError: (errorMessage: string) => void;
  onClose: () => void;
}

const UploadTeacherExcel: React.FC<UploadTeacherExcelProps> = ({ onSuccess, onError, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      onError("กรุณาเลือกไฟล์ก่อนอัปโหลด");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ ส่งเป็น form-data ตาม API กำหนด

      const response = await axios.post(MEMO_API.teacherAddExcel, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.status === 200) {
        onSuccess(response.data.message || "อัปโหลดสำเร็จ");
        onClose();
      } else {
        onError(response.data.message || "เกิดข้อผิดพลาดในการอัปโหลด");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      onError("อัปโหลดล้มเหลว กรุณาลองใหม่");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    //   <div className="bg-white p-5 rounded shadow-lg">
    //     <h2 className="text-xl font-bold mb-3">📂 อัปโหลดไฟล์ Excel คุณครู</h2>
    //     <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-3" />
    //     <div className="flex gap-2">
    //       <button
    //         onClick={handleUpload}
    //         disabled={!file || isUploading}
    //         className="px-4 py-2 bg-green-500 text-white rounded"
    //       >
    //         {isUploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
    //       </button>
    //       <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
    //         ❌ ปิด
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-40">
  <div className="bg-system-white p-6 rounded-md shadow-2xl w-96">
    <h2 className="text-2xl font-semibold text-title-1 flex items-center gap-2 mb-4">
      อัปโหลดไฟล์ Excel คุณครู
    </h2>
    <div className="border border-dashed rounded-md p-4 flex flex-col items-center mb-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
        id="fileUpload"
      />
      <label
        htmlFor="fileUpload"
        className="cursor-pointer text-gray-600 hover:text-blue-600"
      >
        คลิกเพื่อเลือกไฟล์
      </label>
    </div>
    <div className="flex gap-3">

      <MemoButton
                      title="ยกเลิก"
                      variant="ghost"
                      onClick={onClose}
                    />
                    <MemoButton
                      title="ยกเลิก"
                      className={`text-system-white${
                        !file || isUploading ? "bg-system-gray cursor-not-allowed" : "bg-primary-2 hover:bg-primary-2-hover"
                      }`}
                      onClick={handleUpload}
        disabled={!file || isUploading}
                    >{isUploading ? "กำลังอัปโหลด..." : "อัปโหลด"}</MemoButton>
      

    </div>
  </div>
</div>

  );
};

export default UploadTeacherExcel;

