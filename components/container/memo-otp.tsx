import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoOtpInputText from "@/components/input/memo-otp-input-text";
import MemoButton from "@/components/button/memo-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoPopUp from '@/components/container/memo-popup';
import LetterIcon from '@/components/ui/icons/letter';
import LockIcon from "@/components/ui/icons/lock-icon";
import {MEMO_API} from '@/constants/apis';
import { useCallback, useEffect, useState } from "react"
import MemoCard from "./memo-card";
import axios from 'axios';

interface OTPVerificationPopupProps {
  propEmail: string;
  api :string;
  onCancel: () => void;
}

const OTPVerificationPopup: React.FC<OTPVerificationPopupProps> = ({ propEmail,api, onCancel }) => {

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [error, seterror] = useState('');

  
  const TIMER = 60
  const [timer, setTimer] = useState(TIMER)    
  const timeoutCallback = useCallback(() => setTimer(current => current - 1), [])

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
    const data = {
      otp: otp,
      [email]: propEmail,
    };
      setTimer(TIMER)
      axios.post(api, data)
  }

    let email = "";
    if (api === MEMO_API.teacherOtp) {
      email = "emailteacher"
    } else if (api === MEMO_API.studentOtp) {
      email = "emailStudent" 
    }  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      otp: otp,
      [email]: propEmail,
    };

    try {
      const response = await axios.post(api, data);
      if (response.status === 200) {
        setShowSuccesPopup(true);
        setIsLoading(false);
      }
    } catch (error) {
      seterror('true')
      setMessage('ไม่สามารถยืนยันรหัส OTP ได้ กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
      console.error(error);
    }
  };

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
        (previousInput as HTMLInputElement).focus();
      }
    }
  };
  
    const [showSuccessPopup, setShowSuccesPopup] = useState(false);

    const handleClosePopup = () => {
      setShowSuccesPopup(false);
    };

  const otp = otpInputs.join("");
  return (

  <div className="fixed inset-0 flex items-center justify-center bg-title-1 bg-opacity-80">
    <MemoCard>
    <LockIcon size={200}  />
    <section className="flex flex-col items-center ">
      <p className="text-header font-bold">ยืนยันรหัส OTP</p>
      <p className="text-body font-regular space-y-2xl">กรุณาตรวจสอบรหัสจากอีเมลของท่าน</p>
    </section>
    <section className="flex flex-col space-y-xl">
    <form onSubmit={handleSubmit} >
      <main className="flex flex-col items-center space-y-md pb-6">
      <div className="flex space-x-4">
        {otpInputs.map((input, index) => (
          <MemoOtpInputText
            key={index}
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
        <MemoErrorMessage error={message} hideContainer={false} />
      </main>
      <footer className="flex w-full flex-col space-y-md">
        <div className="flex justify-between">
          <p className="text-body-2">รหัสหมดอายุใน {getTime(timer)} นาที</p>
          <MemoTextButton onClick={reset} disabled={timer > 0} title="ส่งรหัส OTP อีกครั้ง?" />
        </div>
        
        
        <div className="flex space-x-4">
          <MemoButton title="ยกเลิก"  onClick={onCancel}  variant="ghost" />
          <MemoButton type="submit" disabled={isLoading} title="ยืนยันรหัส OTP" variant="primary"  />
        </div>
      </footer>
      </form>
    </section>
  </MemoCard>
      <MemoPopUp show={showSuccessPopup} onClose={handleClosePopup} redirectUrl="/">
        <LetterIcon className="space-x-xl w-48 h-56  " />
        <h2 className="text-title font-bold mb-2">ลงทะเบียนผู้ใช้สำเร็จ</h2>
        <p className='text-body mb-4 '>กลับไปยังหน้าเลือกผู้ใช้</p>
      </MemoPopUp>
  </div>
   );
 };

export default OTPVerificationPopup;