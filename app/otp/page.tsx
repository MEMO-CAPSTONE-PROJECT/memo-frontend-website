import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoOtpInputText from "@/components/input/memo-otp-input-text";
import LockIcon from "@/components/ui/icons/lock-icon";
import MemoWhite from '@/components/container/memo-white';
import MemoInputText from '@/components/input/memo-input-text';
import Link from "next/link";

export default function OtpPage() {
  const error = "รหัสนี้ไม่ถูกต้อง"
  return (
    <BrandingBackground>
      <section className='w-1/2 h-screen ml-auto flex flex-col items-center justify-center space-y-xl'>
          <LockIcon className="space-x-xl w-72 h-72"/>
        </section>    
          <MemoWhite>
          <section className="flex flex-col items-center ">
            <p className="text-header font-bold">ยืนยันรหัส OTP</p>
            <p className="text-body font-regular space-y-2xl">กรุณาตรวจสอบรหัสจากอีเมลของท่าน</p>
          </section>
        <section className="flex flex-col space-y-xl">
        <main className="flex flex-col items-center space-y-md">
          <div className="flex space-x-lg">
            <MemoOtpInputText state={error ? "error" : undefined}/>
            <MemoOtpInputText state={error ? "error" : undefined}/>
            <MemoOtpInputText state={error ? "error" : undefined}/>
            <MemoOtpInputText state={error ? "error" : undefined}/>
            <MemoOtpInputText state={error ? "error" : undefined}/>
            <MemoOtpInputText state={error ? "error" : undefined}/>
          </div>
          <MemoErrorMessage error={error} hideContainer={false}/>
        </main>
        <footer className="flex w-full flex-col space-y-md">
          <div className="flex justify-between">
            <p className="text-body-2">รหัสหมดอายุใน 02:30 นาที</p>
            <MemoTextButton title="ส่งรหัส OTP อีกครั้ง?"/>
          </div>
          <MemoButton title="ยืนยันรหัส OTP" variant="primary"/>
          <Link href="/">
            <MemoButton title="ย้อนกลับไปหน้าลงทะเบียน" variant="ghost"/>
          </Link>
        </footer>
        </section>
      </MemoWhite>     
      </BrandingBackground>
  )
}