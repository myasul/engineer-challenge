export const ChevronDown = ({ size = 30 }: { size?: number }) => (
    <div aria-label='chevron down icon'>
        <svg
            className='stroke-current'
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill='none'
        >
            <path d="M4 9L12 17L20 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
)