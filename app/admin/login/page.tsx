"use client";
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoWhite from '@/components/container/memo-white';
import MemoErrorMessage from '@/components/helper/memo-error-message';
import MemoInputHeader from '@/components/input/header/memo-input-header';
import AdminIcon from '@/components/ui/icons/registration/admin';
import { MEMO_API } from '@/constants/apis';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from 'zod';

const AdminLoginSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อบัญชีผู้ใช้ก่อนเข้าสู่ระบบ" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ" }),
});

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleHome =()=>{
    router.push("/");
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setFieldErrors({ username: "", password: "" }); 

    const validation = AdminLoginSchema.safeParse({ username, password });
    if (!validation.success) {
      const errors = validation.error.formErrors.fieldErrors;
      setFieldErrors({
        username: errors.username ? errors.username[0] : "",
        password: errors.password ? errors.password[0] : "",
      });
      return; 
    }

    try {
      const response = await axios.post(MEMO_API.adminLogin, { username,password })
      // console.log(response.status);
      
      if (response.status !== 200) {
        throw new Error("Invalid username or password");
      }
      console.log("Login successful:", response.data);
      router.push("/dashboard");
    } catch (_) {
        setError("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง")
    }
  };

  return (
    <BrandingBackground>
      <section className='hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl'>
        <AdminIcon className="space-x-xl w-96 h-96" />
      </section>
      <MemoWhite>
        <section className="flex flex-col items-center space-y-xl">
          <p className="text-body-1 text-header font-bold">ลงชื่อเข้าใช้ระบบผู้ดูแล</p>
        </section>
        <form className="flex flex-col space-y-md w-96" onSubmit={handleLogin}>
            <MemoInputHeader
              text="ชื่อบัญชีผู้ใช้"
              type="text"
              name="username"
              placeholder=" กรุณาพิมพ์ชื่อบัญชีผู้ใช้"
              error={fieldErrors.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <MemoInputHeader
              text="รหัสผ่าน"
              type="password"
              name="password"
              placeholder=" กรุณาพิมพ์รหัสผ่าน"
              error={fieldErrors.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <div className='w-full justify-between flex gap-56 pt-lg'>
            <MemoErrorMessage error={error}/>
            {/* <p className='text-system-error text-[14px] justify-self-start '>{error}</p> */}
            {/* <p className='text-title-1 underline text-[14px] justify-self-end'>ลืมรหัสผ่าน</p> */}
          </div>
          <div className='flex space-x-lg'>
            <MemoButton type="button" onClick={handleHome} title="หน้าเลือกผู้ใช้" variant="ghost" />
            <MemoButton title="เข้าสู่ระบบ" type="submit"/>
          </div>
        </form>
      </MemoWhite>
    </BrandingBackground>
  )
}


