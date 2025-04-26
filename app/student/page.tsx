"use client";
import axios from "axios";
import Link from "next/link";
import { FormEvent, Fragment, useState } from "react";
import { z } from "zod";

import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoOTPPopup from '@/components/container/memo-otp';
import MemoPopUp from '@/components/container/memo-popup-time';
import MemoWhite from "@/components/container/memo-white";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import MemoSelectHeader from "@/components/input/header/memo-select-header";
import MultiStep from "@/components/step/multi-step";
import { MEMO_API } from '@/constants/apis';

import LetterIcon from '@/components/ui/icons/letter';
import StudentIcon from "@/components/ui/icons/registration/student";



const Step1Schema = z.object({
  displayName: z.string().min(1, "กรุณากรอกชื่อนักเรียนที่แสดงในระบบ"),
  emailStudent: z
    .string()
    .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com")
    .min(1, "กรุณากรอกอีเมลของนักเรียน"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
    .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
    .regex(/^0\d{9}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง")
    .min(1, "กรุณากรอกเบอร์โทรศัพท์ของนักเรียน"),
});

const Step2Schema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อของนักเรียน"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุลของนักเรียน"),
  gender: z.string().min(1, "กรุณากรอกเพศของนักเรียน"),
  classroom: z
    .string()
    .regex(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(1, "กรุณากรอกชั้นเรียนของนักเรียน"),
  classLevel: z
    .string()
    .regex(/^[4-6]$/, "ชั้นเรียนต้องเป็นตัวเลขจาก 4 ถึง 6")
    .min(1, "กรุณากรอกห้องเรียนของนักเรียน"),
    
});

const Step3Schema = z.object({
  phoneNumberParent: z
    .string()
    .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
    .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
    .regex(/^0\d{9}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง")
    .min(1, "กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง"),
  emailParent: z
    .string()
    .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com")
    .min(1, "กรุณากรอกอีเมลของผู้ปกครอง"),
  gender: z.string().min(1, "กรุณากรอกเพศของผู้ปกครอง"),
  firstNameParent: z.string().min(1, "กรุณากรอกชื่อ"),
  lastNameParent: z.string().min(1, "กรุณากรอกนามสกุล"),
  relation: z.string().min(1, "กรุณากรอกความสัมพันธ์ของผู้ปกครองกับนักเรียน"),
});

const MAX_STEP = 3;

export default function StudentRegistrationForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parent, setParent] = useState({
    phoneNumberParent: "",
    emailParent: "",
    firstNameParent: "",
    lastNameParent: "",
    relation: "",
    gender: "",
  });
  const [student, setStudent] = useState({
    displayName: "",
    emailStudent: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    classroom: "",
    classLevel: "",
  });

  const validateStep = () => {
    let result;
    if (step === 1) {
      result = Step1Schema.safeParse(student);
    } else if (step === 2) {
      result = Step2Schema.safeParse(student);
    } else if (step === 3) {
      result = Step3Schema.safeParse(parent);
    }

    if (result && !result.success) {
      const errorObj: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        errorObj[err.path[0]] = err.message;
      });
      setErrors(errorObj);
      return false;
    }

    setErrors({});
    return true;
  };
  const handleNext = (event: FormEvent) => {
    event.preventDefault();
    if (validateStep()) {
      if (step < MAX_STEP) {
        setStep(step + 1);
      } else {
        submit();
      }
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const getFormData = () => {
    return {
      role: "student",
      registerStudentData: {
        parent: {
          phoneNumber: parent.phoneNumberParent,
          emailParent: parent.emailParent,
          firstName: parent.firstNameParent,
          lastName: parent.lastNameParent,
          relation: parent.relation,
          gender: parent.gender,
        },
        student: {
          classRoom: student.classroom,
          classLevel: student.classLevel,
          displayName: student.displayName,
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
          emailStudent: student.emailStudent,
          phoneNumber: student.phoneNumber,
          parentPhoneNumber: parent.phoneNumberParent,
        },
      },
    };
  };
  

  const submit = async () => {
    // console.log(formData)
    sendForm()
  };

  const sendForm = async () => {
    setError("")
    try {
      const response = await axios.post(MEMO_API.studentRegister, getFormData());
      console.log(getFormData())
      if (response.status === 200) {
        setShowOtpPopup(true);
        setSubmitStatus("");
      } 
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("มีผู้ใช้อีเมลหรือเบอร์โทรของผู้ปกครองนี้แล้ว");
    }
  };
  
  const [showSuccessPopup, setShowSuccesPopup] = useState(false);
  const [error, setError] = useState('');

  const handleClosePopup = () => {
    setShowSuccesPopup(false);
  };
  const handleSubmitOtp = async (event: React.FormEvent, otp: string) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      otp: otp,
      email: student.emailStudent,
    };

    try {
      const response = await axios.post(MEMO_API.studentOtp, data);
      if (response.status === 200) {
        setShowOtpPopup(false)
        setShowSuccesPopup(true);
        setIsLoading(false);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      setError('ไม่สามารถยืนยันรหัส OTP ได้ กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    sendForm()
  }

  return (
    <BrandingBackground>
      <section className="hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl">
        <StudentIcon className="space-x-xl w-96 h-96" />
      </section>
      <MemoWhite>
        {showOtpPopup && <MemoOTPPopup resend={resendOtp} onCancel={() => setShowOtpPopup(false)} onSubmit={handleSubmitOtp} isLoading={isLoading} error={error} />}
        <MemoPopUp show={showSuccessPopup} onClose={handleClosePopup} redirectUrl="/">
          <LetterIcon className="space-x-xl w-48 h-56  " />
          <h2 className="text-title font-bold mb-2">ลงทะเบียนผู้ใช้สำเร็จ</h2>
          <p className='text-body mb-4 '>กลับไปยังหน้าเลือกผู้ใช้</p>
        </MemoPopUp>

        <div className="w-[30rem]">
          <MultiStep
            step={step}
            steps={["สร้างบัญชีนักเรียน", "ข้อมูลนักเรียน", "ข้อมูลผู้ปกครอง"]}
          />
        </div>
        <form className="flex flex-col space-y-md w-96" onSubmit={handleNext}>
          {step === 1 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <p className="text-body-1 text-header font-bold  ">
                  ส่งคำร้องเข้าใช้ระบบนักเรียน
                </p>
              </section>
              <div className="flex flex-col space-y-lg">
                <MemoInputHeader
                  text="ชื่อผู้ใช้"
                  type="text"
                  name="displayName"
                  placeholder="กรุณาพิมพ์ชื่อบัญชีผู้ใช้ของคุณ"
                  error={errors?.displayName}
                  value={student.displayName}
                  onChange={(e) =>
                    setStudent({ ...student, displayName: e.target.value })
                  }
                />

                <MemoInputHeader
                  text="อีเมล"
                  type="email"
                  name="emailStudent"
                  placeholder="example@domain.com"
                  error={errors?.emailStudent}
                  value={student.emailStudent}
                  onChange={(e) =>
                    setStudent({ ...student, emailStudent: e.target.value })
                  }
                />

                <MemoInputHeader
                  text="เบอร์โทรศัพท์นักเรียน"
                  type="text"
                  name="phoneNumber"
                  placeholder="กรอกเบอร์โทรศัพท์ 08X-XXX-XXXX"
                  error={errors?.phoneNumber}
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-x-lg flex pt-lg">
                <div className="w-1/2">
                  <Link href="/">
                    <MemoButton title="หน้าเลือกผู้ใช้" variant="ghost" />
                  </Link>
                </div>
                <div className="w-1/2">
                  <MemoButton type="submit" title="ถัดไป" />
                </div>
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <p className="text-body-1 text-header font-bold">
                  กรอกประวัตินักเรียน
                </p>
              </section>
              <div className="flex flex-col space-y-lg w-96">
                <MemoInputHeader
                  text="ชื่อ"
                  type="text"
                  name="firstName"
                  placeholder="กรุณาพิมพ์ชื่อของคุณ"
                  error={errors?.firstName}
                  value={student.firstName}
                  onChange={(e) =>
                    setStudent({ ...student, firstName: e.target.value })
                  }
                />

                <MemoInputHeader
                  text="นามสกุล"
                  type="text"
                  name="lastName"
                  placeholder="กรุณาพิมพ์นามสกุลของคุณ"
                  error={errors?.lastName}
                  value={student.lastName}
                  onChange={(e) =>
                    setStudent({ ...student, lastName: e.target.value })
                  }
                />

                <MemoSelectHeader
                  label="เพศ"
                  options={["หญิง", "ชาย"]}
                  name="gender"
                  placeholder="กรุณาเลือกเพศของคุณ"
                  value={student.gender}
                  error={errors?.gender}
                  size="full"
                  onChange={(e) =>
                    setStudent({ ...student, gender: e.target.value })
                  } />

              <div className="flex space-x-4">
                <MemoInputHeader
                  text="ชั้นเรียน"
                  type="text"
                  name="classLevel"
                  placeholder="กรุณาพิมพ์ชั้นเรียน"
                  error={errors?.classLevel}
                  value={student.classLevel}
                  onChange={(e) =>
                    setStudent({ ...student, classLevel: e.target.value })
                  }
                />
                
                <MemoInputHeader
                  text="ห้องเรียน"
                  type="text"
                  name="classroom"
                  placeholder="กรุณาพิมพ์ห้องเรียน"
                  error={errors?.classroom}
                  value={student.classroom}
                  onChange={(e) =>
                    setStudent({ ...student, classroom: e.target.value })
                  }
                />
              </div>

              </div>
              <div className="flex space-x-lg pt-lg">
                <MemoButton id="previous" type="button" variant="ghost" onClick={handlePrevious} title="ย้อนกลับ" />
                <MemoButton type="submit" title="ถัดไป" />
              </div>
            </Fragment>
          )}
          {step === 3 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <p className="text-body-1 text-header font-bold">
                  กรอกประวัติผู้ปกครอง
                </p>
              </section>
              <div className="flex flex-col space-y-lg w-96">
              <div className="flex gap-4">
              <div className="w-full md:w-[48%]">
                <MemoInputHeader
                  text="ชื่อผู้ปกครอง"
                  type="text"
                  name="firstNameParent"
                  placeholder="กรุณาพิมพ์ชื่อ"
                  error={errors?.firstNameParent}
                  value={parent.firstNameParent}
                  onChange={(e) =>
                    setParent({ ...parent, firstNameParent: e.target.value })
                  }
                />
            </div>
            <div className="w-full md:w-[48%]">
                <MemoInputHeader
                  text="นามสกุลผู้ปกครอง"
                  type="text"
                  name="lastNameParent"
                  placeholder="กรุณาพิมพ์นามสกุล"
                  error={errors?.lastNameParent}
                  value={parent.lastNameParent}
                  onChange={(e) =>
                    setParent({ ...parent, lastNameParent: e.target.value })
                  }
                />
              </div>
            </div>

                <MemoSelectHeader
                  label="เพศ"
                  options={["หญิง", "ชาย"]}
                  name="gender"
                  placeholder="กรุณาเลือกเพศ"
                  value={parent.gender}
                  error={errors?.gender}
                  size="full"
                  onChange={(e) =>
                    setParent({ ...parent, gender: e.target.value })
                  } />

                <MemoInputHeader
                  text="ความสัมพันธ์"
                  type="text"
                  name="relation"
                  placeholder="กรุณาพิมพ์ความสัมพันธ์"
                  error={errors?.relation}
                  value={parent.relation}
                  onChange={(e) =>
                    setParent({ ...parent, relation: e.target.value })
                  }
                />

                <MemoInputHeader
                  text="เบอร์โทรศัพท์ผู้ปกครอง"
                  type="text"
                  name="phoneNumberParent"
                  placeholder="กรุณาพิมพ์เบอร์โทรศัพท์ผู้ปกครองของคุณ"
                  error={errors?.phoneNumberParent}
                  value={parent.phoneNumberParent}
                  onChange={(e) =>
                    setParent({ ...parent, phoneNumberParent: e.target.value })
                  }
                />

                <MemoInputHeader
                  text="อีเมล์ผู้ปกครอง"
                  type="email"
                  name="emailParent"
                  placeholder="example@domain.com"
                  error={errors?.emailParent}
                  value={parent.emailParent}
                  onChange={(e) =>
                    setParent({ ...parent, emailParent: e.target.value })
                  }
                />
              </div>
              <MemoErrorMessage error={submitStatus} />
              <div className="flex space-x-lg pt-lg">
                <MemoButton onClick={handlePrevious}  variant="ghost" title="ก่อนหน้า" />
                <MemoButton type="submit" title="ลงทะเบียน" />
              </div>
            </Fragment>
          )}
        </form>
      </MemoWhite>
    </BrandingBackground>
  );
}
