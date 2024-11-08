interface MultiStepProps {
    step: number
    steps: string[]
}

export default function MultiStep({ step, steps }: Readonly<MultiStepProps>) {
    const animations = {
        default: "ease-in duration-100",
        circle: "after:ease-in after:duration-100",
        line: "before:ease-in before:duration-100"
    }
    return (
        <ul className="steps py-2 w-full">
            {steps.map((title, index) => 
                <li 
                    key={title}
                    className=
                        {`step after:!w-14 after:!h-14 after:text-title after:font-regular after:!text-system-white before:!h-sm before:!w-full 
                        ${index < step ? "after:!bg-primary-2 before:!bg-primary-2 text-primary-2" : "after:!bg-system-gray before:!bg-system-gray text-system-gray"}
                        ${animations.default} ${animations.circle} ${animations.line}
                        `}
                >
                    <span className="mt-4">{title}</span>
                </li> 
            )}
        </ul>
    )
}