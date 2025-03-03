export const ChevronLeft = ({ size = 30 }: { size?: number }) => (
    <div aria-label='chevron left icon'>
        <svg
            width={size}
            height={size}
            className="fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill-rule="evenodd" d="M16,21 C15.744,21 15.488,20.902 15.293,20.707 L7.293,12.707 C6.902,12.316 6.902,11.684 7.293,11.293 L15.293,3.293 C15.684,2.902 16.316,2.902 16.707,3.293 C17.098,3.684 17.098,4.316 16.707,4.707 L9.414,12 L16.707,19.293 C17.098,19.684 17.098,20.316 16.707,20.707 C16.512,20.902 16.256,21 16,21" />
        </svg>
    </div>
)