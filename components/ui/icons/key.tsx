import { Color } from "@/constants/theme/color";

interface KeyIconProps {
    size?: number
}

export default function KeyIcon({ size }: Readonly<KeyIconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 503 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="251.5" cy="206.5" r="206.5"
                fill={Color["system-light-blue"]} />
            <ellipse cx="306.508" cy="154.81" rx="81.4925" ry="81.8099" fill={Color["secondary-2"]}/>
            <rect width="48.9908" height="261.284" rx="15.2239" transform="matrix(0.705731 0.70848 0.705731 -0.70848 115 311.291)"
                fill={Color["secondary-2"]} />
            <rect width="65.3211" height="32.6605" rx="10.1493" transform="matrix(0.705731 0.708479 0.705731 -0.708479 110.925 270.335)"
                fill={Color["secondary-2"]} />
            <rect width="65.3211" height="32.6605" rx="10.1493" transform="matrix(0.705731 0.70848 0.705731 -0.70848 143.522 239.307)"
                fill={Color["secondary-2"]} />
            <ellipse cx="306.507" cy="154.81" rx="40.7463" ry="40.9049"
                fill={Color["system-light-blue"]} />
        </svg>
    )
}
