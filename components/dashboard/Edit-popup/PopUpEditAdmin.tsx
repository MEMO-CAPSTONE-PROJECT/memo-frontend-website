import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import apiClient from "@/components/axios/axiosConfig";
import MemoButton from "@/components/button/memo-button";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoPopUp from "@/components/container/memo-popup-time";
import { MEMO_API } from "@/constants/apis";
import { z } from "zod";
import axios from "axios";

interface AdminData {
  teacherId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PopUpEditAdminListProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  adminData: AdminData | null;
}

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  userName: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้งาน" }),
  email: z
  .string()
  .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
  .min(1, "กรุณากรอกอีเมล"),
password: z
  .string()
  .min(8, "รหัสผ่านต้องมีจำนวนอย่างน้อย 8 ตัว")
  .max(20, "รหัสผ่านมีจำนวนมากสุดได้ 20 ตัว")
  .regex(/[A-Z]/, "รหัสผ่านต้องประกอบไปด้วยตัวพิมพ์ใหญ่")
  .regex(/[a-z]/, "รหัสผ่านต้องประกอบไปด้วยตัวพิมพ์เล็ก")
  .regex(/\d/, "รหัสผ่านต้องประกอบไปด้วยตัวเลข")
  .regex(/[@$!%*?&]/, "รหัสผ่านต้องมีอักขระพิเศษ (@, $, !, %, *, ?, &)"),
confirmPassword: z
.string()
.min(1, "กรุณากรอกยืนยันรหัสผ่าน"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

const PopUpEditAdminList: React.FC<PopUpEditAdminListProps> = ({
  isOpen,
  onClose,
  onEditSuccess,
  adminData,
}) => {
  const [formData, setFormData] = useState<AdminData>({
    teacherId: 0,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // เมื่อรับข้อมูล adminData มาให้เติมค่าใน form
  useEffect(() => {
    if (adminData) {
      setFormData({
        teacherId: adminData.teacherId,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        userName: adminData.userName,
        email: adminData.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [adminData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validation
      const result = validationSchema.safeParse(formData);
      if (!result.success) {
        setErrors(result.error.format());
        return;
      }

      setLoading(true);

      // Prepare data to send in the PUT request (exclude confirmPassword)
      const { confirmPassword, ...dataToUpdate } = formData;

      // เรียก API เพื่อแก้ไขข้อมูล
      await apiClient.put(`${MEMO_API.adminEdit}/${formData.teacherId}`, {
        ...dataToUpdate,
        role: "Teacher Staff",
      });

      onEditSuccess();
      onClose();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแก้ไข:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
        <div className="bg-system-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-lg md:max-w-2xl relative">
          <h2 className="font-bold mb-4 text-[18px] text-left">แก้ไขข้อมูล Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-wrap gap-4">
              {/* ชื่อ */}
              <div className="w-full md:w-[48%]">
                <MemoInputHeader
                  text="ชื่อ"
                  type="text"
                  name="firstName"
                  placeholder="กรุณาพิมพ์ชื่อของผู้ดูแลระบบ"
                  error={errors?.firstName?._errors[0]}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* นามสกุล */}
              <div className="w-full md:w-[48%]">
                <MemoInputHeader
                  text="นามสกุล"
                  type="text"
                  name="lastName"
                  placeholder="กรุณาพิมพ์นามสกุลของผู้ดูแลระบบ"
                  error={errors?.lastName?._errors[0]}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* ชื่อผู้ใช้งาน */}
              <div className="w-full">
                <MemoInputHeader
                  text="ชื่อผู้ใช้งาน"
                  type="text"
                  name="userName"
                  placeholder="กรุณาพิมพ์ชื่อผู้ใช้งาน"
                  error={errors?.userName?._errors[0]}
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              {/* อีเมล */}
              <div className="w-full">
                <MemoInputHeader
                  text="อีเมล"
                  type="email"
                  name="email"
                  placeholder="กรุณาพิมพ์อีเมลของผู้ดูแลระบบ"
                  error={errors?.email?._errors[0]}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* รหัสผ่าน */}
              <div className="w-full">
                <MemoInputHeader
                  text="รหัสผ่าน"
                  type="password"
                  name="password"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  error={errors?.password?._errors[0]}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* ยืนยันรหัสผ่าน */}
              <div className="w-full">
                <MemoInputHeader
                  text="ยืนยันรหัสผ่าน"
                  type="password"
                  name="confirmPassword"
                  placeholder="กรุณายืนยันรหัสผ่าน"
                  error={errors?.confirmPassword?._errors[0]}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-2">
              <MemoButton title="ยกเลิก" variant="ghost" onClick={onClose} />
              <MemoButton title="บันทึก" variant="primary" disabled={loading} type="submit" />
            </div>

            {loading && (
              <div className="flex justify-center pt-4">
                <FaSpinner className="animate-spin text-3xl text-system-primary" />
              </div>
            )}
          </form>
        </div>
      </div>
    )
  );
};

export default PopUpEditAdminList;
