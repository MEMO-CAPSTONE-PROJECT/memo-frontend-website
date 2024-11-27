'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputTextHelper from '@/components/input/memo-input-text-helper'
import MemoSelectHelper from 'components/input/memo-select-helper'
import AdminIcon from '@/components/ui/icons/registration/admin'
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios";
import { z } from "zod";



export default function AdminRegistrationForm() {

  const formSchema = z.object({
    teacherId: z
      .string()
      .regex(/^\d+$/, "รหัสคุณครูต้องเป็นตัวเลข")
      .length(5, "รหัสคุณครูต้องมีจำนวน 5 หลัก")
      .min(1,"กรุณากรอกรหัสของคุณครู"),

    email: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
      .min(1,"กรุณากรอกอีเมลของคุณครู"),

    userName: z
      .string()
      .min(1,"กรุณากรอกชื่อผู้ใช้ของคุณครู"),

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
    teacherId: "",
    firstName:"",
    lastName:"",
    userName:"",
    password: "",
    role: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for the current field
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    try {
      formSchema.parse(formData);
      const response = await axios.post("http://cp24sy1.sit.kmutt.ac.th:8081/register/admin",formData);
      console.log("Response:", response.data);
      console.log(formData)
      
      setSubmitStatus("ลงทะเบียนผู้ใช้สำเร็จ");

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
        setSubmitStatus("มีผู้ใช้นี้แล้ว กรุณากรอกข้อมูลใหม่");
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
        <form className="flex flex-col space-y-lg">
          <MemoInputTextHelper  
            type="text"
            name="teacherId"
            error={errors.teacherId}
            value={formData.teacherId}
            onChange={handleChange} 
            placeholder="รหัสประจำตัวของคุณครู" />

            <MemoInputTextHelper 
            type="text"
            name="firstName"
            error={errors.firstName}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ชื่อของคุณครู"/>

            <MemoInputTextHelper 
            type="text"
            name="lastName"
            error={errors.lastName}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="นามสกุลของคุณครู"/>

            <MemoInputTextHelper 
            type="text"
            name="userName"
            error={errors.userName}
            value={formData.userName}
            onChange={handleChange}
            placeholder="ชื่อผู้ใช้ของคุณครู"/>

            <MemoInputTextHelper 
            type="text"
            name="role"
            error={errors.role}
            value={formData.role}
            onChange={handleChange}
            placeholder="ตำแหน่งของคุณครู"/>

          <MemoInputTextHelper 
            type="email"
            name="email"
            error={errors.email}
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมลของคุณครู"/>

            <MemoInputTextHelper 
            type="text"
            name="password"
            error={errors.password}
            value={formData.password}
            onChange={handleChange}
            placeholder="รหัสผ่านของคุณครู"/>
        
                   
          <MemoErrorMessage error={submitStatus} />
          <MemoButton onClick={handleSubmit} title="ลงทะเบียน" />
          <Link href="/">
            <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
        </form>
      </MemoWhite>
    </BrandingBackground>
    )
  }
  
