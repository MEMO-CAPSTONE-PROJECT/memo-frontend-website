import config from "@/next.config.js"
interface BrandingBackgroundProps {
    children?: React.ReactNode
}

export default function BrandingBackground({ children }: Readonly<BrandingBackgroundProps>) {
    return (
        <div 
            className={`bg-cover w-full h-full flex items-center justify-center`}
            style={{ backgroundImage: `url('${config.basePath}/Desktop-1.png')` }}
        >
            {children}
        </div>
    )
}