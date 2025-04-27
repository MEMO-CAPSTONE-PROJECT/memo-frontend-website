import apiClient from "@/components/axios/axiosConfig";
import MemoButton from "@/components/button/memo-button";
import MemoPopUp from "@/components/container/memo-popup-time";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import SuccessIcon from "@/components/ui/icons/pop-up/success-icon";
import { MEMO_API } from "@/constants/apis";
import { useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { z, type ZodFormattedError } from "zod";

const adminSchema = z
  .object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    userName: z.string().min(1, "กรุณากรอกชื่อผู้ใช้งาน"),
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
  })
  .refine((data) => {
    if (data.password && data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });


interface PopUpAddAdminProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const PopUpAddAdmin: React.FC<PopUpAddAdminProps> = ({
  isOpen,
  onClose,
  onAddSuccess,
}) => {
  const initialFormData = useMemo(()=> ({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),[]);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<ZodFormattedError<z.infer<typeof adminSchema>,string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors(null);
    }
  }, [isOpen, initialFormData]);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => (prev ? { ...prev, [name]: undefined } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
  
    // ตรวจสอบข้อมูลก่อนส่ง API
    const result = adminSchema.safeParse(formData);
    console.log(result.success);
    if (!result.success) {
      console.log("❌ Validation Errors:", result.error.format()); 
      setErrors(result.error.format());
      return;
    }
    setLoading(true);
    setIsSuccess(false);
    try {
      
      await apiClient.post(MEMO_API.adminAddForm, {
        ...formData,
        role: "Teacher Staff", 
        password: formData.password,
      });
  
      console.log(formData);
      setError(null);
      onAddSuccess();
      setLoading(false);
      setIsSuccess(true);
  
      
      setTimeout(() => {
        setLoading(false);  
        setIsSuccess(true); 
      }, 1000);
  
      setTimeout(() => {
        setIsSuccess(false); 
        handleClose();
      }, 3000);
  
    } catch (error) {
      setLoading(false);

      if (error instanceof z.ZodError) {
        console.log("❌ Zod Validation Error:", error.format());
        setErrors(error.format());
      } else {
        console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
        setError("อีเมล์หรือเบอร์นี้ถูกใช้งานแล้ว ลองใช้อีเมลอื่น");
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-50 px-4">
      <div className="bg-system-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-lg md:max-w-2xl relative">
        <h2 className="font-bold mb-4 text-[18px] text-left">
          เพิ่มข้อมูลผู้ดูแลระบบ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-wrap gap-4">
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

            <MemoInputHeader
              text="ชื่อผู้ใช้งาน"
              type="text"
              name="userName"
              placeholder="กรุณาพิมพ์ชื่อของผู้ดูแลระบบ"
              error={errors?.userName?._errors[0]}
              value={formData.userName}
              onChange={handleChange}
            />

            <MemoInputHeader
              text="อีเมล"
              type="email"
              name="email"
              placeholder="กรุณาพิมพ์อีเมลของผู้ดูแลระบบ"
              error={errors?.email?._errors[0]}
              value={formData.email}
              onChange={handleChange}
            />

            <MemoInputHeader
              text="รหัสผ่าน"
              type="password"
              name="password"
              placeholder="กรุณากรอกรหัสผ่าน"
              error={errors?.password?._errors[0]}
              value={formData.password}
              onChange={handleChange}
            />

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
                    เพิ่ม Admin สำเร็จ
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

export default PopUpAddAdmin;

