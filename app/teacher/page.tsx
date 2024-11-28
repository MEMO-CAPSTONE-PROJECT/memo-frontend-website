'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputTextHelper from '@/components/input/memo-input-text-helper'
import MemoSelectHelper from 'components/input/memo-select-helper'
import TeacherIcon from '@/components/ui/icons/registration/teacher'
import {MEMO_API} from '@/constants/apis';
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios";
import { z } from "zod";
import OTPVerificationPopup from '@/components/container/memo-otp';

export default function TeacherRegistrationForm() {
  const [showPopup, setShowPopup] = useState(false);
  const formSchema = z.object({
    position: z
      .string()
      .min(1,"กรุณากรอกตำแหน่งของคุณครู"),
    email: z
    .string()
    .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
    .min(1,"กรุณากรอกอีเมลของคุณครู"),
    firstName: z
      .string()
      .min(1,"กรุณากรอกขื่อของคุณครู"),
    lastName: z
      .string()
      .min(1,"กรุณากรอกนามสกุลของคุณครู"),
    gender: z
      .string()
      .min(1,"กรุณาเลือกเพศของคุณครู"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1,"กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
  });

  type FormData = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<FormData>({
    position: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      const response = await axios.post(MEMO_API.teacherRegister,formData);
      console.log("Response:", response.data);
      console.log(formData)
      setShowPopup(true);

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
        <TeacherIcon className="space-x-xl w-96 h-96" />
      </section>
   
      <MemoWhite>
        {showPopup && (
          <OTPVerificationPopup propEmail={formData.email} api={MEMO_API.teacherOtp} />
        )}

        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header font-bold">ส่งคำร้องเพื่อลงทะเบียนระบบ</p>
        </section>
        <form className="flex flex-col space-y-lg" onSubmit={handleSubmit}>
          
          <MemoInputTextHelper 
            type="text"
            name="firstName"
            error={errors.firstName}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ชื่อ"/>

          <MemoInputTextHelper 
            type="text"
            name="lastName"
            error={errors.lastName}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="นามสกุล"/>

          <MemoSelectHelper 
          options={["ผู้หญิง", "ผู้ชาย"]} 
          onChange={handleSelect} 
          name="gender" 
          placeholder="เลือกเพศของคุณ" 
          value={formData.gender} 
          error={errors.gender} 
          size="full" />
          
          <MemoSelectHelper 
            name="position"
            options={["คุณครูประจำชั้น", "คุณครูฝ่ายปกครอง"]}
            error={errors.position}
            value={formData.position}
            onChange={handleSelect}
            placeholder="ตำแหน่งของคุณครู"
            size="full"/>

          <MemoInputTextHelper 
            type="email"
            name="email"
            error={errors.email}
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมลของคุณครู"/>

          <MemoInputTextHelper 
            type="text"
            name="phoneNumber"
            error={errors.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"/>
                   
          <MemoErrorMessage error={submitStatus}  />
          <MemoButton type='submit' title="ลงทะเบียน" />
          <Link href="/">
            <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
        </form>
      </MemoWhite>
    </BrandingBackground>
    )
  }
  
