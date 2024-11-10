import { Color } from "@/constants/theme/color";

interface LockIconProps {
    className?: string
}

export default function LockIcon({ className }: Readonly<LockIconProps>) {
    return (
        <svg viewBox="0 0 60 78" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M14.75 3.82475e-07C9.91751 1.7124e-07 6 3.91751 6 8.75L6 54.8475C6 57.6509 8.27254 59.9234 11.0759 59.9234V59.9234C13.8859 59.9234 16.1612 57.6404 16.1517 54.8304L16.0169 15C16.0076 12.2413 18.2413 10 21 10V10L29.5 10L38 10V10C40.7558 10 42.9845 12.2441 42.9655 14.9999L42.6921 54.6079C42.6719 57.5376 45.0412 59.9234 47.971 59.9234V59.9234C50.8865 59.9234 53.25 57.5599 53.25 54.6444L53.25 8.75001C53.25 3.91752 49.3325 1.89412e-06 44.5 1.68289e-06L28.75 9.94434e-07L14.75 3.82475e-07Z" 
                fill={Color["system-gray"]}/>
            <rect y="24" width="60" height="54" rx="5" 
                fill={Color["secondary-1"]}/>
            <path d="M26 50.5C26 49.1193 27.1193 48 28.5 48H31.5C32.8807 48 34 49.1193 34 50.5V61.5C34 62.8807 32.8807 64 31.5 64H28.5C27.1193 64 26 62.8807 26 61.5V50.5Z"
                fill={Color["body-1"]}/>
            <circle cx="30" cy="46" r="8" 
                fill={Color["body-1"]}/>
        </svg>
    )
}
