import { ChangeEvent } from 'react'
import { MagnifyingGlass } from './icons/MagnifyingGlass'

type Props<InputValue> = {
    value?: InputValue
    placeholder?: string
    onChange: (searchText: string) => void
}

// TODO
// - Add remove icon to clear filter
export const SearchInput = <InputValue extends string> (
    { value, onChange, placeholder }: Props<InputValue>
) => {

    const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value as InputValue

        onChange(searchValue)
    }

    return (
        <div
            className='
                bg-translucent flex py-2 px-3 w-3/12 rounded-md 
                text-white h-12 shadow-sm cursor-pointer
                focus-within:bg-white focus-within:text-feather-dark
                transition ease-in delay-150
            '
        >
            <div className="bg-transparent">
                <MagnifyingGlass />
            </div>
            <input
                className="
                    ml-1 w-full border-none bg-transparent placeholder-white
                    focus:outline-none focus:ring-0 focus:placeholder-gray-400
                "
                type="text"
                value={value}
                onChange={handleNameFilterChange}
                placeholder={placeholder}
            />
        </div>
    )
}
