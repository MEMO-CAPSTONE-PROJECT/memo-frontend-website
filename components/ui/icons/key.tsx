import { Color } from "@/constants/theme/color";

interface KeyIconProps {
    className?: string
}

export default function KeyIcon({ className }: Readonly<KeyIconProps>) {
    return (
        <svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="119.254" cy="50.7463" r="50.7463" 
            fill={Color["secondary-2"]}/>
        <rect width="30.4478" height="162.388" rx="15.2239" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 147.811)" 
            fill={Color["secondary-2"]}/>
        <rect width="40.597" height="20.2985" rx="10.1493" transform="matrix(0.707107 0.707107 0.707107 -0.707107 -2.53711 122.407)" 
            fill={Color["secondary-2"]}/>
        <rect width="40.597" height="20.2985" rx="10.1493" transform="matrix(0.707107 0.707107 0.707107 -0.707107 17.7612 103.159)" 
            fill={Color["secondary-2"]}/>
        <circle cx="119.254" cy="50.7463" r="25.3731" 
            fill={Color["system-white"]}/>
        </svg>
    )
}
