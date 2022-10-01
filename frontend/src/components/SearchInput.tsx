import { ChangeEvent } from 'react'

import { MagnifyingGlass } from './MagnifyingGlass'

type Props<InputValue> = {
    value?: InputValue,
    onChange: (searchText: string) => void
}

export const SearchInput = <InputValue extends string> (
    { value, onChange }: Props<InputValue>
) => {
    const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value as InputValue

        onChange(searchValue)
    }

    return (
        <div className='bg-translucent flex p-4 w-4/12 rounded-md'>
            <button className="cursor-pointer bg-transparent">
                <MagnifyingGlass />
            </button>
            <input
                type="text"
                value={value}
                onChange={handleNameFilterChange}
                className='h-[1.5rem] border-none focus:outline-none focus:ring-0 bg-transparent'
            />
        </div>
    )
}
