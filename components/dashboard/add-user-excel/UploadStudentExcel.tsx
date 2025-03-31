import React, { useState, useEffect } from "react";
import apiClient from "@/components/axios/axiosConfig";
import { MEMO_API } from "@/constants/apis";
import MemoButton from "@/components/button/memo-button";
import ExcelLogo from "@/components/ui/icons/dashboard/microsoft-excel-logo";
import UploadIcon from "@/components/ui/icons/dashboard/upload";
import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";

interface UploadStudentExcelProps {
  onClose: () => void;
}

const UploadStudentExcel: React.FC<UploadStudentExcelProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.name.match(/\.(xls|xlsx)$/)) {
        setErrorMessage("กรุณาเลือกไฟล์ Excel (.xls หรือ .xlsx) เท่านั้น");
        console.log(uploadProgress);
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2) + " MB");
      setUploadProgress(0);
      setErrorMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("กรุณาเลือกไฟล์ก่อนอัปโหลด");
      return;
    }
    setIsUploading(true);
    setUploadProgress(10);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post(
        MEMO_API.studentAddExcel,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );
      if (response.data.status === 200) {
        setShowSuccessPopup(true);
      } else {
        setErrorMessage(response.data.message || "เกิดข้อผิดพลาดในการอัปโหลด");
      }
    } catch (error) {
      setErrorMessage(
        "อัปโหลดล้มเหลวเนื่องจากโครงสร้างไม่ถูกต้อง กรุณาลองใหม่"
      );
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-40">
      {!showSuccessPopup ? (
        <div className="bg-system-white p-6 rounded-md shadow-2xl w-96">
          <h2 className="text-2xl font-semibold text-title-1 mb-4">
            อัปโหลดไฟล์ Excel นักเรียน
          </h2>
          <div className="border border-dashed flex flex-col items-center mb-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <div className="w-full border-x-sm border-y-sm mb-4 border-dashed border-x-primary-2 border-y-primary-2 rounded-sm flex flex-col items-center hover:bg-system-light-purple p-12">
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-primary-2 underline flex flex-col items-center gap-2"
              >
                <UploadIcon className="w-10 h-10" />
                คลิกเพื่อเลือกไฟล์
              </label>
            </div>

            {fileName && (
              <div className="mt-2 flex items-center justify-between border border-title-1 rounded-sm p-2 w-full bg-system-light-gray">
                <div className="flex items-center gap-2">
                  <ExcelLogo className="w-10 h-10 " />
                  <div>
                    <p className="text-sm text-title-1">{fileName}</p>
                    <p className="text-sm text-body-2">{fileSize}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-system-error-2 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="flex gap-3 mt-4">
            <MemoButton title="ยกเลิก" variant="ghost" onClick={onClose} />
            <MemoButton
              title="อัปโหลด"
              variant={!file || isUploading ? "disable" : "primary"}
              onClick={handleUpload}
              disabled={!file || isUploading}
            >
              {isUploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
            </MemoButton>
          </div>
        </div>
      ) : (
        <div className="bg-system-white p-6 rounded-md shadow-2xl w-96 text-center">
          <SuccessIcon className="w-24 h-24 mx-auto mb-4 " />
          <h2 className="text-title font-bold text-center">
            เพิ่มรายชื่อนักเรียนสำเร็จ
          </h2>
        </div>
      )}
    </div>
  );
};

export default UploadStudentExcel;
