import { useState, useEffect } from "react";
import axios from "axios";
import { z, type ZodFormattedError } from "zod";

import { MEMO_API } from "@/constants/apis";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import MemoButton from '@/components/button/memo-button'
import MemoPopUp from '@/components/container/memo-popup-time';

import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { FaSpinner } from "react-icons/fa";

const studentSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  classLevel: z.string().min(1, "กรุณากรอกระดับชั้น"),
  classRoom: z.string().min(1, "กรุณากรอกห้องเรียน"),
  displayName: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  gender: z.enum(["ชาย", "หญิง"], { errorMap: () => ({ message: "กรุณาเลือกเพศ" }) }),
  emailStudent: z.string().email("กรุณากรอกอีเมลของนักเรียน"),
  phoneNumber: z.string().regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข").length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
});

const parentSchema = z.object({
  parentFirstName: z.string().min(1, "กรุณากรอกชื่อของผู้ปกครอง"),
  parentLastName: z.string().min(1, "กรุณากรอกนามสกุลของผู้ปกครอง"),
  parentRelation: z.string().min(1, "กรุณากรอกความสัมพันธ์"),
  parentEmail: z.string().email("กรุณากรอกอีเมลของผู้ปกครอง"),
  parentPhone: z.string().regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข").length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
});

interface PopUpEditStudentListProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  studentId: string;
  initialData: {
    firstName: string;
    lastName: string;
    classLevel: string;
    classRoom: string;
    displayName: string;
    gender: string;
    emailStudent: string;
    phoneNumber: string;
    parent: {
      firstName: string;
      lastName: string;
      relation: string;
      email: string;
      phoneNumber: string;
    };
  };
}

const PopUpEditStudentList: React.FC<PopUpEditStudentListProps> = ({
  isOpen,
  onClose,
  onEditSuccess,
  studentId,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [parentData, setParentData] = useState(initialData.parent);
  const [errors, setErrors] = useState<ZodFormattedError<z.infer<typeof studentSchema>, string> | null>(null);
  const [parentErrors, setParentErrors] = useState<ZodFormattedError<z.infer<typeof parentSchema>, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors(null); // Reset errors when popup opens
      setParentErrors(null);
    }
    setFormData(initialData);
    setParentData(initialData.parent);
  }, [isOpen, initialData]);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("parent")) {
      setParentData(prev => ({ ...prev, [name]: value }));
      setParentErrors(prev => prev ? { ...prev, [name]: undefined } : null);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => prev ? { ...prev, [name]: undefined } : null);
    }
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate based on the current step
    const schemaToUse = step === 1 ? studentSchema : parentSchema;
    const result = schemaToUse.safeParse(step === 1 ? formData : parentData);

    if (!result.success) {
      if (step === 1) {
        setErrors(result.error.format());
      } else {
        setParentErrors(result.error.format());
      }
      return;
    }

    setLoading(true);
    setIsSuccess(false);

    try {
      const studentData = step === 1 ? formData : null;
      const parentDataToSubmit = step === 2 ? parentData : null;

      // First, update the student information
      await axios.put(`${MEMO_API.studentEdit}/${studentId}`, {
        ...studentData,
        parentPhoneNumber: parentDataToSubmit?.phoneNumber, // Ensure parent's phone is linked
      });

      // Then, update the parent information
      await axios.put(`${MEMO_API.studentEdit}/${studentId}`, {
        ...parentDataToSubmit,
        phoneNumber: parentDataToSubmit?.phoneNumber, // Match parent's phone number to student's phone number
      });

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
      <div className="bg-system-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl relative">
        {step === 1 ? (
          <>
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
                    placeholder="กรุณาพิมพ์ระดับชั้นของนักเรียน"
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
                    placeholder="กรุณาเลือกเพศ"
                    value={formData.gender}
                    error={errors?.gender}
                    onChange={handleChange}
                  />
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
                <div className="w-full">
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
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <MemoButton
                  text="ถัดไป"
                  type="button"
                  onClick={handleNextStep}
                  className="bg-primary-400 w-[48%] text-white"
                />
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-bold mb-4 text-[18px] text-left">ข้อมูลผู้ปกครอง</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ชื่อของผู้ปกครอง"
                    type="text"
                    name="parentFirstName"
                    placeholder="กรุณาพิมพ์ชื่อของผู้ปกครอง"
                    error={parentErrors?.parentFirstName}
                    value={parentData.parentFirstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="นามสกุลของผู้ปกครอง"
                    type="text"
                    name="parentLastName"
                    placeholder="กรุณาพิมพ์นามสกุลของผู้ปกครอง"
                    error={parentErrors?.parentLastName}
                    value={parentData.parentLastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="ความสัมพันธ์"
                    type="text"
                    name="parentRelation"
                    placeholder="กรุณาพิมพ์ความสัมพันธ์"
                    error={parentErrors?.parentRelation}
                    value={parentData.parentRelation}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <MemoInputHeader
                    text="อีเมลของผู้ปกครอง"
                    type="email"
                    name="parentEmail"
                    placeholder="กรุณาพิมพ์อีเมลของผู้ปกครอง"
                    error={parentErrors?.parentEmail}
                    value={parentData.parentEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <MemoInputHeader
                    text="เบอร์โทรศัพท์ของผู้ปกครอง"
                    type="text"
                    name="parentPhone"
                    placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ของผู้ปกครอง"
                    error={parentErrors?.parentPhone}
                    value={parentData.parentPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <MemoButton
                  text="ย้อนกลับ"
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-secondary-400 w-[48%] text-white"
                />
                <MemoButton
                  text="บันทึก"
                  type="submit"
                  className="bg-primary-400 w-[48%] text-white"
                />
              </div>
            </form>
          </>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <FaSpinner className="animate-spin text-white" size={40} />
          </div>
        )}

        {isSuccess && (
          <MemoPopUp
            isOpen={isSuccess}
            onClose={handleClose}
            icon={<SuccessIcon />}
            message="การแก้ไขข้อมูลสำเร็จ"
          />
        )}

        {error && (
          <MemoPopUp
            isOpen={error !== null}
            onClose={() => setError(null)}
            icon={<SuccessIcon />}
            message={error}
          />
        )}
      </div>
    </div>
  );
};

export default PopUpEditStudentList;
