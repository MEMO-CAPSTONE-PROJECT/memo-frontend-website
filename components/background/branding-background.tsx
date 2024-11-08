import { Color } from "@/constants/theme/color"

interface BrandingBackgroundProps {
    variant?: keyof BrandingBackgroundVariant
    children?: React.ReactNode
}

interface BrandingBackgroundVariant {
    primary: string
    secondary: string
}

const BackgroundSvg = (variant: keyof BrandingBackgroundVariant) => {
    const variants = {
        primary: {
            rect: Color["primary-2"].replace("#", "%23"),  // Encoding '#' for URL
            circle: Color["primary-3"].replace("#", "%23")
        },
        secondary: {
            rect: Color["secondary-1"].replace("#", "%23"),
            circle: Color["secondary-2"].replace("#", "%23")
        },
    }
    const box = variants[variant]
    
    return `<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(%23clip0_1190_3621)">
                    <rect width="1440" height="1024" fill="${box.rect}"/>
                    <circle opacity="0.2" cx="828" cy="-70" r="219" stroke="${box.circle}" stroke-width="150"/>
                    <circle opacity="0.2" cx="1479" cy="809" r="219" stroke="${box.circle}" stroke-width="150"/>
                    <circle opacity="0.2" cx="89" cy="1168" r="219" stroke="${box.circle}" stroke-width="150"/>
                    <circle opacity="0.2" cx="51" cy="34" r="219" stroke="${box.circle}" stroke-width="150"/>
                </g>
                <defs>
                    <clipPath id="clip0_1190_3621"><rect width="1440" height="1024" fill="white"/></clipPath>
                </defs>
            </svg>`;
}

export default function BrandingBackground({ children, variant = "secondary" }: Readonly<BrandingBackgroundProps>) {
    const svg = BackgroundSvg(variant).replace(/[\n\r\t]/gm, "")
    return (
        <div 
            className={`bg-cover w-full h-full flex items-center justify-center overflow-clip`}
            style={{ backgroundImage: `url('data:image/svg+xml,${svg}')` }}
        >
            {children}
        </div>
    )
}
