'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputTextHelper from '@/components/input/memo-input-text-helper'
// import MemoInputText from '@/components/input/memo-input-text'
import TeacherIcon from '@/components/ui/icons/registration/teacher'
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios";
import { z } from "zod";


export default function TeacherRegistrationForm() {

  const formSchema = z.object({
    teacherId: z
      .string()
      .regex(/^\d+$/, "รหัสคุณครูต้องเป็นตัวเลข")
      .length(5, "รหัสคุณครูต้องมีจำนวน 5 หลัก")
      .nonempty("กรุณากรอกรหัสคุณครู"),
    position: z
      .string()
      .nonempty("กรุณากรอกตำแหน่ง"),
    email: z
      .string()
      .email("กรุณากรอกอีเมล"),
    firstName: z
      .string()
      .nonempty("กรุณากรอกขื่อ"),
    lastName: z
      .string()
      .nonempty("กรุณากรอกนามสกุล"),
    gender: z
      .string()
      .nonempty("กรุณาเลือกเพศ"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .nonempty("Phone number is required"),
  });

  type FormData = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<FormData>({
    teacherId: "",
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

    // Clear the error for the current field
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    try {
      formSchema.parse(formData);
      const response = await axios.post("http://cp24sy1.sit.kmutt.ac.th:8081/register/teacher",formData);
      console.log("Response:", response.data);
      console.log(formData)
      setSubmitStatus("ลงทะเบียนบัชชีคุณครูสำเร็จ");

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
        setSubmitStatus("แอคเคานต์นี้มีแล้ว กรุณากรอกข้อมูลใหม่");
      }
    }
  };
  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto  flex-col items-center justify-center space-y-xl'>
        <TeacherIcon className="space-x-xl w-96 h-96" />
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
            placeholder="รหัสประจำตัวคุณครู" />
          
          <MemoInputTextHelper 
            type="text"
            name="position"
            error={errors.position}
            value={formData.position}
            onChange={handleChange}
            placeholder="ตำแหน่ง" />

          <MemoInputTextHelper 
            type="email"
            name="email"
            error={errors.email}
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมล"/>
          
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

          <MemoInputTextHelper 
            type="text"
            name="gender"
            error={errors.gender}
            value={formData.gender}
            onChange={handleChange}
            placeholder="เพศ"/>
          
          <MemoInputTextHelper 
            type="text"
            name="phoneNumber"
            error={errors.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"/>
                   
          <MemoErrorMessage error={submitStatus}/>
          <MemoButton onClick={handleSubmit} title="ลงทะเบียน" />
          <Link href="/">
            <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
        </form>
      </MemoWhite>
    </BrandingBackground>
    )
  }
  
