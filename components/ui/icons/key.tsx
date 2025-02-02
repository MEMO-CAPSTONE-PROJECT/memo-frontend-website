import { Color } from "@/constants/theme/color";

interface KeyIconProps {
    className?: string
}

export default function KeyIcon({ className }: Readonly<KeyIconProps>) {
    return (
    <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="93.7985" cy="40.2562" rx="39.7015" ry="39.8561" fill={Color["secondary-2"]}/>
        <rect width="23.8673" height="127.292" rx="11.9337" transform="matrix(0.705731 0.70848 0.705731 -0.70848 0.5 116.491)" fill={Color["secondary-2"]}/>
        <rect width="31.8231" height="15.9115" rx="7.95577" transform="matrix(0.705731 0.708479 0.705731 -0.708479 -1.48511 96.5383)" fill={Color["secondary-2"]}/>
        <rect width="31.8231" height="15.9115" rx="7.95577" transform="matrix(0.705731 0.70848 0.705731 -0.70848 14.3954 81.4214)" fill={Color["secondary-2"]}/>
        <ellipse cx="93.7985" cy="40.2563" rx="19.8507" ry="19.928" fill={Color["system-white"]}/>
    </svg>
    )
}
