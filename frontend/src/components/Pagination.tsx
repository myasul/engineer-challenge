import { ChevronLeft } from './icons/ChevronLeft'
import { ChevronRight } from './icons/ChevronRight'

type Props = {
    currentPage: number
    totalPages: number
    // TODO: Implement
    // maxPageNumbersDisplayed: number
    onPrevClick: (currentPage: number) => void
    onNextClick: (currentPage: number) => void
    onPageNumberClick: (currentPage: number) => void
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPrevClick,
    onNextClick,
    onPageNumberClick
}: Props) => {
    const handleNextClick = () => {
        const pageNumber = currentPage === totalPages ? currentPage : currentPage + 1

        onNextClick(pageNumber)
    }

    const handlePrevClick = () => {
        const pageNumber = currentPage === 1 ? currentPage : currentPage - 1

        onPrevClick(pageNumber)
    }

    const handlePageNumberClick = (pageNumber: number) => {
        onPageNumberClick(pageNumber)
    }


    return (
        <div className='flex text-feather-primary'>
            <ul className="flex gap-3">
                <button
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={handlePrevClick}
                >
                    <ChevronLeft size={24} />
                </button>
                {
                    Array(totalPages + 1).fill(undefined).flatMap((_value, index) => {
                        if (index === 0) return []

                        const className = index === currentPage
                            ? "w-6 rounded-md bg-feather-primary text-white"
                            : "w-6 text-current"

                        return (
                            <button onClick={() => handlePageNumberClick(index)}>
                                <li className={className}>{index}</li>
                            </button>
                        )
                    })
                }
                <button
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={handleNextClick}
                >
                    <ChevronRight size={24} />
                </button>
            </ul>
        </div>
    )
}
