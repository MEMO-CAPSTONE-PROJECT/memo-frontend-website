import { Color } from "@/constants/theme/color";

interface CaretleftIconProps {
    className?: string
}

export default function CaretlefttIcon({ className }: Readonly<CaretleftIconProps>) { 
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={className} fill={Color["title-1"]} viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
    )
}
