
import BrandingBackground from '@/components/background/branding-background';
import MemoCard from '@/components/container/memo-card';
import MemoCharacterCard from '@/components/container/memo-character-card';
import MemoImage from '@/components/container/memo-image';
import Link from "next/link";
import './globals.css';

export default function Home() {
  return (
    <BrandingBackground>
        <MemoCard>
          <section className="text-center">
            <p className='text-body-1 text-header font-bold'>กรุณาเลือกประเภทผู้ใช้</p>
            <p className='text-body-2 text-title font-semibold'>เลือกเพื่อใช้ในการเข้าสู่ระบบ</p>
          </section>
          <div className="flex flex-row gap-5xl">
            <Link href={"/admin"}>
              <MemoCharacterCard title="คุณครูผู้ดูแลระบบ">
                <MemoImage size="small" src="/Teacher-Boy-Mascot.png" alt="Teacher-Boy Mascot.png" image={{ width: 175, height: 175 }} />
              </MemoCharacterCard>
            </Link>
            <Link href={"/teacher"}>
              <MemoCharacterCard title="คุณครูทั่วไป">
                <MemoImage size="small" src="/Teacher-Girl-Mascot.png" alt="Teacher-girl Mascot.png" image={{ width: 160, height: 160 }} />
              </MemoCharacterCard>
            </Link>

            <Link href={"/student"}>
              <MemoCharacterCard title="นักเรียน">
                  <MemoImage size="small" src="/Student-girl.png" alt="Student-girl Mascot.png" image={{ width: 145, height: 145 }} />
              </MemoCharacterCard>         
            </Link>
          </div>
        </MemoCard>
    </BrandingBackground>

  )
}

