"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoWhite from "@/components/container/memo-white";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import AdminIcon from "@/components/ui/icons/registration/admin";
import MemoEmailPopup from "@/components/container/memo-emailpopup";
import MemoOTPPopup from "@/components/container/memo-otp";
import { MEMO_API } from "@/constants/apis";

const AdminLoginSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อบัญชีผู้ใช้ก่อนเข้าสู่ระบบ" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ" }),
});

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailError, setemailError] = useState("");
  const router = useRouter();

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.log(error)
      return true; 
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    const token = localStorage.getItem("userToken");
    if (token && !isTokenExpired(token)) {
      router.push("/dashboard/user-management");
    }
  }, [router]);

  const handleHome = () => {
    router.push("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(undefined);
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
      const response = await axios.post(MEMO_API.adminLogin, { username, password });
        console.log(JSON.stringify(response.data.data.token))
      if (response.status !== 200 || !response.data.data.token) {
        throw new Error("Invalid username or password");
      }
      localStorage.setItem("userToken", response.data.data.token);
      router.push("/dashboard/user-management");
    } catch (error) {
      console.error("Login error:", error);
      setErrorLogin("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง");
    }
  };

  const handleResetPassword = async (email: string, newPassword: string) => {
    setIsLoading(true);
    setemailError(""); // ล้าง error ก่อน
    try {
      await axios.post(MEMO_API.adminResetPassword, { emailUser: email, newPassword });
      setShowEmailPopup(false);
      setOtpEmail(email);
      setShowOTPPopup(true);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setemailError("อีเมลนี้ไม่เคยลงทะเบียน"); // กำหนดข้อความ error
      } else {
        setemailError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleOTPSubmit = async (event: React.FormEvent, otp: string) => {
    event.preventDefault();
    setOtpError(""); 

    try {
      const response = await axios.post(MEMO_API.adminOtp, { otp, emailUser: otpEmail });

      if (response.status === 200) {
        setShowOTPPopup(false);
        alert("OTP ยืนยันสำเร็จ! สามารถเข้าสู่ระบบได้แล้ว");
      }
    } catch (error) {
      setOtpError(" OTP ไม่ถูกต้อง กรุณาลองใหม่");
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <BrandingBackground>
      <section className="hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl">
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
          <div className="w-full justify-between flex gap-50 pt-lg">
            <MemoErrorMessage error={errorLogin} />
            <p className="text-title-1 underline text-[14px] cursor-pointer" onClick={() => setShowEmailPopup(true)}>
              ลืมรหัสผ่าน
            </p>
          </div>
          <div className="flex space-x-lg">
            <MemoButton type="button" onClick={handleHome} title="หน้าเลือกผู้ใช้" variant="ghost" />
            <MemoButton title="เข้าสู่ระบบ" type="submit" />
          </div>
        </form>
      </MemoWhite>

      {showEmailPopup && (
        <MemoEmailPopup
          onSubmit={handleResetPassword}
          onCancel={() => setShowEmailPopup(false)}
          isLoading={isLoading}
          error={emailError}
        />
      )}

      {showOTPPopup && (
        <MemoOTPPopup
          onSubmit={handleOTPSubmit}
          onCancel={() => setShowOTPPopup(false)}
          resend={() => handleResetPassword(otpEmail, "")}
          isLoading={isLoading}
          error={otpError}
        />
      )}
    </BrandingBackground>
  );
}
