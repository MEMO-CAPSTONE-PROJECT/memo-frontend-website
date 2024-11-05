
interface BrandingBackgroundProps {
    children: React.ReactNode
}

export default function BrandingBackground({ children }: Readonly<BrandingBackgroundProps>) {
    return (
        <div className="bg-[url('/Desktop-1.png')] bg-cover bg-center w-screen h-screen flex items-center justify-center min-h-screen">{children}</div>
    )
}