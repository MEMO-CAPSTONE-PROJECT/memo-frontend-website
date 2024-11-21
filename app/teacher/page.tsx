'use client';
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoInputText from '@/components/input/memo-input-text';
import MemoWhite from '@/components/container/memo-white';
import TeacherIcon from '@/components/ui/icons/registration/teacher';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  teacherId : string,
  email : string,
  password : string,
  confirmpassword : string
}

export default function TeacherRegistrationForm() {
  const mockDatabase: User[] = [];

  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [message, setMessage] = useState('');



  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacherId || !email || !password || !confirmpassword) {
      setMessage('กรุณากรอกชื่อและรหัสผ่าน');
      return;
    }

    const existingEmail = mockDatabase.find((user) => user.email === email);
    if (existingEmail) {
      setMessage('ชื่อผู้ใช้นี้มีอยู่แล้ว');
      return;
    }

    mockDatabase.push({teacherId, email, password, confirmpassword });
    setMessage('ลงทะเบียนสำเร็จ!');
    console.log(mockDatabase)

    return (
      <BrandingBackground>
      <section className='w-w-1/2 h-screen ml-auto flex flex-col items-center justify-center space-y-xl'>
          <TeacherIcon className="space-x-xl w-96 h-96"/>
        </section>    
          <MemoWhite>
            <section className="flex flex-col items-center space-y-xl">
              <Image src="/Logo-circle.png" alt="logo.png" width={140} height={140}/>
              <p className="text-body-1 text-header font-bold">ส่งคำร้องเพื่อลงทะเบียนระบบ</p>
            </section>
            <form className="flex flex-col space-y-lg">
              <MemoInputText value={teacherId} onChange={(e) => setTeacherId(e.target.value)} type="text" placeholder="รหัสประจำตัวคุณครู"/>
              <MemoInputText value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="อีเมล"/>
              <MemoInputText value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="รหัสผ่าน"/>
              <MemoInputText value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}type="password" placeholder="ยืนยันรหัสผ่าน"/>
              <MemoButton onClick={handleRegister} title="ลงทะเบียน"/>
              {message && <p>{message}</p>}
              <Link href="/">
                <MemoButton title="กลับไปยังหน้าเลือกผู้ใช้" variant="ghost"/>
              </Link>
            </form>        
            </MemoWhite>     
            </BrandingBackground>
    );
  }
  
