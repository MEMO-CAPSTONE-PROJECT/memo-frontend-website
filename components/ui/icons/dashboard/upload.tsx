import { Color } from "@/constants/theme/color";

interface uploadIconIconProps {
    className?: string
}

export default function uploadIcon({ className }: Readonly<uploadIconIconProps>) { 
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={className} fill={Color["primary-2"]} viewBox="0 0 256 256"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM88,80h32v64a8,8,0,0,0,16,0V80h32a8,8,0,0,0,5.66-13.66l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,88,80Z"></path></svg>
    )
}
