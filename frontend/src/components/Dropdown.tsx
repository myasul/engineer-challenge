import { MouseEvent, FocusEvent, useState, useRef, useEffect } from "react"
import { ChevronDown } from './icons/ChevronDown'

type Props = {
    options: { key: any, value: any }[]
    selectedOption: { key: any, value: any }
    onSelectedOptionChange: (selectedOption: any) => void
}

export const Dropdown = ({ options, selectedOption, onSelectedOptionChange }: Props) => {
    const [showOptions, setShowOptions] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleDropdownClick = () => {
        setShowOptions(showOptions => !showOptions)
    }

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            console.log(event)
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    const handleSelectedOptionChange = (event: MouseEvent<HTMLLIElement>) => {
        const optionValue = event.currentTarget.innerText
        const selectedOption = options.find(option => option.value === optionValue)

        onSelectedOptionChange(selectedOption ? selectedOption.value : '')
        setShowOptions(false)
    }

    return (
        <div
            className='
                flex flex-col items-center justify-between 
                py-2 px-3 w-2/12 rounded-md h-12
                cursor-pointer relative text-white bg-translucent
                focus-within:bg-white transition ease-in delay-75
                focus-within:text-black 
            '
            ref={ref}
        >
            <button
                onClick={handleDropdownClick}
                className="flex items-center justify-between w-full h-full"
            >
                {selectedOption.value}
                <ChevronDown size={24} />
            </button>
            {showOptions ? (
                <ul
                    className="
                        border border-feather-border border-solid
                        absolute list-none mt-12 rounded-md z-10 bg-white w-full
                    "
                >
                    {options.map(({ key, value }) => {
                        return (
                            <li
                                className='p-2 hover:bg-feather-hover hover:text-white'
                                key={key}
                                onClick={handleSelectedOptionChange}
                            >
                                {value}
                            </li>
                        )
                    })}
                </ul>
            ) : null
            }
        </div>
    )
}
