


// "use client";

// import BrandingBackground from "@/components/background/branding-background";
// import MemoButton from "@/components/button/memo-button";
// import MemoWhite from "@/components/container/memo-white";
// import MemoErrorMessage from "@/components/helper/memo-error-message";
// import MemoInputHeader from "@/components/input/header/memo-input-header";
// import AdminIcon from "@/components/ui/icons/registration/admin";
// import MemoEmailPopup from "@/components/container/memo-emailpopup";
// import { MEMO_API } from "@/constants/apis";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { z } from "zod";

// const AdminLoginSchema = z.object({
//   username: z.string().min(1, { message: "กรุณากรอกชื่อบัญชีผู้ใช้ก่อนเข้าสู่ระบบ" }),
//   password: z.string().min(1, { message: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ" }),
// });

// export default function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | undefined>(undefined);
//   const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
//   const router = useRouter();

//   const [showPopup, setShowPopup] = useState<boolean>(false); // ซ่อน popup เริ่มต้น

//   const handleHome = () => {
//     router.push("/");
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(undefined);
//     setFieldErrors({ username: "", password: "" });

//     const validation = AdminLoginSchema.safeParse({ username, password });
//     if (!validation.success) {
//       const errors = validation.error.formErrors.fieldErrors;
//       setFieldErrors({
//         username: errors.username ? errors.username[0] : "",
//         password: errors.password ? errors.password[0] : "",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(MEMO_API.adminLogin, { username, password });

//       if (response.status !== 200) {
//         throw new Error("Invalid username or password");
//       }
//       console.log("Login successful:", response.data);
//       router.push("/dashboard");
//     } catch (error) {
//       console.log(error);
//       setError("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง");
//     }
//   };

//   const checkEmailRegistered = async (email: string): Promise<boolean> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(email === "example@test.com"); // จำลองการตรวจสอบอีเมล
//       }, 1000);
//     });
//   };

//   const handleEmailSubmit = (email: string) => {
//     console.log("OTP popup triggered for email:", email);
//     setShowPopup(false); // ซ่อน popup หลังจากตรวจสอบอีเมล
//   };

//   const handleCancel = () => {
//     console.log("Popup cancelled");
//     setShowPopup(false); // ซ่อน popup เมื่อกดยกเลิก
//   };

//   return (
//     <BrandingBackground>
//       <section className="hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl">
//         <AdminIcon className="space-x-xl w-96 h-96" />
//       </section>

//       <MemoWhite>
//         <section className="flex flex-col items-center space-y-xl">
//           <p className="text-body-1 text-header font-bold">ลงชื่อเข้าใช้ระบบผู้ดูแล</p>
//         </section>

//         <form className="flex flex-col space-y-md w-96" onSubmit={handleLogin}>
//           <MemoInputHeader
//             text="ชื่อบัญชีผู้ใช้"
//             type="text"
//             name="username"
//             placeholder=" กรุณาพิมพ์ชื่อบัญชีผู้ใช้"
//             error={fieldErrors.username}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <MemoInputHeader
//             text="รหัสผ่าน"
//             type="password"
//             name="password"
//             placeholder=" กรุณาพิมพ์รหัสผ่าน"
//             error={fieldErrors.password}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="w-full justify-between flex gap-56 pt-lg">
//             <MemoErrorMessage error={error} />
//             <p
//               className="text-title-1 underline text-[14px] cursor-pointer"
//               onClick={() => setShowPopup(true)} // กดแล้วแสดง popup
//             >
//               ลืมรหัสผ่าน
//             </p>
//           </div>
//           <div className="flex space-x-lg">
//             <MemoButton type="button" onClick={handleHome} title="หน้าเลือกผู้ใช้" variant="ghost" />
//             <MemoButton title="เข้าสู่ระบบ" type="submit" />
//           </div>
//         </form>
//       </MemoWhite>

//       {showPopup && (
//         <MemoEmailPopup
//           onSubmit={handleEmailSubmit}
//           onCancel={handleCancel}
//           checkEmailRegistered={checkEmailRegistered}
//           isLoading={false} // เปลี่ยนเป็น true ระหว่างรอการตรวจสอบ
//         />
//       )}
//     </BrandingBackground>
//   );
// }

"use client";

import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoWhite from "@/components/container/memo-white";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputHeader from "@/components/input/header/memo-input-header";
import AdminIcon from "@/components/ui/icons/registration/admin";
import MemoEmailPopup from "@/components/container/memo-emailpopup";
import MemoPopUp from '@/components/container/memo-popup';
import MemoOTPPopup from "@/components/container/memo-otp";
import MemoPasswordPopup from "@/components/container/memo-resetpassword";
import KeyIcon from "@/components/ui/icons/key";
import { MEMO_API } from "@/constants/apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const AdminLoginSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อบัญชีผู้ใช้ก่อนเข้าสู่ระบบ" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ" }),
});

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // เก็บ email สำหรับ OTP
  const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
  const [errorOtp, setErrorOtp] = useState<string | undefined>(undefined);
  const [errorEmail, setErrorEmail] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showSuccessPopup, setShowSuccesPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(undefined); // Clear previous login errors
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

      if (response.status !== 200) {
        throw new Error("Invalid username or password");
      }
      console.log("Login successful:", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorLogin("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง");
    }
  };

  const checkEmailRegistered = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(MEMO_API.studentOtp, { email });
      setIsLoading(false);
      return response.status === 200;
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setErrorEmail(undefined); 
    setErrorOtp(undefined);
    const isRegistered = await checkEmailRegistered(email);
    if (isRegistered) {
      setEmail(email);
      setShowEmailPopup(false);
      setShowOtpPopup(true);
    } else {
      setShowEmailPopup(false);
      setShowOtpPopup(true);
      setErrorEmail("อีเมลนี้ไม่ได้ลงทะเบียน");
    }
  };

  const handleSubmitOtp = async (event: React.FormEvent, otp: string) => {
    event.preventDefault();
    setErrorOtp(undefined); 
    setIsLoading(true);

    try {
      const response = await axios.post(MEMO_API.adminOtp, { email, otp });
      if (response.status === 200) {
        alert("OTP ยืนยันสำเร็จ!");
        setShowOtpPopup(false);
        setShowPasswordPopup(true); // แสดง popup ตั้งรหัสผ่านใหม่
      }
    } catch (error) {
      setShowOtpPopup(false);
      setShowPasswordPopup(true); 
      console.error("Error verifying OTP:", error);
      setErrorOtp("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(MEMO_API.adminOtp, { email });
      alert("ส่ง OTP ใหม่แล้ว");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("ไม่สามารถส่ง OTP ได้");
    }
  };

  const handleResetPassword = async (password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(MEMO_API.studentOtp, { email, password });
      if (response.status === 200) {
        alert("ตั้งค่ารหัสผ่านใหม่สำเร็จ!");
        // setShowPasswordPopup(false);
        // setShowSuccesPopup(true);
      } else {
        throw new Error("เกิดข้อผิดพลาดในการตั้งค่ารหัสผ่าน");
      }
    } catch (error) {
      setShowPasswordPopup(false);
      setShowSuccesPopup(true);
      console.error("Error resetting password:", error);
      alert("ไม่สามารถตั้งค่ารหัสผ่านใหม่ได้");

    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccesPopup(false);
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
            <p className="text-title-1 underline text-[14px] cursor-pointer" onClick={() => { setErrorEmail(undefined); setShowEmailPopup(true); }}>
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
          onSubmit={handleEmailSubmit}
          onCancel={() => setShowEmailPopup(false)}
          isLoading={isLoading}
          error={errorEmail}
        />
      )}

      {showOtpPopup && (
        <MemoOTPPopup
          resend={resendOtp}
          onCancel={() => setShowOtpPopup(false)}
          onSubmit={handleSubmitOtp}
          isLoading={isLoading}
          error={errorOtp}
        />
      )}

        {showPasswordPopup && (
          <MemoPasswordPopup
            email={email} // เพิ่ม email ที่ได้จาก state
            onSubmit={handleResetPassword}
            onCancel={() => setShowPasswordPopup(false)}
            isLoading={isLoading}
          />
        )}

          
          <MemoPopUp show={showSuccessPopup} onClose={handleClosePopup} redirectUrl="/admin/login">
            <KeyIcon className="space-x-xl w-45 h-53 pb-4 mt-4" /> 
            <h2 className="text-title font-bold mb-2">แก้ไขรหัสผ่านสำเร็จ</h2>
            <p className='text-body  '>กลับไปยังหน้าลงชื่อเข้าใช้งาน</p>
          </MemoPopUp>

    </BrandingBackground>
  );
}

