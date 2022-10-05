import { useState, useRef, useEffect } from "react"
import { ChevronDown } from './icons/ChevronDown'
import { Remove } from './icons/Remove'

type SelectOption<Value> = { displayedText: string | number, value: Value }

type Props<Value> = {
    placeholder: string
    options: SelectOption<Value>[]
    selectedOption?: SelectOption<Value>
    onSelectedOptionChange: (selectedOption: any) => void
    onSelectedOptionRemove: () => void
}

export const Select = <Value extends string | number> ({
    placeholder,
    options,
    selectedOption,
    onSelectedOptionChange,
    onSelectedOptionRemove
}: Props<Value>) => {
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

    const handleSelectedOptionChange = (selectedOption: Value) => {
        onSelectedOptionChange(selectedOption)
        setShowOptions(false)
    }

    const handleSelectedOptionRemove = () => {
        buttonRef?.current?.blur()
        onSelectedOptionRemove()
    }

    const handleSelectClick = () => {
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
                onClick={handleSelectClick}
                className="flex items-center justify-between w-full h-full"
                ref={buttonRef}
            >
                <div className='flex-grow text-left'>
                    {
                        selectedOption
                            ? <span className="text-feather-dark">{selectedOption.displayedText}</span>
                            : placeholder
                    }
                </div>
                <div>
                    {
                        selectedOption
                            ? (
                                <span className='text-feather-dark' onClick={handleSelectedOptionRemove}>
                                    <Remove size={24} />
                                </span>
                            )
                            : <ChevronDown size={24} />
                    }
                </div>
            </button>
            {showOptions ? (
                <ul
                    className="
                        border border-feather-border border-solid shadow-md
                        absolute list-none mt-12 rounded-md z-10 bg-white w-full
                    "
                >
                    {options.map(({ displayedText, value }) => {
                        return (
                            <li
                                className='p-2 hover:bg-feather-hover hover:text-white'
                                key={value}
                                onClick={() => handleSelectedOptionChange(value)}
                            >
                                {displayedText}
                            </li>
                        )
                    })}
                </ul>
            ) : null
            }
        </div>
    )
}
