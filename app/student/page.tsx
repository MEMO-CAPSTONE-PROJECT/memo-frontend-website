import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoInputText from '@/components/input/memo-input-text';
import Image from 'next/image';

export default function StudentRegistrationForm() {
  return (
    <BrandingBackground>
      <MemoCard>
        <Image src="/MultiStep.png" alt="MultiStep.png" width={340} height={340} />
        <section className="flex flex-col items-center space-y-xl">
          <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140} />
          <p className="text-body-1 text-header font-bold">ส่งคำร้องเข้าใช้ระบบนักเรียน</p>
        </section>
        <form className="flex flex-col space-y-lg">
          <MemoInputText placeholder="รหัสประจำตัวนักเรียน" />
          <MemoInputText placeholder="อีเมล" />
          <MemoInputText placeholder="รหัสผ่าน" />
          <MemoInputText placeholder="ยืนยันรหัสผ่าน" />
          <MemoButton title="ถัดไป" />
        </form>
      </MemoCard>
    </BrandingBackground>
  )
}