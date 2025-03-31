"use client";
import BrandingBackground from '@/components/background/branding-background';
import MemoCard from '@/components/container/memo-card';
import MemoCharacterCard from '@/components/container/memo-character-card';
import MemoCharacterContainer from '@/components/container/memo-character-container';
import StudentgirlDefaultSvg from '@/components/ui/icons/mascot/student/girl-default';
import TeacherManDefaultSvg from '@/components/ui/icons/mascot/teacher/man-default';
import TeacherWomanDefaultSvg from '@/components/ui/icons/mascot/teacher/woman-default';
import Link from "next/link";
import './globals.css';

export default function Home() {
  return (
    
    <BrandingBackground>
     <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "1rem" }}>
      </div>
    </div>
        <MemoCard>
          <section className="text-center">
            <p className='text-body-1 text-header font-bold'>กรุณาเลือกประเภทผู้ใช้</p>
            <p className='text-body-2 text-title font-medium'>เลือกเพื่อใช้ในการเข้าสู่ระบบ</p>
          </section>
          <div className="flex flex-row gap-5xl">
            <Link href={"/admin/login"}>
              <MemoCharacterCard title="คุณครูผู้ดูแลระบบ">
                <MemoCharacterContainer size="small" svg={<TeacherManDefaultSvg size={175} />} />
              </MemoCharacterCard>
            </Link>
            <Link href={"/teacher"}>
              <MemoCharacterCard title="คุณครูทั่วไป">
                <MemoCharacterContainer size="small" svg={<TeacherWomanDefaultSvg size={170}/>} />
              </MemoCharacterCard>
            </Link>

            <Link href={"/student"}>
              <MemoCharacterCard title="นักเรียน">
                <MemoCharacterContainer size="small" svg={<StudentgirlDefaultSvg size={170}/>} />
              </MemoCharacterCard>         
            </Link>
          </div>
        </MemoCard>
    </BrandingBackground>

  )
}

