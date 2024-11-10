'use client';
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import MultiStep from '@/components/step/multi-step';
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function StudentRegistrationForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  return (
    <BrandingBackground>
      <MemoCard>
      <MultiStep step={step} steps={["สร้างบัญชีนักเรียน", "ข้อมูลนักเรียน", "ข้อมูลผู้ปกครอง"]}/>
        <form className="flex flex-col space-y-lg" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
                <p className="text-body-1 text-header font-bold ">ส่งคำร้องเข้าใช้ระบบนักเรียน</p>
              </section>
              <div className="flex flex-col space-y-lg">
                <MemoInputText placeholder="รหัสประจำตัวนักเรียน" />
                <MemoInputText placeholder="อีเมล" />
                <MemoInputText placeholder="รหัสผ่าน" />
                <MemoInputText placeholder="ยืนยันรหัสผ่าน" /> 
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
                <p className="text-body-1 text-header font-bold">กรอกประวัตินักเรียน</p>
              </section>
              <div className="flex flex-col space-y-lg">
                <MemoInputText placeholder="ชื่อนักเรียน" />
                <MemoInputText placeholder="นามสกุลนักเรียน" />
                <MemoInputText placeholder="ชั้นเรียน" />
                <MemoInputText placeholder="ยืนยันรหัสผ่าน" /> 
              </div>
            </Fragment>
          )}
          {step === 3 && (
            <Fragment>
              <section className="flex flex-col items-center space-y-xl">
                <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
                <p className="text-body-1 text-header font-bold">กรอกประวัติผู้ปกครอง</p>
              </section>
              <div className="flex flex-col space-y-xl">
                <MemoInputText type="text" placeholder="ชื่อผู้ปกครอง" />
                <MemoInputText type="text" placeholder="นามสกุลผู้ปกครอง" />
                <MemoInputText type="number" placeholder="เบอร์ผู้ปกครอง" />
                <MemoInputText type="text" placeholder="ความสัมพันธ์" /> 
              </div>
            </Fragment>
          )}
          
          <MemoButton onClick={handleNext} title="ถัดไป" />
      
          <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
          </Link>
        </form>
      </MemoCard>
    </BrandingBackground>
  )
}