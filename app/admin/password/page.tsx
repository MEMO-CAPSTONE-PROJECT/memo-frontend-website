'use client'
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoWhite from '@/components/container/memo-white';
import MemoInputText from '@/components/input/memo-input-text';
import KeyIcon from '@/components/ui/icons/key';
import Link from 'next/link';

export default function AdminResetPassword() {
  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1  h-screen ml-auto flex-col items-center justify-center space-y-xl'>
        <KeyIcon size={400} />
      </section>
      <MemoWhite>
        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header font-bold">ตั้งค่ารหัสผ่านใหม่</p>
        </section>
        <form className="flex flex-col space-y-lg">
          <MemoInputText type="password" placeholder="รหัสผ่าน" />
          <MemoInputText type="password" placeholder="ยืนยันรหัสผ่าน" />
          <MemoButton title="ยืนยัน" />
          <Link href="/">
            <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
        </form>
      </MemoWhite>
    </BrandingBackground>
  )
}
