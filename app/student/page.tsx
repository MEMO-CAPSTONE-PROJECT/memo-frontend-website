"use client";
import OTPVerificationPopup from '@/components/container/memo-otp';
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoWhite from "@/components/container/memo-white";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputTextHelper from "@/components/input/memo-input-text-helper";
import MultiStep from "@/components/step/multi-step";
import StudentIcon from "@/components/ui/icons/registration/student";
import { MEMO_API } from "@/constants/apis";
import Link from "next/link";
import { FormEvent, FormEventHandler, Fragment, useState } from "react";
import { z } from "zod";

export default function StudentRegistrationForm() {
  const step1Schema = z.object({
    displayName: z.string().min(1, "กรุณากรอกชื่อนักเรียนที่แสดงในระบบ"),
    emailStudent: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com")
      .min(1, "กรุณากรอกอีเมลของนักเรียน"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของนักเรียน"),
  });

  const step2Schema = z.object({
    firstName: z.string().min(1, "กรุณากรอกชื่อของนักเรียน"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุลของนักเรียน"),
    gender: z.string().min(1, "กรุณากรอกเพศของนักเรียน"),
    classroom: z
      .string()
      .regex(/^\d+$/, "ห้องเรียนของนักเรียนต้องเป็นตัวเลข")
      .min(1, "กรุณากรอกห้องเรียนของนักเรียน"),
    classLevel: z
      .string()
      .regex(/^\d+$/, "ชั้นเรียนของนักเรียนต้องเป็นตัวเลข")
      .min(1, "กรุณากรอกชั้นเรียนของนักเรียน"),
  });

  const step3Schema = z.object({
    phoneNumberParent: z
      .string()
      .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข")
      .length(10, "เบอร์โทรศัพท์ต้องมีจำนวน 10 หลัก")
      .min(1, "กรุณากรอกเบอร์โทรศัพท์ของผู้ปกครอง"),
    emailParent: z
      .string()
      .email("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น example@domain.com")
      .min(1, "กรุณากรอกอีเมลของผู้ปกครอง"),
    firstNameParent: z.string().min(1, "กรุณากรอกชื่อของผู้ปกครอง"),
    lastNameParent: z.string().min(1, "กรุณากรอกนามสกุลของผู้ปกครอง"),
    relation: z.string().min(1, "กรุณากรอกความสัมพันธ์ของผู้ปกครองกับนักเรียน"),
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
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
  const [parent, setParent] = useState({
    phoneNumberParent: "",
    emailParent: "",
    firstNameParent: "",
    lastNameParent: "",
    relation: "",
  });

  const validateStep = () => {
    let result;
    if (step === 1) {
      result = step1Schema.safeParse(student);
    } else if (step === 2) {
      result = step2Schema.safeParse(student);
    } else if (step === 3) {
      result = step3Schema.safeParse(parent);
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
  const MAX_STEP = 3;
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
      emailParent: parent.emailParent,
      phoneNumber: parent.phoneNumberParent,
      firstName: parent.firstNameParent,
      lastName: parent.lastNameParent,
      relation: parent.relation,
      students: [
        {
          displayName: student.displayName,
          emailStudent: student.emailStudent,
          phoneNumber: student.phoneNumber,
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
          classRoom: student.classroom,
          classLevel: student.classLevel,
        },
      ],
    };
  };
  
  const submit = async () => {
    const formData = getFormData();
    try {
      const response = await fetch(MEMO_API.studentRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setShowPopup(true);
        console.log("Registration successful:", result);
        console.log(formData);
      } else {
        const errorData = await response.json();
        console.error("Error registering students:", errorData);
        setSubmitStatus("Failed to register students. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("Network error. Please check your connection.");
    }
    
  };

  return (
    <BrandingBackground>
      <section className="hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl">
        <StudentIcon className="space-x-xl w-96 h-96" />
      </section>
      <MemoWhite>
      {showPopup && (
          <OTPVerificationPopup propEmail={student.emailStudent}   api={MEMO_API.studentOtp} />
        )}

        <div className="w-[30rem]">
          <MultiStep
            step={step}
            steps={["สร้างบัญชีนักเรียน", "ข้อมูลนักเรียน", "ข้อมูลผู้ปกครอง"]}
          />
        </div>
        <form className="flex flex-col space-y-lg" onSubmit={handleNext}>
          {step === 1 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <p className="text-body-1 text-header font-bold ">
                  ส่งคำร้องเข้าใช้ระบบนักเรียน
                </p>
              </section>
              <div className="flex flex-col space-y-lg">
                <MemoInputTextHelper
                  type="text"
                  name="displayName"
                  placeholder="ชื่อผู้ใช้ของนักเรียน"
                  error={errors.displayName}
                  value={student.displayName}
                  onChange={(e) =>
                    setStudent({ ...student, displayName: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="email"
                  name="emailStudent"
                  placeholder="อีเมลของนักเรียน"
                  error={errors.emailStudent}
                  value={student.emailStudent}
                  onChange={(e) =>
                    setStudent({ ...student, emailStudent: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="phoneNumber"
                  placeholder="เบอร์โทรศัพท์ของนักเรียน"
                  error={errors.phoneNumber}
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-x-4 flex pt-4">
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
              <div className="flex flex-col space-y-lg">
                <MemoInputTextHelper
                  type="text"
                  name="firstName"
                  placeholder="ชื่อของนักเรียน"
                  error={errors.firstName}
                  value={student.firstName}
                  onChange={(e) =>
                    setStudent({ ...student, firstName: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="lastName"
                  placeholder="นามสกุลของนักเรียน"
                  error={errors.lastName}
                  value={student.lastName}
                  onChange={(e) =>
                    setStudent({ ...student, lastName: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="gender"
                  placeholder="เพศของนักเรียน"
                  error={errors.gender}
                  value={student.gender}
                  onChange={(e) =>
                    setStudent({ ...student, gender: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="classroom"
                  placeholder="เลขห้องเรียนของนักเรียน"
                  error={errors.classroom}
                  value={student.classroom}
                  onChange={(e) =>
                    setStudent({ ...student, classroom: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type=" text"
                  name="classLevel"
                  placeholder="เลขชั้นเรียนของนักเรียน"
                  error={errors.classLevel}
                  value={student.classLevel}
                  onChange={(e) =>
                    setStudent({ ...student, classLevel: e.target.value })
                  }
                />
              </div>
              <div className="flex space-x-4">
                <MemoButton id="previous" type="button" onClick={handlePrevious} title="ย้อนกลับ" />
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
              <div className="flex flex-col space-y-lg">
                <MemoInputTextHelper
                  type="text"
                  name="firstNameParent"
                  placeholder="ชื่อของผู้ปกครอง"
                  error={errors.firstNameParent}
                  value={parent.firstNameParent}
                  onChange={(e) =>
                    setParent({ ...parent, firstNameParent: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="lastNameParent"
                  placeholder="นามสกุลของผู้ปกครอง"
                  error={errors.lastNameParent}
                  value={parent.lastNameParent}
                  onChange={(e) =>
                    setParent({ ...parent, lastNameParent: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="relation"
                  placeholder="ความสัมพันธ์ของผู้ปกครองกับนักเรียน"
                  error={errors.relation}
                  value={parent.relation}
                  onChange={(e) =>
                    setParent({ ...parent, relation: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="text"
                  name="phoneNumberParent"
                  placeholder="เบอร์โทรศัพท์ของผู้ปกครอง"
                  error={errors.phoneNumberParent}
                  value={parent.phoneNumberParent}
                  onChange={(e) =>
                    setParent({ ...parent, phoneNumberParent: e.target.value })
                  }
                />

                <MemoInputTextHelper
                  type="email"
                  name="emailParent"
                  placeholder="อีเมลของผู้ปกครอง"
                  error={errors.emailParent}
                  value={parent.emailParent}
                  onChange={(e) =>
                    setParent({ ...parent, emailParent: e.target.value })
                  }
                />
              </div>
              <MemoErrorMessage error={submitStatus} />

              <div className="flex space-x-4">
                <MemoButton onClick={handlePrevious} title="ก่อนหน้า" />
                <MemoButton type="submit"  title="ลงทะเบียน" />
              </div>
            </Fragment>
          )}
        </form>
      </MemoWhite>
    </BrandingBackground>
  );
}
