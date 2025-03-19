import { useState } from "react";
import axios from "axios";
import { z } from "zod";

import { MEMO_API } from "@/constants/apis";
import MemoInputHeader from "@/components/input/header/memo-input-header"; 
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import MemoButton from '@/components/button/memo-button'
import MemoPopUp from '@/components/container/memo-popup-time';

import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { FaSpinner } from "react-icons/fa";

const studentSchema = z.object({
  firstName: z
  .string()
  .min(1, "กรุณากรอกชื่อนักเรียน"),
  lastName: z
  .string()
  .min(1, "กรุณากรอกนามสกุลนักเรียน"),
  classRoom: z
  .string()
  .regex(/^\d+$/, "ห้องเรียนของนักเรียนต้องเป็นตัวเลข")
  .min(1, "กรุณากรอกห้องเรียนของนักเรียน"),
  classLevel: z
  .string()
  .regex(/^\d+$/, "ชั้นเรียนของนักเรียนต้องเป็นตัวเลข")
  .min(1, "กรุณากรอกชั้นเรียนของนักเรียน"),
  displayName: z
  .string()
  .min(1, "กรุณากรอกชื่อนักเรียนที่แสดงในระบบ"),
  gender: z
  .enum(["ชาย", "หญิง"], { errorMap: () => ({ message: "กรุณาเลือกเพศ" }) }),
  emailStudent: z
  .string()
  .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
  .min(1, "กรุณากรอกอีเมลของนักเรียน"),
  phoneNumber: z
  .string()
  .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
  .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
  .min(1, "กรุณากรอกเบอร์โทรศัพท์ของนักเรียน"),
  parentPhoneNumber: z
  .string()
  .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
  .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
  .min(1, "กรุณากรอกเบอร์โทรศัพท์ของนักเรียน"),
});

interface PopUpAddStudentListProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void; 
}

const PopUpAddStudentList: React.FC<PopUpAddStudentListProps> = ({ isOpen, onClose, onAddSuccess }) => {
  const initialFormData = {
    firstName: "",
    lastName: "",  
    classRoom: "",
    classLevel: "",    
    displayName: "",
    gender: "",  
    emailStudent: "",
    phoneNumber: "",
    parentPhoneNumber: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // ล้าง error เมื่อแก้ไข
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const result = studentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
  
    setLoading(true);  
    setIsSuccess(false); 
  
    try {
      const transformedData = {
        ...formData,
        gender: formData.gender === "ชาย" ? "male" : "female",
      };
  
      await axios.post(MEMO_API.studentAddForm, transformedData);
      
      setTimeout(() => { 
        setLoading(false); 
        setIsSuccess(true); 
      }, 1000);
  
      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
        onAddSuccess(); 
      }, 3000); 
  
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "อีเมล์หรือเบอร์นี้ถูกใช้งานแล้ว ลองใช้อีเมลอื่น");
        } else {
          setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
        setLoading(false);
      }
  };
  
  if (!isOpen) return null;
  return (
<div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
  <div className="bg-system-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl relative">
    <h2 className="font-bold mb-4 text-[18px] text-left">เพิ่มรายชื่อนักเรียน</h2>
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[48%]">
          <MemoInputHeader
            text="ชื่อ"
            type="text"
            name="firstName"
            placeholder="กรุณาพิมพ์ชื่อของนักเรียน"
            error={errors?.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <MemoInputHeader
            text="นามสกุล"
            type="text"
            name="lastName"
            placeholder="กรุณาพิมพ์นามสกุลของนักเรียน"
            error={errors?.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <MemoInputHeader
            text="ระดับชั้น"
            type="text"
            name="classLevel"
            placeholder="กรุณาพิมพ์ตำระดับชั้นของนักเรียน"
            error={errors?.classLevel}
            value={formData.classLevel}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <MemoInputHeader
            text="ห้องเรียน"
            type="text"
            name="classRoom"
            placeholder="กรุณาพิมพ์ห้องเรียนของนักเรียน"
            error={errors?.classRoom}
            value={formData.classRoom}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <MemoInputHeader
            text="ชื่อผู้ใช้"
            type="text"
            name="displayName"
            placeholder="กรุณาพิมพ์ชื่อผู้ใช้ของนักเรียน"
            error={errors?.displayName}
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-[48%]">
        <MemoSelectHeader
            label="เพศ"
            options={["หญิง", "ชาย"]}
            name="gender"
            placeholder="กรุณาเลือกเพศของคุณ"
            value={formData.gender}
            error={errors?.gender}
            size="full"
            onChange={handleChange} />
        </div>
        <div className="w-full">
          <MemoInputHeader
            text="อีเมล"
            type="email"
            name="emailStudent"
            placeholder="กรุณาพิมพ์อีเมลของนักเรียน"
            error={errors?.emailStudent}
            value={formData.emailStudent}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <MemoInputHeader
            text="เบอร์โทรศัพท์"
            type="text"
            name="phoneNumber"
            placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ของนักเรียน"
            error={errors?.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
        <MemoInputHeader
                  text="เบอร์โทรศัพท์ผู้ปกครอง"
                  type="text"
                  name="parentPhoneNumber"
                  placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ผู้ปกครองของนักเรียน"
                  error={errors?.parentPhoneNumber}
                  value={formData.parentPhoneNumber}
                  onChange={handleChange}
                />
        </div>
      </div>
      {error && <p className="text-system-error">{error}</p>}
      
      <div className="flex space-x-4 ">
        <MemoButton title="ยกเลิก" variant="ghost" onClick={handleClose} />
        <MemoButton title={loading ? "กำลังเพิ่ม..." : "เพิ่ม"} variant="primary" disabled={loading}   type="submit"/>
      </div>

      {(loading || isSuccess) && (
        <MemoPopUp show={loading || isSuccess} onClose={handleClose} redirectUrl="/">
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
              <h2 className="text-title font-bold text-center">กำลังเพิ่ม...</h2>
            </>
          ) : (
            <>
              <SuccessIcon className="w-24 h-24 mx-auto mb-4 " />
              <h2 className="text-title font-bold text-center">เพิ่มรายชื่อนักเรียนสำเร็จ</h2>
            </>
          )}
        </MemoPopUp>
      )}

    </form>
  </div>
</div>


  );
};

export default PopUpAddStudentList;
