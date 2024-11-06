import MemoButton from "@/components/button/memo-button";
import MemoCharacterCard from "@/components/container/memo-character-card";
import MemoInputText from "@/components/input/memo-input-text";
import MultiStep from "@/components/step/multi-step";

export default function DesignPage() {
    return (
        <div className="w-screen h-screen flex flex-col flex-wrap items-start content-start p-4 gap-4 bg-system-white">
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
            <DesignBorder title="Card">
                <MemoCharacterCard title="Test Text" size="medium"/>
            </DesignBorder>
        </div>
    )
}

function DesignBorder({ title, children }: Readonly<{ title: string, children: React.ReactNode }>) {
    return (
        <div className="border-sm border-dotted border-[#9747FF] rounded-md p-4 space-y-4 w-[30rem]">
            <section className="text-[#9747FF]">{ title }</section>
            <div className="flex flex-col items-center space-y-xl">
                {children}
            </div>
        </div>
    )
}