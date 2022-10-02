import { ChangeEvent } from 'react'
import { MagnifyingGlass } from './icons/MagnifyingGlass'


type Props<InputValue> = {
    value?: InputValue
    placeholder?: string
    onChange: (searchText: string) => void
}

export const SearchInput = <InputValue extends string> (
    { value, onChange, placeholder }: Props<InputValue>
) => {const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value as InputValue

        onChange(searchValue)
    }

    return (
        // TODO:
        // 1. Add thin feather violet border when hovered.
        // 2. Make the border thicker when focused.
        <div
            className='
                bg-translucent flex py-2 px-3 w-4/12 rounded-md text-white h-12
                focus-within:bg-white transition ease-in delay-150
                focus-within:text-black cursor-pointer
            '
        >
            <button className="bg-transparent">
                <MagnifyingGlass />
            </button>
            <input
                type="text"
                value={value}
                onChange={handleNameFilterChange}
                className="ml-1 w-full border-none focus:outline-none focus:ring-0 bg-transparent placeholder-white focus:placeholder-gray-400"
                placeholder={placeholder}
            />
        </div>
    )
}
