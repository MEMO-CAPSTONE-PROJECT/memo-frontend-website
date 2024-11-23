"use client"
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoCharacterCard from "@/components/container/memo-character-card";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoInputText from "@/components/input/memo-input-text";
import MemoInputTextHelper from "@/components/input/memo-input-text-helper";
import MemoOtpInputText from "@/components/input/memo-otp-input-text";
import MemoSelectHelper from "@/components/input/memo-select-helper";
import MultiStep from "@/components/step/multi-step";
import { Color } from "@/constants/theme/color";
import { UserCircle, Warning, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function DesignPage() {
    const [step, setStep] = useState(1)
    const [error, setError] = useState<string | undefined>("Error Text")
    
    return (
        <div className="min-h-screen flex flex-wrap content-start p-8 gap-4 bg-system-white">
            <DesignBorder title="Phosphor Icons" direction="row">
                <WarningCircle weight="bold" size={32} color={Color["system-error"]}/>
                <WarningCircle weight="fill" size={32} color={Color["system-error"]}/>
                <Warning weight="bold" size={32} color={Color["system-error"]}/>
                <Warning weight="fill" size={32} color={Color["system-error"]}/>
                <UserCircle weight="bold" size={32} color={Color["body-1"]}/>
                <UserCircle weight="fill" size={32} color={Color["body-1"]}/>
                <div className="text-title-1">and much more...</div>
            </DesignBorder>
            <DesignBorder title="InputText">
                <MemoInputText placeholder="Placeholder Text" state="default" size="full" />  {/* default */}
                <MemoInputText placeholder="Placeholder Text" state="error" size="full" />
                <MemoInputText placeholder="Placeholder Text" state="success" size="full"/>
                <MemoInputText placeholder="Placeholder Text" state="disabled" size="full"/>
            </DesignBorder>
            <DesignBorder title="MultiStep">
                <MultiStep step={step} steps={["สร้างบัญชีนักเรียน", "ข้อมูลนักเรียน", "ข้อมูลผู้ปกครอง"]} />
                <MemoButton title="เพิ่มสเต็ป" variant="ghost" onClick={() => setStep(step < 3 ? step + 1 : 3)} />
                <MemoButton title="ลดสเต็ป" variant="ghost" onClick={() => setStep(step > 1 ? step - 1 : 1)} />
            </DesignBorder>
            <DesignBorder title="Button">
                <MemoButton title="เข้าสู่ระบบ" variant="primary" size="full"/>  {/* default */}
                <MemoButton title="เข้าสู่ระบบ" variant="secondary"/>
                <MemoButton title="เข้าสู่ระบบ" variant="ghost"/>
            </DesignBorder>
            <DesignBorder title="CharacterCard">
                <MemoCharacterCard title="Test Text" size="medium"/>
            </DesignBorder>
            <DesignBorder title="BrandingBackground">
                <div className="w-full h-72">
                    <BrandingBackground/>
                </div>
            </DesignBorder>
            <DesignBorder title="Card" bg="secondary">
                <MemoCard>
                    <section className="font-bold text-title-1">Card Container</section>
                    <div>
                        This is a card container box. You can put a lot of content in here!
                    </div>
                </MemoCard>
            </DesignBorder>
            <DesignBorder title="InputTextHelper & Single ErrorHelper">
                <div className="flex flex-col space-y-lg w-full">
                    <MemoButton title={error ? "ปิดแสดงเออเร่อ" : "แสดงเออเร่อ"} variant="ghost" onClick={() => setError(error ? undefined : "Error Text")} />
                    <MemoErrorMessage error={error} hideContainer={false}/>
                    <hr className="text-system-gray"/>
                    <MemoInputTextHelper placeholder="Placeholder Text" error={error} size="full" />
                    <MemoInputTextHelper placeholder="Placeholder Text" size="full"/> 
                </div>
            </DesignBorder>
            <DesignBorder title="OtpInputText" center>
                <section className="font-bold">OTP Verify</section>
                <div className="w-96 flex flex-row justify-center space-x-lg">
                    <MemoOtpInputText defaultValue="0"/>
                    <MemoOtpInputText defaultValue="1"/>
                    <MemoOtpInputText/>
                    <MemoOtpInputText/>
                </div>
            </DesignBorder>
            <DesignBorder title="SelectHelper">
                <div className="flex flex-col space-y-lg w-full">
                    <MemoButton title={error ? "ปิดแสดงเออเร่อ" : "แสดงเออเร่อ"} variant="ghost" onClick={() => setError(error ? undefined : "Error Text")} />
                    <MemoSelectHelper options={["Option 1", "Option 2", "Option 3"]} placeholder="Placeholder Text" error={error} size="full" />
                    <MemoSelectHelper options={["Option 1", "Option 2", "Option 3"]} placeholder="Placeholder Text" size="full"/>
                </div>
            </DesignBorder>
        </div>
    )
}

// Utilities border (for design system page)
function DesignBorder({ title, children, direction = "col", bg = "none", center = false  }: Readonly<{ 
    title: string, children: React.ReactNode, direction?: "row" | "col", bg?: "none" | "primary" | "secondary", center?: boolean
}>) {
    const directions = {
        row: "flex-row",
        col: "flex-col"
    }
    const bgs = {
        none: "",
        primary: "bg-primary-1",
        secondary: "bg-secondary-1",
    }
    return (
        <div className={`flex flex-col border-sm border-dotted border-[#9747FF] rounded-md p-4 space-y-4 w-[24rem] ${bgs[bg]}`}>
            <section className="text-[#9747FF] font-bold">{ title }</section>
            <div className={`flex ${directions[direction]} justify-center items-center gap-xl ${center ? "h-full justify-center items-center" : ""}`}>
                {children}
            </div>
        </div>
    )
}