'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoSelectHelper from 'components/input/memo-select-helper'
import TeacherIcon from '@/components/ui/icons/registration/teacher'
import MemoInputHeader from "@/components/input/memo-input-header";
import MemoPopUp from '@/components/container/memo-popup';
import LetterIcon from '@/components/ui/icons/letter';
import {MEMO_API} from '@/constants/apis';
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios";
import { z } from "zod";
import OTPVerificationPopup from '@/components/container/memo-otp';

export default function TeacherRegistrationForm() {
  const [showOtpPopup, setShowOtpPopup] = useState(false);
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
      setShowOtpPopup(true);

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
  const [showSuccessPopup, setShowSuccesPopup] = useState(false);

  const handleClosePopup = () => {
    setShowSuccesPopup(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmitOtp = async (event: React.FormEvent,otp:string) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      otp: otp,
      emailTeacher:formData.email ,
    };

    try {
      const response = await axios.post(MEMO_API.teacherOtp, data);
      if (response.status === 200) {
        setShowOtpPopup(false)
        setShowSuccesPopup(true);
        setIsLoading(false);
        console.log(data);
      }
    } catch (error) {
      setError('ไม่สามารถยืนยันรหัส OTP ได้ กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);

    }
  };
  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto  flex-col items-center justify-center space-y-xl'>
        <TeacherIcon className="space-x-xl w-96 h-96" />
      </section>
   
      <MemoWhite>
        {showOtpPopup && (
          <OTPVerificationPopup propEmail={formData.email} api={MEMO_API.teacherOtp} onCancel={() =>setShowOtpPopup(false)} onSubmit={handleSubmitOtp} isLoading={isLoading} error={error}/>
        )}
      <MemoPopUp show={showSuccessPopup} onClose={handleClosePopup} redirectUrl="/">
        <LetterIcon className="space-x-xl w-48 h-56  " />
        <h2 className="text-title font-bold mb-2">ลงทะเบียนผู้ใช้สำเร็จ</h2>
        <p className='text-body mb-4 '>กลับไปยังหน้าเลือกผู้ใช้</p>
      </MemoPopUp>

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
            text="อีเมล"
            type="email"
            name="email"
            placeholder="กรุณาพิมพ์อีเมลของคุณ"
            error={errors?.email}
            value={formData.email}
            onChange={handleChange}
            />  

        <label className="block text-lg font-medium text-body-1 mb-2">เพศ</label>
          <MemoSelectHelper 
          options={["ผู้หญิง", "ผู้ชาย"]} 
          onChange={handleSelect} 
          name="gender" 
          placeholder="กรุณาเลือกเพศของคุณ" 
          value={formData.gender} 
          error={errors.gender} 
          size="full" />
        
        <label className="block text-lg font-medium text-body-1 mb-2">ตำแหน่ง</label>
          <MemoSelectHelper 
            name="position"
            options={["คุณครูประจำชั้น", "คุณครูฝ่ายปกครอง"]}
            error={errors.position}
            value={formData.position}
            onChange={handleSelect}
            placeholder="กรุณาเลือกตำแหน่งของคุณ"
            size="full"/>

          <MemoInputHeader
            text="เบอร์โทรศัพท์"
            type="text"
            name="phoneNumber"
            placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ของคุณ"
            error={errors?.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
            />
                   
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
  
