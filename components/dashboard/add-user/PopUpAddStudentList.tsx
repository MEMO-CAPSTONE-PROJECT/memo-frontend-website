import apiClient from "@/components/axios/axiosConfig";
import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import MemoButton from "@/components/button/memo-button";
import MemoPopUp from "@/components/container/memo-popup-time";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { MEMO_API } from "@/constants/apis";
import { FaSpinner } from "react-icons/fa";

const studentSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อนักเรียน"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุลนักเรียน"),
  classRoom: z
    .string()
    .regex(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(1, "กรุณากรอกห้องเรียน"),
  classLevel: z
    .string()
    .regex(/^[4-6]$/, "ชั้นเรียนต้องเป็นตัวเลขจาก 4 ถึง 6")
    .min(1, "กรุณากรอกชั้นเรียน"),
  displayName: z.string().min(1, "กรุณากรอกชื่อนักเรียนที่แสดงในระบบ"),
  gender: z.enum(["ชาย", "หญิง"], {
    errorMap: () => ({ message: "กรุณาเลือกเพศ" }),
  }),
  emailStudent: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .min(1, "กรุณากรอกอีเมล"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "เบอร์โทรต้องเป็นตัวเลข")
    .regex(/^0\d{9}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง")
    .length(10, "เบอร์โทรต้องมี 10 หลัก"),
});

const parentRegisterSchema = z.object({
  parentPhoneNumber: z
    .string()
    .regex(/^\d+$/, "เบอร์โทรต้องเป็นตัวเลข")
    .regex(/^0\d{9}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง")
    .length(10, "เบอร์โทรต้องมี 10 หลัก"),
  emailParent: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  firstName: z.string().min(1, "กรุณากรอกชื่อผู้ปกครอง"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุลผู้ปกครอง"),
  relation: z.string().min(1, "กรุณาระบุความสัมพันธ์"),
});

interface PopUpAddStudentListProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const PopUpAddStudentList: React.FC<PopUpAddStudentListProps> = ({
  isOpen,
  onClose,
  onAddSuccess,
}) => {
  const [step, setStep] = useState(1);
  const initialFormData = useMemo(()=> ({
    firstName: "",
    lastName: "",
    classRoom: "",
    classLevel: "",
    displayName: "",
    gender: "",
    emailStudent: "",
    phoneNumber: "",
  }),[]);

  const initialParentData  = useMemo(()=> ({
    parentPhoneNumber: "",
    emailParent: "",
    firstName: "",
    lastName: "",
    relation: "",
  }),[]);
  const [studentErrors, setStudentErrors] = useState<Record<string, string>>({});
  const [parentErrors, setParentErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(initialFormData);
  const [parentData, setParentData] = useState(initialParentData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNextStep = () => {
    // Validate เฉพาะข้อมูลนักเรียนก่อนเปลี่ยนหน้า
    const studentResult = studentSchema.safeParse(formData);
    console.log(errors)
    
    if (!studentResult.success) {
      const newStudentErrors: Record<string, string> = {};
      studentResult.error.errors.forEach((err) => {
        if (err.path.length) newStudentErrors[err.path[0]] = err.message;
      });
      setStudentErrors(newStudentErrors);
      return; // ไม่เปลี่ยนหน้า ถ้าข้อมูลไม่ถูกต้อง
    }
  
    // รีเซต error ของ parent ก่อนเปลี่ยนไป Step 2
    setParentErrors({});
  
    setStep(2);
  };
  
  
  const handlePrevStep = () => setStep(1);

  const resetForm = () => {
    setFormData(initialFormData);
    setParentData(initialParentData);
    setErrors({});
  };
  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen]);
  
  const handleOpen = () => {
    setStudentErrors({});
    setParentErrors({});
    setErrors({});
    setStep(1)
  };
  
  const handleClose = () => {
    resetForm();
    setStudentErrors({});
    setParentErrors({});
    setErrors({});
    onClose();
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name.startsWith("parent")) {
      // ตรวจสอบและตั้งชื่อใหม่ให้ถูกต้อง
      let fieldName = name.replace("parent", "").charAt(0).toLowerCase() + name.slice(7);
      
      if (name === "parentRelation") fieldName = "relation";
      if (name === "parentEmail") fieldName = "emailParent";
      if (name === "parentPhone") fieldName = "parentPhoneNumber";
  
      setParentData({ ...parentData, [fieldName]: value });
      setParentErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } else {
      setFormData({ ...formData, [name]: value });
      setStudentErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    // Validate ทั้ง student และ parent ก่อนส่ง API
    const studentResult = studentSchema.safeParse(formData);
    const parentResult = parentRegisterSchema.safeParse(parentData);
  
    if (!studentResult.success || !parentResult.success) {
      const newStudentErrors: Record<string, string> = {};
      const newParentErrors: Record<string, string> = {};
  
      if (!studentResult.success) {
        studentResult.error.errors.forEach((err) => {
          if (err.path.length) newStudentErrors[err.path[0]] = err.message;
        });
      }
  
      if (!parentResult.success) {
        parentResult.error.errors.forEach((err) => {
          if (err.path.length) newParentErrors[err.path[0]] = err.message;
        });
      }
  
      setStudentErrors(newStudentErrors);
      setParentErrors(newParentErrors);
      return; 
    }
  
    setLoading(true);
    setIsSuccess(false);
  
    try {
      const transformedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        classRoom: formData.classRoom,
        classLevel: formData.classLevel,
        displayName: formData.displayName,
        gender: formData.gender === "ชาย" ? "male" : "female",
        emailStudent: formData.emailStudent,
        phoneNumber: formData.phoneNumber,
        parentPhoneNumber: parentData.parentPhoneNumber,
        parentRegister: {
          phoneNumber: parentData.parentPhoneNumber,
          emailParent: parentData.emailParent,
          firstName: parentData.firstName,
          lastName: parentData.lastName,
          relation: parentData.relation,
        },
      };
  
      console.log("ส่งข้อมูลไปยัง API:", transformedData);
      await apiClient.post(MEMO_API.studentAddForm, transformedData);

      setLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setLoading(false);
        setIsSuccess(true);
      }, 1000);
  
      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
        onAddSuccess();
        
      }, 3000);
    } catch (error) {
      setLoading(false);
  
      // ถ้าเกิดข้อผิดพลาดจาก Zod validation
      if (error instanceof z.ZodError) {
        console.log("❌ Zod Validation Error:", error.format());
      } else {
        console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
        setError("อีเมล์หรือเบอร์นักเรียนนี้ถูกใช้งานแล้ว ลองใช้อีเมลหรือเบอร์อื่น");
      }
    }
  };
  


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
      <div className="bg-system-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl relative">
        {step === 1 ? (
          <>
            <h2 className="font-bold mb-4 text-[18px] text-left">
              เพิ่มรายชื่อนักเรียน
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ชื่อ"
                    type="text"
                    name="firstName"
                    placeholder="กรุณาพิมพ์ชื่อของนักเรียน"
                    error={studentErrors?.firstName}
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
                    error={studentErrors?.lastName}
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
                    error={studentErrors?.classLevel}
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
                    error={studentErrors?.classRoom}
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
                    error={studentErrors?.displayName}
                    value={formData.displayName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoSelectHeader
                    label="เพศ"
                    options={["หญิง", "ชาย"]}
                    name="gender"
                    placeholder="กรุณาเลือกเพศ"
                    value={formData.gender}
                    error={studentErrors?.gender}
                    size="full"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <MemoInputHeader
                    text="อีเมล"
                    type="email"
                    name="emailStudent"
                    placeholder="กรุณาพิมพ์อีเมลของนักเรียน"
                    error={studentErrors?.emailStudent}
                    value={formData.emailStudent}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                <MemoInputHeader
                    text="เบอร์"
                    type="text"
                    name="phoneNumber"
                    placeholder="กรุณาพิมพ์เบอร์ของนักเรียน"
                    error={studentErrors?.phoneNumber}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  </div>
              </div>
              <div className="flex space-x-4 pt-2">
                <MemoButton
                  title="ยกเลิก"
                  variant="ghost"
                  onClick={handleClose}
                />
                <MemoButton
                  title="ถัดไป"
                  variant="primary"
                  onClick={handleNextStep}
                />
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-bold mb-4 text-[18px] text-left">
              เพิ่มข้อมูลผู้ปกครอง
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ชื่อของผู้ปกครอง"
                    type="text"
                    name="parentFirstName"
                    placeholder="กรุณาพิมพ์ชื่อของผู้ปกครอง"
                    error={parentErrors?.firstName}
                    value={parentData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="นามสกุลของผู้ปกครอง"
                    type="text"
                    name="parentLastName"
                    placeholder="กรุณาพิมพ์นามสกุลของผู้ปกครอง"
                    error={parentErrors?.lastName}
                    value={parentData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <MemoInputHeader
                    text="ความสัมพันธ์"
                    type="text"
                    name="parentRelation" 
                    placeholder="ความสัมพันธ์กับนักเรียน"
                    error={parentErrors?.relation}
                    value={parentData.relation}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <MemoInputHeader
                    text="อีเมลของผู้ปกครอง"
                    type="email"
                    name="parentEmail" 
                    placeholder="กรุณาพิมพ์อีเมลของผู้ปกครอง"
                    error={parentErrors?.emailParent}
                    value={parentData.emailParent}
                    onChange={handleChange}
                  />

                  <MemoInputHeader
                    text="เบอร์ของผู้ปกครอง"
                    type="text"
                    name="parentPhone"
                    placeholder="กรุณาพิมพ์เบอร์ของผู้ปกครอง"
                    error={parentErrors?.parentPhoneNumber}
                    value={parentData.parentPhoneNumber}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-system-error">{error}</p>}
              </div>
              <div className="flex space-x-4 pt-2">
                <MemoButton
                  title="ย้อนกลับ"
                  variant="ghost"
                  onClick={handlePrevStep}
                />
                <MemoButton
                  title="บันทึก"
                  variant="primary"
                  disabled={loading}
                  type="submit"
                />
              </div>

              {(loading || isSuccess) && (
                <MemoPopUp
                  show={loading || isSuccess}
                  onClose={handleClose}
                  redirectUrl="/"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
                      <h2 className="text-title font-bold text-center">
                        กำลังเพิ่ม...
                      </h2>
                    </>
                  ) : (
                    <>
                      <SuccessIcon className="w-24 h-24 mx-auto mb-4" />
                      <h2 className="text-title font-bold text-center">
                        เพิ่มรายชื่อนักเรียนสำเร็จ
                      </h2>
                    </>
                  )}
                </MemoPopUp>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUpAddStudentList;
