import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoWhite from '@/components/container/memo-white';
import MemoInputText from '@/components/input/memo-input-text';
import AdminIcon from '@/components/ui/icons/registration/admin';

import Link from 'next/link';

export default function AdminRegister() {
    return (
      <BrandingBackground>
      <section className='w-1/2 h-screen ml-auto flex flex-col items-center justify-center space-y-xl'>
          <AdminIcon className="space-x-xl w-96 h-96"/>
        </section>    
          <MemoWhite>
            <section className="flex flex-col items-center space-y-xl">
              <p className="text-body-1 text-header font-bold pb-5">ลงทะเบียนผู้ดูแลระบบ</p>
            </section>
            <form className="flex flex-col space-y-lg">
              <MemoInputText type="number" placeholder="รหัสประจำตัวครู"/>
              <MemoInputText type="email" placeholder="อีเมล"/>
              <MemoInputText type="password" placeholder="รหัสผ่าน"/>
              <MemoInputText type="password" placeholder="ยืนยันรหัสผ่าน"/>
              <MemoButton title="เข้าสู่ระบบ"/>
              <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
              </Link>
            </form>        
            </MemoWhite>
      </BrandingBackground>
    )
  }