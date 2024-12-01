import MemoButton from "@/components/button/memo-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoOtpInputText from "@/components/input/memo-otp-input-text";
import LockIcon from "@/components/ui/icons/lock-icon";
import { useCallback, useEffect, useState } from "react";
import MemoCard from "./memo-card";

interface OTPVerificationPopupProps {
  resend: () => void
  onSubmit: (event: React.FormEvent, otp: string) => void;
  onCancel: () => void;
  error?: string
  isLoading: boolean
}

const MemoOTPPopup: React.FC<OTPVerificationPopupProps> = ({ resend, onCancel, onSubmit, error, isLoading }) => {
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const TIMER = 30
  const [timer, setTimer] = useState(TIMER)
  const timeoutCallback = useCallback(() => setTimer(current => current - 1), [])
  const otp = otpInputs.join("");

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(timeoutCallback, 1000)
      return () => clearTimeout(timeout)
    }
  }, [timer, timeoutCallback])

  function getTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  function reset() {
    setTimer(TIMER)
    resend()
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value !== "" && index < otpInputs.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && otpInputs[index] === "" && index > 0) {
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      if (previousInput) {
        (previousInput as HTMLInputElement)?.focus();
      }
    }
  };
  return (

    <div className="z-20 fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
      <MemoCard>
        <LockIcon size={200} />
        <section className="flex flex-col items-center ">
          <p className="text-header font-bold">ยืนยันรหัส OTP</p>
          <p className="text-body font-regular space-y-2xl">กรุณาตรวจสอบรหัสจากอีเมลของท่าน</p>
        </section>
        <section className="flex flex-col space-y-xl">
          <form onSubmit={(event) => onSubmit(event, otp)} >
            <main className="flex flex-col items-center space-y-md pb-6">
              <div className="flex space-x-4">
                {otpInputs.map((input, index) => (
                  <MemoOtpInputText
                    key={input + "_" + index}
                    id={`otp-input-${index}`}
                    value={otpInputs[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOtpChange(index, e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(index, e)
                    }
                    disabled={false}
                    state={error ? "error" : undefined}
                  />
                ))}
              </div>
              <MemoErrorMessage error={error} hideContainer={false} />
            </main>
            <footer className="flex w-full flex-col space-y-md">
              <div className="flex justify-between">
                <p className="text-body-2">รหัสหมดอายุใน {getTime(timer)} นาที</p>
                <MemoTextButton onClick={reset} disabled={timer > 0} title="ส่งรหัส OTP อีกครั้ง?" />
              </div>


              <div className="flex space-x-4">
                <MemoButton title="ยกเลิก" onClick={onCancel} variant="ghost" />
                <MemoButton type="submit" disabled={isLoading} title="ยืนยันรหัส OTP" variant="primary" />
              </div>
            </footer>
          </form>
        </section>
      </MemoCard>
    </div>
  );
};

export default MemoOTPPopup;