import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoWhite from '@/components/container/memo-white';
import MemoInputText from '@/components/input/memo-input-text';
import AdminIcon from '@/components/ui/icons/registration/admin';
import Link from 'next/link';

export default function AdminLogin() {
  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl'>
        <AdminIcon className="space-x-xl w-96 h-96" />
      </section>
      <MemoWhite>
        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header font-bold">ลงชื่อเข้าใช้ระบบผู้ดูแล</p>
        </section>
        <form className="flex flex-col space-y-lg">
          <MemoInputText type="number" placeholder="รหัสประจำตัวครู" />
          <MemoInputText type="password" placeholder="รหัสผ่าน" />
          <div className='justify-items-stretch flex gap-56 pt-4'>
            <p className='text-system-error text-[14px] justify-self-start '>รหัสผ่านไม่ถูกต้อง</p>
            <Link href="/admin/password"><p className='text-title-1 underline text-[14px] justify-self-end'>ลืมรหัสผ่าน</p></Link>
          </div>
          <MemoButton title="เข้าสู่ระบบ" />
          <Link href="/">
            <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost" />
          </Link>
        </form>
      </MemoWhite>
    </BrandingBackground>
  )
}