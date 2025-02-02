// import { useCallback, useState } from "react";
// import MemoButton from "@/components/button/memo-button";
// import MemoErrorMessage from "@/components/helper/memo-error-message";
// import MemoInputText from "@/components/input/memo-input-text";
// import KeyIcon from "@/components/ui/icons/key";
// import MemoCard from "./memo-card";

// interface EmailVerificationPopupProps {
//   onSubmit: (otp: string) => void;
//   onCancel: () => void;
//   checkEmailRegistered: (email: string) => Promise<boolean>; // ฟังก์ชันสำหรับตรวจสอบอีเมล
//   error?: string;
//   isLoading: boolean;
// }

// const MemoEmailPopup: React.FC<EmailVerificationPopupProps> = ({
//   onCancel,
//   onSubmit,
//   checkEmailRegistered,
//   error,
//   isLoading,
// }) => {
//   const [email, setEmail] = useState<string>("");
//   const [localError, setLocalError] = useState<string | null>(null);

//   const handleSubmit = useCallback(
//     async (event: React.FormEvent) => {
//       event.preventDefault();
//       setLocalError(null);

//       if (!email) {
//         setLocalError("กรุณากรอกอีเมล");
//         return;
//       }

//       try {
//         const isRegistered = await checkEmailRegistered(email);
//         if (isRegistered) {
//           onSubmit(email); // ส่ง email ไปที่ popup OTP
//         } else {
//           setLocalError("อีเมลนี้ไม่ได้ลงทะเบียนไว้");
//         }
//       } catch (err) {
//         setLocalError("เกิดข้อผิดพลาดในการตรวจสอบอีเมล");
//       }
//     },
//     [email, checkEmailRegistered, onSubmit]
//   );

//   return (
//     <div className="z-20 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
//       <MemoCard>
//       <KeyIcon size={200} />
//         <section className="flex flex-col items-center">
//           <p className="text-header font-bold">เปลี่ยนรหัสผ่านใหม่</p>
//           <p className="text-body font-regular space-y-2xl pb-6">กรุณากรอกอีเมลที่ท่านลงทะเบียนเพื่อยืนยันตัวตน</p>
//           <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 ">
//             <MemoInputText
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               state={localError || error ? "error" : undefined}
//               placeholder="กรอกอีเมล"
//             />

//             <footer className="flex w-full flex-col space-y-md ">
//             <div className="flex justify-between ">
//               <MemoErrorMessage error={localError || error} />
//               </div>
//               <div className="flex space-x-4">
//                 <MemoButton title="ยกเลิก" onClick={onCancel} variant="ghost" />
//                 <MemoButton type="submit" disabled={isLoading} title="ยืนยัน" variant="primary" />
//               </div>
//             </footer>
//           </form>
//         </section>
//       </MemoCard>
//     </div>
//   );
// };

// export default MemoEmailPopup;



import { useCallback, useState } from "react";
import MemoButton from "@/components/button/memo-button";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputText from "@/components/input/memo-input-text";
import KeyIcon from "@/components/ui/icons/key";
import MemoCard from "./memo-card";

interface EmailVerificationPopupProps {
  onSubmit: (email: string) => void; // ส่ง email ที่กรอกไปยังหน้า login
  onCancel: () => void;
  error?: string;
  isLoading: boolean;
}

const MemoEmailPopup: React.FC<EmailVerificationPopupProps> = ({
  onCancel,
  onSubmit,
  error,
  isLoading,
}) => {
  const [email, setEmail] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setLocalError(null);

      if (!email.trim()) {
        setLocalError("กรุณากรอกอีเมล");
        return;
      }

      // ส่งอีเมลไปยัง callback onSubmit
      onSubmit(email);
    },
    [email, onSubmit]
  );

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
      <MemoCard>
        <KeyIcon size={200} />
        <section className="flex flex-col items-center">
          <p className="text-header font-bold">เปลี่ยนรหัสผ่านใหม่</p>
          <p className="text-body font-regular space-y-2xl pb-6">
            กรุณากรอกอีเมลที่ท่านลงทะเบียนเพื่อยืนยันตัวตน
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <MemoInputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="กรอกอีเมล"
            />
            <footer className="flex w-full flex-col space-y-md">
              <div className="flex justify-between">
                <MemoErrorMessage error={localError || error} />
              </div>
              <div className="flex space-x-4">
                <MemoButton title="ยกเลิก" onClick={onCancel} variant="ghost" />
                <MemoButton type="submit" disabled={isLoading} title="ยืนยัน" variant="primary" />
              </div>
            </footer>
          </form>
        </section>
      </MemoCard>
    </div>
  );
};

export default MemoEmailPopup;
