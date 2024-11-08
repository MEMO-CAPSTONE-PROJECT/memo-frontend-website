'use client';
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import MultiStep from '@/components/step/multi-step';
import React, { useState } from 'react';
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
      {step === 1 && (
        <section className="flex flex-col items-center space-y-xl">
          <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
          <p className="text-body-1 text-header font-bold">ส่งคำร้องเข้าใช้ระบบนักเรียน</p>
        </section>
      )}
      {step === 2 && (
        <section className="flex flex-col items-center space-y-xl">
          <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
          <p className="text-body-1 text-header font-bold">กรอกประวัตินักเรียน</p>
        </section>
      )}
      {step === 3 && (
        <section className="flex flex-col items-center space-y-xl">
          <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
          <p className="text-body-1 text-header font-bold">กรอกประวัติผู้ปกครอง</p>
        </section>
      )}
        <form className="flex flex-col space-y-lg" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className="flex flex-col space-y-lg">
              <MemoInputText placeholder="รหัสประจำตัวนักเรียน" />
              <MemoInputText placeholder="อีเมล" />
              <MemoInputText placeholder="รหัสผ่าน" />
              <MemoInputText placeholder="ยืนยันรหัสผ่าน" /> 
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col space-y-lg">
              <MemoInputText placeholder="ชื่อนักเรียน" />
              <MemoInputText placeholder="นามสกุลนักเรียน" />
              <MemoInputText placeholder="ชั้นเรียน" />
              <MemoInputText placeholder="ยืนยันรหัสผ่าน" /> 
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col space-y-lg">
              <MemoInputText placeholder="ชื่อผู้ปกครอง" />
              <MemoInputText placeholder="นามสกุลผู้ปกครอง" />
              <MemoInputText placeholder="เบอร์ผู้ปกครอง" />
              <MemoInputText placeholder="ความสัมพันธ์" /> 
            </div>
          )}
          
          <MemoButton title="ถัดไป" />
          <button onClick={handleNext}>ถัดไป</button>
          <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
          </Link>
        </form>
      </MemoCard>
    </BrandingBackground>
  )
}