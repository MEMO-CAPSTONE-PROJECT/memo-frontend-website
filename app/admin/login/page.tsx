"use client";
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoWhite from '@/components/container/memo-white';
import AdminIcon from '@/components/ui/icons/registration/admin';
import MemoInputTextHelper from "@/components/input/memo-input-text-helper";
import {MEMO_API} from '@/constants/apis';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อบัญชีผู้ใช้ก่อนเข้าสู่ระบบ" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ" }),
});


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handlehome =()=>{
    router.push("/");
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({ username: "", password: "" }); 

    const validation = loginSchema.safeParse({ username, password });
    if (!validation.success) {
      const errors = validation.error.formErrors.fieldErrors;
      setFieldErrors({
        username: errors.username ? errors.username[0] : "",
        password: errors.password ? errors.password[0] : "",
      });
      return; 
    }

    try {
      const response = await fetch(MEMO_API.adminLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
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
        <form className="flex flex-col space-y-lg" onSubmit={handleLogin}>


          <label className="block text-lg font-medium text-body-1 mb-2">ชื่อบัญชีผู้ใช้</label>
            <MemoInputTextHelper
              type="text"
              name="username"
              placeholder=" กรุณาพิมพ์ชื่อบัญชีผู้ใช้"
              error={fieldErrors.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <label className="block text-lg font-medium text-body-1 mb-2">รหัสผ่าน</label>
          <MemoInputTextHelper
              type="text"
              name="password"
              placeholder=" กรุณาพิมพ์รหัสผ่าน"
              error={fieldErrors.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />



          <div className='justify-items-stretch flex gap-56 pt-4'>
            <p className='text-system-error text-[14px] justify-self-start '>{error}</p>
            <p className='text-title-1 underline text-[14px] justify-self-end'>ลืมรหัสผ่าน</p>
          </div>
          <div className='flex space-x-4'>
            <MemoButton title="เข้าสู่ระบบ" type="submit"/>
            <MemoButton onClick={handlehome} title="หน้าเลือกผู้ใช้" variant="ghost" />
          </div>
        </form>
      </MemoWhite>
    </BrandingBackground>
  )
}


