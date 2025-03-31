import apiClient from "@/components/axios/axiosConfig";
import { useEffect, useState } from "react";
import { z, type ZodFormattedError } from "zod";

import MemoButton from "@/components/button/memo-button";
import MemoPopUp from "@/components/container/memo-popup-time";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import { MEMO_API } from "@/constants/apis";

import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { FaSpinner } from "react-icons/fa";

// Updated schema for student only (parent-related fields removed)
const studentSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  classLevel: z
    .string()
    .min(1, "กรุณากรอกระดับชั้น")
    .regex(/^[4-6]$/, "ชั้นเรียนต้องเป็นตัวเลขจาก 4 ถึง 6"),
  classRoom: z
    .string()
    .regex(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(1, "กรุณากรอกห้องเรียน"),
  displayName: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  gender: z.enum(["ชาย", "หญิง"], { errorMap: () => ({ message: "กรุณาเลือกเพศ" }) }),
  emailStudent: z.string().email("กรุณากรอกอีเมลของนักเรียน").min(1, "กรุณากรอกอีเมล"),
  phoneNumber: z
    .string()
    .min(1, "กรุณากรอกเบอร์")
    .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
    .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก"),
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
  const [errors, setErrors] = useState<ZodFormattedError<
    z.infer<typeof studentSchema>,
    string
  > | null>(null);
  const [loading, setLoading] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors(null); // Reset errors when popup opens
    }
    setFormData(initialData);
  }, [isOpen, initialData]);

  const handleClose = () => {
    setError(null);
    onClose();
    console.log(error)
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev ? { ...prev, [name]: undefined } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = studentSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.format()); // ตรวจสอบโครงสร้างของ error
      setErrors(result.error.format());
      return;
    }

    setErrors(null);
    setLoading(true);
    setIsSuccess(false);

    try {
      await apiClient.put(`${MEMO_API.studentEdit}/${studentId}`, formData);
      onEditSuccess();
      setIsSuccess(true);
      console.log(formData)
      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          "ข้อมูลซ้ำกับข้อมูลเดิม กรุณาแก้ไขข้อมูลใหม่"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
      <div className="bg-system-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl relative">
        <h2 className="font-bold mb-4 text-[18px] text-left">
          แก้ไขรายชื่อนักเรียน
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-[48%]">
              <MemoInputHeader
                text="ชื่อ"
                type="text"
                name="firstName"
                placeholder="กรุณาพิมพ์ชื่อของนักเรียน"
                error={errors?.firstName?._errors?.[0]}
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
                error={errors?.lastName?._errors?.[0]}
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
                error={errors?.classLevel?._errors?.[0]}
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
                error={errors?.classRoom?._errors?.[0]}
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
                error={errors?.displayName?._errors?.[0]}
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
                error={errors?.gender?._errors?.[0]}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <MemoInputHeader
                text="อีเมล"
                type="email"
                name="emailStudent"
                placeholder="กรุณาพิมพ์อีเมลของนักเรียน"
                error={errors?.emailStudent?._errors?.[0]}
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
                error={errors?.phoneNumber?._errors[0]}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex space-x-4 pt-2 ">
            <MemoButton title="ยกเลิก" variant="ghost" onClick={handleClose} />
            <MemoButton
              title="บันทึก"
              variant="primary"
              disabled={loading}
              type="submit"
            />
          </div>
        </form>

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
                  กำลังแก้ไข...
                </h2>
              </>
            ) : (
              <>
                <SuccessIcon className="w-24 h-24 mx-auto mb-4 " />
                <h2 className="text-title font-bold text-center">
                  แก้ไขรายชื่อนักเรียนสำเร็จ
                </h2>
              </>
            )}
          </MemoPopUp>
        )}
      </div>
    </div>
  );
};

export default PopUpEditStudentList;
