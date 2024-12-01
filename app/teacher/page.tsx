'use client'
import BrandingBackground from '@/components/background/branding-background'
import MemoButton from '@/components/button/memo-button'
import MemoOTPPopup from '@/components/container/memo-otp'
import MemoPopUp from '@/components/container/memo-popup'
import MemoWhite from '@/components/container/memo-white'
import MemoErrorMessage from '@/components/helper/memo-error-message'
import MemoInputHeader from "@/components/input/header/memo-input-header"
import MemoSelectHeader from '@/components/input/header/memo-select-header'
import LetterIcon from '@/components/ui/icons/letter'
import TeacherIcon from '@/components/ui/icons/registration/teacher'
import { MEMO_API } from '@/constants/apis'
import axios from "axios"
import Link from 'next/link'
import { useState } from 'react'
import { z } from "zod"

export default function TeacherRegistrationForm() {
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const formSchema = z.object({
    position: z
      .string()
      .min(1, "เลือกตำแหน่งของคุณ"),
    email: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@example.com")
      .min(1, "กรุณากรอกอีเมลของคุณครู"),
    firstName: z
      .string()
      .min(1, "กรุณากรอกขื่อของคุณครู"),
    lastName: z
      .string()
      .min(1, "กรุณากรอกนามสกุลของคุณครู"),
    gender: z
      .string()
      .min(1, "เลือกเพศของคุณ"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของคุณครู"),
  })

  type FormData = z.infer<typeof formSchema>

  const [formData, setFormData] = useState<FormData>({
    position: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<string>("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const sendForm = async () => {
    try {
      formSchema.parse(formData)
      await axios.post(MEMO_API.teacherRegister, formData)
      // console.log("Response:", response.data)
      // console.log(formData)
      setShowOtpPopup(true)

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        console.error("Error submitting form:", error)
        setSubmitStatus("อีเมล์นี้ถูกใช้งานแล้ว ลองใช้อีเมลอื่น")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    sendForm()
  }
  const [showSuccessPopup, setShowSuccesPopup] = useState(false)

  const handleClosePopup = () => {
    setShowSuccesPopup(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmitOtp = async (event: React.FormEvent, otp: string) => {
    event.preventDefault()
    setIsLoading(true)
    const data = {
      otp: otp,
      emailTeacher: formData.email,
    }
    try {
      const response = await axios.post(MEMO_API.teacherOtp, data)
      if (response.status === 200) {
        setShowOtpPopup(false)
        setShowSuccesPopup(true)
        setIsLoading(false)
        // console.log(data)
      }
    } catch (_) {
      setError('ไม่สามารถยืนยันรหัส OTP ได้ กรุณาลองใหม่อีกครั้ง')
      setIsLoading(false)

    }
  }

  const resendOtp = () => {
    sendForm()
  }

  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto  flex-col items-center justify-center space-y-xl'>
        <TeacherIcon className="space-x-xl w-96 h-96" />
      </section>

      <MemoWhite>
        {showOtpPopup && <MemoOTPPopup resend={resendOtp} onCancel={() => setShowOtpPopup(false)} onSubmit={handleSubmitOtp} isLoading={isLoading} error={error} />}
        <MemoPopUp show={showSuccessPopup} onClose={handleClosePopup} redirectUrl="/">
          <LetterIcon className="space-x-xl w-48 h-56  " />
          <h2 className="text-title font-bold mb-2">ลงทะเบียนผู้ใช้สำเร็จ</h2>
          <p className='text-body mb-4 '>กลับไปยังหน้าเลือกผู้ใช้</p>
        </MemoPopUp>

        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header font-bold text-center">ส่งคำร้องเพื่อลงทะเบียนระบบ</p>
        </section>
        <form className="flex flex-col space-y-md w-96 overflow-auto" onSubmit={handleSubmit}>
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
          <div className='flex flex-row gap-x-lg'>
            <MemoSelectHeader
              label="เพศ"
              name="gender"
              options={["หญิง", "ชาย"]}
              onChange={handleSelect}
              placeholder="เลือกเพศ"
              value={formData.gender}
              error={errors.gender}
            />

            <MemoSelectHeader
              label="ตำแหน่ง"
              name="position"
              options={["คุณครูประจำชั้น", "คุณครูฝ่ายปกครอง"]}
              error={errors.position}
              value={formData.position}
              onChange={handleSelect}
              placeholder="เลือกตำแหน่ง"
            />
          </div>

          <MemoInputHeader
            text="เบอร์โทรศัพท์"
            type="text"
            name="phoneNumber"
            placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ของคุณ"
            error={errors?.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <MemoErrorMessage error={submitStatus} />
          <div className="flex pt-lg space-x-lg">
            <Link href="/" className='flex-1'>
                  <MemoButton title="หน้าเลือกผู้ใช้" variant="ghost" />
            </Link>
            <div className='flex-1'>
              <MemoButton type='submit' title="ลงทะเบียน" />
            </div>
          </div>
        </form>
      </MemoWhite>
    </BrandingBackground>
  )
}

