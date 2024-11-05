
interface MemoButtonProps {
  title: string
  variant?: "primary" | "secondary" | "ghost"
}

export default function MemoButton({ title, variant = "primary" }: Readonly<MemoButtonProps>) {
    const variants = {
        "primary": "bg-primary-2 text-system-white hover:bg-primary-2-hover",
        "secondary": "bg-secondary-2 text-system-white hover:bg-secondary-2-hover",
        "ghost": "inner-border-primary-2 inner-border-xsm text-primary-2 hover:bg-primary-2 hover:text-system-white",
    }
    return (
      <button className={`font-medium text-title w-full rounded-sm py-3 ${variants[variant]}`}>
        {title}
      </button> 
    )
  }