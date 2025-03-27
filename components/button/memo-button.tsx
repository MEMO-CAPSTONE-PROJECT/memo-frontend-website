import { ButtonHTMLAttributes } from "react"

interface MemoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    size?: keyof MemoButtonSize
    variant?: keyof MemoButtonVariant
}

interface MemoButtonSize {
    full: string
    medium: string
    small: string
}

interface MemoButtonVariant {
    primary: string
    secondary: string
    ghost: string
    cancle: string
    cancleghost: string
    disable: string
    success:string
}

export default function MemoButton({ title, variant = "primary", size = "full", ...props }: Readonly<MemoButtonProps>) {
    const variants: MemoButtonVariant = {
        primary: "bg-primary-2 text-system-white hover:bg-primary-2-hover",
        secondary: "bg-secondary-2 text-system-white hover:bg-secondary-2-hover",
        disable: "bg-body-2 text-system-white ",
        ghost: "inner-border-primary-2 inner-border-xsm text-primary-2 hover:bg-primary-2 hover:text-system-white",
        cancle: "bg-system-error-2 text-system-white hover:bg-system-error-2-hover",
        cancleghost: "inner-border-system-error-2 inner-border-xsm text-system-error-2 hover:bg-system-error-2 hover:text-system-white",
        success:"bg-system-success-2 rounded-sm  text-system-white h-full w-full hover:bg-system-success-2-hover",
    }
    const sizes: MemoButtonSize = {
        full: "w-full",
        medium: "w-72",
        small: "w-48",
    }
    return (
      <button 
        className={`font-medium text-title rounded-sm py-3 hover:ease-in hover:duration-150 ${variants[variant]} ${sizes[size]} `}
        {...props}
        onClick={props.onClick}
      >
        {title}
      </button> 
    )
  }