import { useState } from "react";
import MemoButton from "@/components/button/memo-button";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputText from "@/components/input/memo-input-text";
import KeyIcon from "@/components/ui/icons/key";
import MemoCard from "./memo-card";

interface PasswordPopupProps {
  onSubmit: (password: string) => void; // เพิ่มพารามิเตอร์ password
  onCancel: () => void;
  error?: string;
  isLoading: boolean;
  email: string;
}


const MemoPasswordPopup: React.FC<PasswordPopupProps> = ({
  onCancel,
  onSubmit,
  error,
  isLoading,
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLocalError(null);
  
    if (!password.trim() || !confirmPassword.trim()) {
      setLocalError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    if (password !== confirmPassword) {
      setLocalError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }
  
    onSubmit(password); // ส่งรหัสผ่านกลับไปที่ parent
  };
  

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
      <MemoCard>
        <KeyIcon className="space-x-xl w-45 h-53  " />
        <section className="flex flex-col items-center">
          <p className="text-header font-bold">ตั้งค่ารหัสผ่านใหม่</p>
          <p className="text-body font-regular space-y-2xl pb-6">
            กรุณาตั้งค่ารหัสผ่านใหม่
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <MemoInputText
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="กรอกรหัสผ่านใหม่"
              type="password"
            />
            <MemoInputText
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="ยืนยันรหัสผ่านใหม่"
              type="password"
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
export default MemoPasswordPopup;