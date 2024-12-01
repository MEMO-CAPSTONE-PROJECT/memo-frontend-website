'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputHeader from "@/components/input/header/memo-input-header"
import MemoSelectHeader from '@/components/input/header/memo-select-header'
import AdminIcon from '@/components/ui/icons/registration/admin'
import { MEMO_API } from '@/constants/apis'
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from "zod"

const AdminRegsirrationSchema = z.object({
  email: z
    .string()
    .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
    .min(1,"กรุณากรอกอีเมลของคุณครู"),

  username: z
    .string()
    .min(1,"กรุณากรอกชื่อบัญชีผู้ใช้ของคุณครู"),

    firstName: z
    .string()
    .min(1,"กรุณากรอกชื่อของคุณครู"),

    lastName: z
    .string()
    .min(1,"กรุณากรอกนามสกุลของคุณครู"),

    role: z
    .string()
    .min(1,"กรุณากรอกตำแหน่งของคุณครู"),

  password: z
  .string()
  .min(8, "รหัสผ่านต้องมีจำนวนอย่างน้อย 8 ตัว") 
  .max(20, "รหัสผ่านมีจำนวนมากสุดได้ 20 ตัว") 
  .regex(/[A-Z]/, "รหัสผ่านต้องประกอบไปด้วยตัวพิมพ์ใหญ่") 
  .regex(/[a-z]/, "รหัสผ่านต้องประกอบไปด้วยตัวพิมพ์เล็ก") 
  .regex(/\d/, "รหัสผ่านต้องประกอบไปด้วยตัวเลข")
  .regex(/[@$!%*?&]/, "รหัสผ่านต้องมีอักขระพิเศษ (@, $, !, %, *, ?, &)"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
})

type AdminRegistrationData = z.infer<typeof AdminRegsirrationSchema>

export default function AdminRegistrationForm() {
  const [formData, setFormData] = useState<AdminRegistrationData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    email: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const router = useRouter();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      AdminRegsirrationSchema.parse(formData);
      await axios.post(MEMO_API.adminRegister, formData);
      router.push('/admin/login');
      // console.log("Response:", response.data);
      // console.log(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error submitting form:", error);
        setSubmitStatus("รหัสประจำตัวนี้ถูกใช้งานแล้ว ลองใช้รหัสประจำตัวอื่น");
      }
    }
  };
  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto  flex-col items-center justify-center space-y-xl'>
        <AdminIcon className="space-x-xl w-96 h-96" />
      </section>
      <MemoWhite>
        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header text-center font-bold">ส่งคำร้องเพื่อลงทะเบียนระบบผู้ดูแล</p>
        </section>
        <form className="flex flex-col space-y-md w-96" onSubmit={handleSubmit}>
          <MemoInputHeader
            text="ชื่อ"
            type="text"
            name="firstName"
            placeholder="กรุณาพิมพ์ชื่อของคุณ"
            error={errors?.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
          <MemoInputHeader
            text="นามสกุล"
            type="text"
            name="lastName"
            placeholder="กรุณาพิมพ์นามสกุลของคุณ"
            error={errors?.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
          <MemoInputHeader
            text="ชื่อผู้ใช้"
            type="text"
            name="username"
            placeholder="กรุณาพิมพ์ชื่อบัญชีผู้ใช้ของคุณ"
            error={errors?.username}
            value={formData.username}
            onChange={handleChange}
          />
          <MemoSelectHeader
            name="role"
            label="ตำแหน่ง"
            options={["ครูประจำชั้น", "ครูฝ่ายปกครอง"]}
            onChange={handleSelect}
            placeholder="กรุณาเลือกตำแหน่งของคุณ"
            value={formData.role}
            error={errors.role}
          />
          <MemoInputHeader
            text="อีเมล"
            type="email"
            name="email"
            placeholder="กรุณาพิมพ์อีเมลของคุณ"
            error={errors?.email}
            value={formData.email}
            onChange={handleChange}
          />
          <MemoInputHeader
            text="รหัสผ่าน"
            type="password"
            name="password"
            placeholder="กรุณาพิมพ์รหัสผ่านของคุณ"
            error={errors?.password}
            value={formData.password}
            onChange={handleChange}
          />
          <MemoInputHeader
            text="ยืนยันรหัสผ่าน"
            type="password"
            name="confirmPassword"
            placeholder="กรุณาพิมพ์รหัสผ่านของคุณ"
            error={errors?.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <MemoErrorMessage error={submitStatus} />
          <div className="space-x-lg flex pt-lg">
            <div className="flex-1">
              <Link href="/">
                <MemoButton title="หน้าเลือกผู้ใช้" variant="ghost" />
              </Link>
            </div>
            <div className="flex-1">
              <MemoButton type='submit' title="ลงทะเบียน" />
            </div>
          </div>
        </form>
      </MemoWhite>
    </BrandingBackground>
    )
  }
  
