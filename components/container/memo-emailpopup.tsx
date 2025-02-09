import { useCallback, useState } from "react";
import { z } from "zod";
import MemoButton from "@/components/button/memo-button";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputText from "@/components/input/memo-input-text";
import KeyIcon from "@/components/ui/icons/key";
import MemoCard from "./memo-card";

const emailSchema = z
  .string()
  .email("อีเมลไม่ถูกต้อง")
  .min(1, "กรุณากรอกอีเมลที่ใช้ลงทะเบียน")
const passwordSchema = z
  .string()
  .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
  .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่ อย่างน้อย 1 ตัว")
  .regex(/[a-z]/, "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก อย่างน้อย 1 ตัว")
  .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลข อย่างน้อย 1 ตัว")
  .regex(/[^A-Za-z0-9]/, "รหัสผ่านต้องมีอักขระพิเศษ อย่างน้อย 1 ตัว");

interface EmailVerificationPopupProps {
  onSubmit: (email: string, password: string) => void;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setLocalError(null);

      const emailValidation = emailSchema.safeParse(email);
      if (!emailValidation.success) {
        setLocalError(emailValidation.error.errors[0].message);
        return;
      }

      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        setLocalError(passwordValidation.error.errors[0].message);
        return;
      }

      if (password !== confirmPassword) {
        setLocalError("รหัสผ่านไม่ตรงกัน");
        return;
      }

      onSubmit(email, password);
    },
    [email, password, confirmPassword, onSubmit]
  );

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
      <MemoCard>
        <KeyIcon />
        <section className="flex flex-col items-center">
          <p className="text-header font-bold">เปลี่ยนรหัสผ่านใหม่</p>
          <p className="text-body font-regular space-y-2xl pb-6">
            กรุณากรอกอีเมลที่ท่านลงทะเบียนเพื่อยืนยันตัวตน และตั้งรหัสผ่านใหม่
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <MemoInputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="กรอกอีเมล"
            />
            <MemoInputText
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="รหัสผ่านใหม่"
            />
            <MemoInputText
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              state={localError || error ? "error" : undefined}
              placeholder="ยืนยันรหัสผ่าน"
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
