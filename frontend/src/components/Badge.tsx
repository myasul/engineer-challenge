export type BadgeProps = {
    text: string
    textColor: string
    backgroundColor: string
}

export const Badge = ({ text, textColor, backgroundColor }: BadgeProps) => (
    <p
        className={`
            ${textColor} ${backgroundColor} font-semibold
            inline-block rounded-full shadow-sm py-1 px-4 text-xs 
        `}
    >
        {text}
    </p>
)
