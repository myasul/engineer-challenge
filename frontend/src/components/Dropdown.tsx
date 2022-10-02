import { MouseEvent, useState, useRef, useEffect } from "react"
import { ChevronDown } from './icons/ChevronDown'
import { Remove } from './icons/Remove'

type Props = {
    placeholder: string
    // TODO: 
    // - Fix typing to use generics
    // - use `value` and `displayedText` as options
    options: { key: any, value: any }[]
    selectedOption: { key: any, value: any }
    onSelectedOptionChange: (selectedOption: any) => void
    onSelectedOptionRemove: () => void
}

export const Dropdown = ({
    placeholder,
    options,
    selectedOption,
    onSelectedOptionChange,
    onSelectedOptionRemove
}: Props) => {
    const [showOptions, setShowOptions] = useState(false)
    const dropdownContainerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (
                dropdownContainerRef.current &&
                // @ts-ignore
                !dropdownContainerRef.current.contains(event.target)
            ) {
                setShowOptions(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => window.removeEventListener('click', handleClickOutside)
    }, [dropdownContainerRef])

    const handleSelectedOptionChange = (event: MouseEvent<HTMLLIElement>) => {
        const optionValue = event.currentTarget.innerText
        const selectedOption = options.find(option => option.value === optionValue)

        onSelectedOptionChange(selectedOption ? selectedOption.value : '')
        setShowOptions(false)
    }

    const handleSelectedOptionRemove = () => {
        buttonRef?.current?.blur()
        onSelectedOptionRemove()
    }

    const handleDropdownClick = () => {
        setShowOptions(showOptions => !showOptions)
    }

    return (
        <div
            className='
                flex flex-col items-center justify-between 
                py-2 px-3 w-2/12 rounded-md h-12 shadow-sm
                cursor-pointer relative text-white bg-translucent
                focus-within:bg-white transition ease-in delay-75
                focus-within:text-feather-dark hover:bg-feather-hover
            '
            ref={dropdownContainerRef}
        >
            <button
                onClick={handleDropdownClick}
                className="flex items-center justify-between w-full h-full"
                ref={buttonRef}
            >
                <div className='flex-grow text-left'>
                    {selectedOption.value
                        // TODO: Test if the text color here can be removed
                        ? <span className="text-feather-dark">{selectedOption.value}</span>
                        : <span className="">{placeholder}</span>
                    }
                </div>
                {
                    selectedOption.value
                        // TODO: Change this so that the icon is wrapped rather than
                        // have classes and event handlers
                        ? <Remove className='text-feather-dark' size={24} onClick={handleSelectedOptionRemove} />
                        : <ChevronDown size={24} />
                }
            </button>
            {showOptions ? (
                <ul
                    className="
                        border border-feather-border border-solid shadow-md
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
