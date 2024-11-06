"use client"
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoCharacterCard from "@/components/container/memo-character-card";
import MemoInputText from "@/components/input/memo-input-text";
import MultiStep from "@/components/step/multi-step";
import { Color } from "@/constants/theme/color";
import { UserCircle, Warning, WarningCircle } from "@phosphor-icons/react";

export default function DesignPage() {
    return (
        <div className="w-screen h-screen flex flex-col flex-wrap items-start content-start p-8 gap-4 bg-system-white">
            <DesignBorder title="Phosphor Icons" direction="row">
                <WarningCircle weight="bold" size={32} color={Color["system-error"]}/>
                <WarningCircle weight="fill" size={32} color={Color["system-error"]}/>
                <Warning weight="bold" size={32} color={Color["system-error"]}/>
                <Warning weight="fill" size={32} color={Color["system-error"]}/>
                <UserCircle weight="bold" size={32} color={Color["body-1"]}/>
                <UserCircle weight="fill" size={32} color={Color["body-1"]}/>
                <div className="text-title-1">and much more...</div>
            </DesignBorder>
            <DesignBorder title="TextField">
                <MemoInputText placeholder="Placeholder Text" state="default" size="medium" />  {/* default */}
                <MemoInputText placeholder="Placeholder Text" state="error" />
                <MemoInputText placeholder="Placeholder Text" state="success" />
                <MemoInputText placeholder="Placeholder Text" state="disabled" />
            </DesignBorder>
            <DesignBorder title="MultiStep">
                <MultiStep step={2} steps={["สร้างบัญชีนักเรียน", "ข้อมูลนักเรียน", "ข้อมูลผู้ปกครอง"]} />
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
                <div className="w-full h-96">
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
        </div>
    )
}

// Utilities border (for design system page)
function DesignBorder({ title, children, direction = "col", bg = "none"  }: Readonly<{ 
    title: string, children: React.ReactNode, direction?: "row" | "col", bg?: "none" | "primary" | "secondary"
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
        <div className={`border-sm border-dotted border-[#9747FF] rounded-md p-4 space-y-4 w-[30rem] ${bgs[bg]}`}>
            <section className="text-[#9747FF]">{ title }</section>
            <div className={`flex ${directions[direction]} justify-center items-center gap-xl`}>
                {children}
            </div>
        </div>
    )
}