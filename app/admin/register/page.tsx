import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminRegister() {
    return (
      <BrandingBackground>
          <MemoCard>
            <section className="flex flex-col items-center space-y-xl">
              <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140}/>
              <p className="text-body-1 text-header font-bold">ลงทะเบียนผู้ดูแลระบบ</p>
            </section>
            <form className="flex flex-col space-y-lg">
              <MemoInputText placeholder="รหัสประจำตัวครู"/>
              <MemoInputText placeholder="อีเมล"/>
              <MemoInputText placeholder="รหัสผ่าน"/>
              <MemoInputText placeholder="ยืนยันรหัสผ่าน"/>
              <MemoButton title="เข้าสู่ระบบ"/>
              <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
              </Link>
            </form>        
          </MemoCard>
      </BrandingBackground>
    )
  }