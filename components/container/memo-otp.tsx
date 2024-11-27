import React, { useState } from 'react';
import axios from 'axios';

interface OTPVerificationPopupProps {
  emailTeacher: string;
  onClose: () => void;
  api :string;
}

const OTPVerificationPopup: React.FC<OTPVerificationPopupProps> = ({ emailTeacher, onClose,api }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      otp: otp,
      emailTeacher: emailTeacher,
    };

    try {
      const response = await axios.post(api, data);
      if (response.status === 200) {
        setMessage('OTP Verified Successfully!');
        setIsLoading(false);
      }
    } catch (error) {
        
      setMessage('Failed to verify OTP. Please try again.');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-system-white bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-semibold mb-4">OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            disabled={isLoading}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <button
          onClick={onClose}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OTPVerificationPopup;


// import BrandingBackground from "@/components/background/branding-background";
// import MemoButton from "@/components/button/memo-button";
// import MemoTextButton from "@/components/button/memo-text-button";
// import MemoWhite from '@/components/container/memo-white';
// import MemoErrorMessage from "@/components/helper/memo-error-message";
// import MemoOtpInputText from "@/components/input/memo-otp-input-text";
// import LockIcon from "@/components/ui/icons/lock-icon";
// import Link from "next/link";

// export default function OtpPage() {
//   const error = "รหัสนี้ไม่ถูกต้อง"
//   return (
//     <BrandingBackground>
//       <section className='hidden lg:flex flex-1 h-screen ml-auto flex-col items-center justify-center space-y-xl'>
//         <LockIcon size={400}  />
//       </section>
//       <MemoWhite>
//         <section className="flex flex-col items-center ">
//           <p className="text-header font-bold">ยืนยันรหัส OTP</p>
//           <p className="text-body font-regular space-y-2xl">กรุณาตรวจสอบรหัสจากอีเมลของท่าน</p>
//         </section>
//         <section className="flex flex-col space-y-xl">
//           <main className="flex flex-col items-center space-y-md">
//             <div className="flex space-x-lg">
//               <MemoOtpInputText state={error ? "error" : undefined} />
//               <MemoOtpInputText state={error ? "error" : undefined} />
//               <MemoOtpInputText state={error ? "error" : undefined} />
//               <MemoOtpInputText state={error ? "error" : undefined} />
//               <MemoOtpInputText state={error ? "error" : undefined} />
//               <MemoOtpInputText state={error ? "error" : undefined} />
//             </div>
//             <MemoErrorMessage error={error} hideContainer={false} />
//           </main>
//           <footer className="flex w-full flex-col space-y-md">
//             <div className="flex justify-between">
//               <p className="text-body-2">รหัสหมดอายุใน 02:30 นาที</p>
//               <MemoTextButton title="ส่งรหัส OTP อีกครั้ง?" />
//             </div>
//             <MemoButton title="ยืนยันรหัส OTP" variant="primary" />
//             <Link href="/">
//               <MemoButton title="ย้อนกลับไปหน้าลงทะเบียน" variant="ghost" />
//             </Link>
//           </footer>
//         </section>
//       </MemoWhite>
//     </BrandingBackground>
//   )
// }