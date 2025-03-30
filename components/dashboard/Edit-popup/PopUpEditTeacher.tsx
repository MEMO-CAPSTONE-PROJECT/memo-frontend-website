import { useState, useEffect } from "react";
import apiClient from "@/components/axios/axiosConfig";
import { z, type ZodFormattedError } from "zod";

import { MEMO_API } from "@/constants/apis";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import MemoButton from '@/components/button/memo-button'
import MemoPopUp from '@/components/container/memo-popup-time';

import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { FaSpinner } from "react-icons/fa";


const teacherSchema = z
  .object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    position: z.string().min(1, "เลือกตำแหน่งของคุณ"),
    gender: z.enum(["ชาย", "หญิง"], { errorMap: () => ({ message: "กรุณาเลือกเพศ" }) }),
    class: z
      .object({
        level: z.string().min(1, "กรุณากรอกชั้นเรียน"),
        room: z.string().min(1, "กรุณากรอกห้องเรียน"),
      })
,
    email: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
      .min(1, "กรุณากรอกอีเมลของคุณครู"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
  })
  .refine(
    (data) => {
      if (data.position === "ครูประจำชั้น") {
        return !!data.class?.level && !!data.class?.room;
      }
      return true;
    },
    {
      message: "กรุณากรอกข้อมูลชั้นเรียนและห้องเรียน",
      path: ["class"],
    }
  );

  const DisciplinaryTeacherSchema = z
  .object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    position: z.string().min(1, "เลือกตำแหน่งของคุณ"),
    gender: z.enum(["ชาย", "หญิง"], { errorMap: () => ({ message: "กรุณาเลือกเพศ" }) }),
    email: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
      .min(1, "กรุณากรอกอีเมลของคุณครู"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
  })

  interface PopUpEditTeacherListProps {
    isOpen: boolean;
    onClose: () => void;
    onEditSuccess: () => void;
    teacherId: string; // Added teacherId prop for editing
    initialData: {
      firstName: string;
      lastName: string;
      position: string;
      gender: string;
      class: { level: string; room: string };
      email: string;
      phoneNumber: string;
    };
  }
  

const PopUpEditTeacherList: React.FC<PopUpEditTeacherListProps> = ({
  isOpen,
  onClose,
  onEditSuccess,
  teacherId,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<ZodFormattedError<z.infer<typeof teacherSchema>, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors(null); // Reset ค่า errors เป็น null เมื่อ Popup เปิด
    }
    setFormData(initialData);
  }, [isOpen, initialData]);
  

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updatedData = name === "classLevel"
        ? { ...prev, class: { ...(prev.class || {}), level: value } }
        : name === "classRoom"
        ? { ...prev, class: { ...(prev.class || {}), room: value } }
        : { ...prev, [name]: value };
  
      console.log("Updated formData:", updatedData); // เช็คค่า
      return updatedData;
    });
  
    setErrors((prev) => (prev ? { ...prev, [name]: undefined } : null));
  };
  
  
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // เลือก Schema ตามตำแหน่งของครู
    const schemaToUse = formData.position === "ครูฝ่ายปกครอง" ? DisciplinaryTeacherSchema : teacherSchema;
    const result = schemaToUse.safeParse(formData);
  
    if (!result.success) {
      setErrors(result.error.format());
      
      return;
    }
  
    setLoading(true);
    setIsSuccess(false);
  
    // ฟังก์ชันแยกเพื่อกรองข้อมูลก่อนส่ง
    const getFilteredFormData = (data: typeof formData) => {
      if (data.position === "ครูประจำชั้น") return data;
      const { class: _, ...rest } = data;
      return rest;
    };
    const filteredFormData = getFilteredFormData(formData);
    console.log(filteredFormData)
    try {
      await apiClient.put(`${MEMO_API.teacherEdit}/${teacherId}`, filteredFormData);
      console.log(filteredFormData)
      setError(null);
      onEditSuccess();
      setIsSuccess(true);
  
      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
      }, 3000);
    } catch (error: any) {
      setLoading(false);
  
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("ข้อมูลซ้ำกับข้อมูลเดิม กรุณาแก้ไขข้อมูลใหม่");
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
      <div className="bg-system-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-lg md:max-w-2xl relative">
        <h2 className="font-bold mb-4 text-[18px] text-left">แก้ไขรายชื่อคุณครู</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-wrap gap-4">
            {/* Similar form inputs as in PopUpAddTeacherList, with pre-filled data */}
            <div className="w-full md:w-[48%]">
              <MemoInputHeader
                text="ชื่อ"
                type="text"
                name="firstName"
                placeholder="กรุณาพิมพ์ชื่อของคุณครู"
                error={errors?.firstName?._errors[0]}
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-[48%]">
              <MemoInputHeader
                text="นามสกุล"
                type="text"
                name="lastName"
                placeholder="กรุณาพิมพ์นามสกุลของคุณครู"
                error={errors?.lastName?._errors[0]}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-[48%]">
              <MemoSelectHeader
                label="ตำแหน่ง"
                name="position"
                options={["ครูประจำชั้น", "ครูฝ่ายปกครอง"]}
                error={errors?.position?._errors[0]}
                value={formData.position}
                onChange={handleChange}
                placeholder="เลือกตำแหน่ง"
              />
            </div>
            <div className="w-full md:w-[48%]">
              <MemoSelectHeader
                label="เพศ"
                options={["หญิง", "ชาย"]}
                name="gender"
                placeholder="กรุณาเลือกเพศของคุณ"
                value={formData.gender}
                error={errors?.gender?._errors[0]}
                size="full"
                onChange={handleChange}
              />
            </div>
            {formData.position === "ครูประจำชั้น" && (
              <>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ระดับชั้น"
                    type="text"
                    name="classLevel"
                    placeholder="กรุณาพิมพ์ระดับชั้นของคุณครู"
                    error={errors?.class?.level?._errors[0]}
                    value={formData.class.level}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ห้องเรียน"
                    type="text"
                    name="classRoom"
                    placeholder="กรุณาพิมพ์ห้องเรียนของคุณครู"
                    error={errors?.class?.room?._errors[0]}
                    value={formData.class.room}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="w-full">
              <MemoInputHeader
                text="อีเมล"
                type="email"
                name="email"
                placeholder="กรุณาพิมพ์อีเมลของคุณครู"
                error={errors?.email?._errors[0]}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <MemoInputHeader
                text="เบอร์โทรศัพท์"
                type="text"
                name="phoneNumber"
                placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ของคุณครู"
                error={errors?.phoneNumber?._errors[0]}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-system-error">{error}</p>}

          <div className="flex space-x-4 pt-2 ">
            <MemoButton title="ยกเลิก" variant="ghost" onClick={handleClose} />
            <MemoButton title="บันทึก" variant="primary" disabled={loading} type="submit" />
          </div>

          {(loading || isSuccess) && (
            <MemoPopUp show={loading || isSuccess} onClose={handleClose} redirectUrl="/">
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
                  <h2 className="text-title font-bold text-center">กำลังแก้ไข...</h2>
                </>
              ) : (
                <>
                  <SuccessIcon className="w-24 h-24 mx-auto mb-4 " />
                  <h2 className="text-title font-bold text-center">แก้ไขรายชื่อคุณครูสำเร็จ</h2>
                </>
              )}
            </MemoPopUp>
          )}
        </form>
      </div>
    </div>
  );
};

export default PopUpEditTeacherList;
