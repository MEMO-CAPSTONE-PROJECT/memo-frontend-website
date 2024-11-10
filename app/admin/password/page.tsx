import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminResetPassword() {
    return (
      <BrandingBackground>
          <MemoCard>
            <section className="flex flex-col items-center space-y-xl">
              <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140}/>
              <p className="text-body-1 text-header font-bold">ตั้งค่ารหัสผ่านใหม่</p>
            </section>
            <form className="flex flex-col space-y-lg">
              <MemoInputText type="password" placeholder="รหัสผ่าน"/>
              <MemoInputText type="password" placeholder="ยืนยันรหัสผ่าน"/>
              <MemoButton title="ยืนยัน"/>
              <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
              </Link>
            </form>        
          </MemoCard>
      </BrandingBackground>
    )
  }