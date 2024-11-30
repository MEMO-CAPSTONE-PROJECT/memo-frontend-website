'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputTextHelper from '@/components/input/memo-input-text-helper'
import MemoInputHeader from "@/components/input/memo-input-header";
import AdminIcon from '@/components/ui/icons/registration/admin'
import MemoSelectHelper from 'components/input/memo-select-helper'
import Link from 'next/link'
import {MEMO_API} from '@/constants/apis';
import axios from "axios";
import { z } from "zod";
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function AdminRegistrationForm() {
  const formSchema = z.object({
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
    .regex(/[0-9]/, "รหัสผ่านต้องประกอบไปด้วยตัวเลข") // มีตัวเลข
    .regex(/[@$!%*?&]/, "รหัสผ่านต้องประกอบไปด้วยอักขระพิเศษ (@, $, !, %, *, ?, &)") 
  });

  type FormData = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<FormData>({
    firstName:"",
    lastName:"",
    username:"",
    password: "",
    role: "",
    email: "",
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
      formSchema.parse(formData);
      const response = await axios.post(MEMO_API.adminRegister,formData);
      router.push('/admin/login');
      console.log("Response:", response.data);
      console.log(formData)

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
          <p className="text-body-1 text-header font-bold">ส่งคำร้องเพื่อลงทะเบียนระบบ</p>
        </section>
        <form className="flex flex-col space-y-lg" onSubmit={handleSubmit}>
            
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
            placeholder="กรุณาพิมพ์ชื่อบัชชีผู้ใช้ของคุณ"
            error={errors?.username}
            value={formData.username}
            onChange={handleChange}
            />  

          <label className="block text-lg font-medium text-body-1 mb-2">ตำแหน่ง</label>
          <MemoSelectHelper 
            options={["ครูประจำชั้น", "ครูฝ่ายปกครอง"]} 
            onChange={handleSelect} 
            name="role" 
            placeholder="กรุณาเลือกตำแหน่งของคุณ" 
            value={formData.role} 
            error={errors.role} 
            size="full" />

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
                     
          <MemoErrorMessage error={submitStatus} />
          <div className="space-x-4 flex pt-4">
          <div className="w-1/2">
          <Link href="/">
              <MemoButton title="หน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
          </div>
          <div className="w-1/2">
               <MemoButton type='submit' title="ลงทะเบียน" />
           </div>
          </div>
        </form>
      </MemoWhite>
    </BrandingBackground>
    )
  }
  
