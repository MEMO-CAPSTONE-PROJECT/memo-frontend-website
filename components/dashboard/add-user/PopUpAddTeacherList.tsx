import apiClient from "@/components/axios/axiosConfig";
import { useEffect, useMemo, useState } from "react";
import { z, type ZodFormattedError } from "zod";

import MemoButton from "@/components/button/memo-button";
import MemoPopUp from "@/components/container/memo-popup-time";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import { MEMO_API } from "@/constants/apis";

import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { FaSpinner } from "react-icons/fa";

const teacherSchema = z
  .object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    position: z.string().min(1, "เลือกตำแหน่ง"),
    gender: z.enum(["ชาย", "หญิง"], {
      errorMap: () => ({ message: "กรุณาเลือกเพศ" }),
    }),
    class: z
      .object({
        level: z
          .string()
          .min(1, "กรุณากรอกชั้นเรียน")
          .regex(/^[4-6]$/, "ชั้นเรียนต้องเป็นตัวเลขจาก 4 ถึง 6"),
        room: z
          .string()
          .regex(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
          .min(1, "กรุณากรอกห้องเรียน")
      })
      .optional()
      .nullable(),
    email: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
      .min(1, "กรุณากรอกอีเมลของคุณครู"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .regex(/^0\d{9}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
  })
  .refine(
    (data) => {
      if (data.position === "คุณครูประจำชั้น") {
        return !!data.class?.level && !!data.class?.room;
      }
      return true;
    },
    {
      message: "กรุณากรอกข้อมูลชั้นเรียนและห้องเรียน",
      path: ["class"],
    }
  );

const DisciplinaryTeacherSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  position: z.string().min(1, "เลือกตำแหน่ง"),
  gender: z.enum(["ชาย", "หญิง"], {
    errorMap: () => ({ message: "กรุณาเลือกเพศ" }),
  }),
  email: z
    .string()
    .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
    .min(1, "กรุณากรอกอีเมลของคุณครู"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
    .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
    .min(1, "กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
});

interface PopUpAddTeacherListProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const PopUpAddTeacherList: React.FC<PopUpAddTeacherListProps> = ({
  isOpen,
  onClose,
  onAddSuccess,
}) => {
  const initialFormData = useMemo(() => ({
    firstName: "",
    lastName: "",
    position: "",
    gender: "",
    class: {
      room: "",
      level: "",
    },
    email: "",
    phoneNumber: "",
  }), [])
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<ZodFormattedError<
    z.infer<typeof teacherSchema>,
    string
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors(null);
    }
  }, [isOpen,initialFormData]);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "classLevel" || name === "classRoom") {
      setFormData((prev) => ({
        ...prev,
        class: {
          ...(prev.class ?? { level: "", room: "" }), // ถ้าไม่มี class ให้กำหนดค่าเริ่มต้น
          [name === "classLevel" ? "level" : "room"]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors((prev) => (prev ? { ...prev, [name]: undefined } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("📌 handleSubmit ถูกเรียกแล้ว!");
    e.preventDefault();
    console.log("📋 Form Data ก่อน validate:", formData);
    let result = teacherSchema.safeParse(formData);

    if (formData.position === "คุณครูฝ่ายปกครอง") {
      result = DisciplinaryTeacherSchema.safeParse(formData);
      console.log(formData.position);
    }

    console.log("🧐 ผลลัพธ์ของ safeParse:", result);
    if (!result.success) {
      console.log("❌ Validation Errors:", result.error.format());
      console.log(result.error.format());
      setErrors(result.error.format());
      return;
    }

    setLoading(true);
    setIsSuccess(false);
    const filteredFormData =
      formData.position === "คุณครูประจำชั้น"
        ? formData
        : (({ class: className, ...rest }) => {
            // Use className here if you need it
            console.log(className); // Example usage
            return rest;
          })(formData);
    console.log("หลังลบ", filteredFormData); // ✅ Debug

    try {
      await apiClient.post(MEMO_API.teacherAddForm, filteredFormData);
      setError(null);
      console.log("✅ ส่ง API สำเร็จ!");
      onAddSuccess();
      setLoading(false);
      setIsSuccess(true);
      console.log(formData);
      setTimeout(() => {
        setLoading(false);
        setIsSuccess(true);
      }, 1000);

      setTimeout(() => {
        setIsSuccess(false);
        handleClose();
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("❌ Zod Validation Error:", error.format());
        setErrors(error.format());
      } else {
        console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
        setError("อีเมล์หรือเบอร์นี้ถูกใช้งานแล้ว ลองใช้อีเมลอื่น");
      }
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
      <div className="bg-system-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-lg md:max-w-2xl relative">
        <h2 className="font-bold mb-4 text-[18px] text-left">
          เพิ่มรายชื่อคุณครู
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-wrap gap-4">
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
                options={["คุณครูประจำชั้น", "คุณครูฝ่ายปกครอง"]}
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
            {formData.position === "คุณครูประจำชั้น" && (
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
            <MemoButton
              title="เพิ่ม"
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
                  <SuccessIcon className="w-24 h-24 mx-auto mb-4 " />
                  <h2 className="text-title font-bold text-center">
                    เพิ่มรายชื่อคุณครูสำเร็จ
                  </h2>
                </>
              )}
            </MemoPopUp>
          )}
        </form>
      </div>
    </div>
  );
};

export default PopUpAddTeacherList;
