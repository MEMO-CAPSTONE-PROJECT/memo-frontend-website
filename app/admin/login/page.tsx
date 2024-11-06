import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
    return (
      <BrandingBackground>
          <MemoCard>
            <section className="flex flex-col items-center space-y-xl">
              <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140}/>
              <p className="text-body-1 text-header font-bold">ลงชื่อเข้าใช้ระบบผู้ดูแล</p>
            </section>
            <form className="flex flex-col space-y-lg">
              <MemoInputText placeholder="รหัสประจำตัวครู"/>
              <MemoInputText placeholder="รหัสผ่าน"/>
              <div className='justify-items-stretch flex gap-56 pt-4'>
                <p className='text-system-error text-[14px] justify-self-start '>รหัสผ่านไม่ถูกต้อง</p>
                <Link href="/admin/password"><p className='text-title-1 underline text-[14px] justify-self-end'>ลืมรหัสผ่าน</p></Link>
              </div>
              <MemoButton title="เข้าสู่ระบบ"/>
              <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
              </Link>
            </form>        
          </MemoCard>
      </BrandingBackground>
    )
  }