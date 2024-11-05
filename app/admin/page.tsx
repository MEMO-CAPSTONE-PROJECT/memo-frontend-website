import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import Image from 'next/image';

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
              <MemoButton title="เข้าสู่ระบบ"/>
            </form>        
          </MemoCard>
      </BrandingBackground>
    )
  }