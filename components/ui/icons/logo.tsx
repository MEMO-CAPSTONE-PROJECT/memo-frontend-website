import { Color } from "@/constants/theme/color";

interface LogoIconProps {
    className?: string
}

export default function LogoIcon({ className }: Readonly<LogoIconProps>) {
    return (
<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
<circle cx="20.5" cy="20.502" r="20" fill={Color["secondary-2"]}/>
<circle cx="20.5003" cy="20.7689" r="13.3333" fill={Color["secondary-1"]}/>
<path d="M15.7001 28.0522H21.2001H26.7001V29.3022H20.8646H15.7001L15.7001 28.7588V28.0522Z" fill={Color["primary-2"]}/>
<rect x="14.5001" y="12.2354" width="12.2667" height="17.0667" rx="1.26316" fill={Color["primary-2"]}/>
<rect x="14.5001" y="12.2354" width="2.53333" height="17.0667" rx="1.26667" fill={Color["primary-3"]}/>
<path d="M16.1001 12.2354H17.0335V29.302H16.1001V12.2354Z" fill={Color["primary-2"]}/>
<path d="M15.8334 12.2354H16.1001V29.302H15.8334V12.2354Z" fill={Color["primary-3"]}/>
<rect x="15.7001" y="27.3022" width="11.0667" height="2" fill={Color["primary-3"]}/>
<path d="M16.1001 26.6215C16.1001 26.0401 16.5714 25.5688 17.1528 25.5688H21.0001H24.8475C25.4289 25.5688 25.9001 26.0401 25.9001 26.6215V26.9162C25.9001 27.4976 25.4289 27.9688 24.8475 27.9688H20.7012H17.1436C16.5673 27.9688 16.1001 27.5017 16.1001 26.9254V26.6215Z" fill={Color["system-white"]}/>
<path d="M17.4335 25.5688H22.1001H26.7668V27.9688H21.8154H17.4335L17.4335 26.9254V25.5688Z" fill={Color["system-white"]}/>
<rect x="23.0335" y="11.7017" width="2.26667" height="3.46667" rx="0.315789" fill={Color["secondary-2"]}/>
<path d="M23.6594 14.8609C23.5268 14.7282 23.6207 14.5015 23.8083 14.5015H25.0895C25.2058 14.5015 25.3 14.5957 25.3 14.712V15.8554C25.3 16.0333 25.093 16.131 24.9557 16.0179L24.1667 15.3681L23.6594 14.8609Z" fill={Color["secondary-2"]}/>
<path d="M24.674 14.8609C24.8066 14.7282 24.7127 14.5015 24.5251 14.5015H23.2439C23.1276 14.5015 23.0334 14.5957 23.0334 14.712V15.8554C23.0334 16.0333 23.2404 16.131 23.3777 16.0179L24.1667 15.3681L24.674 14.8609Z" fill={Color["secondary-2"]}/>
</svg>
    )
}
