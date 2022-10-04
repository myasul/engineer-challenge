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

    // const handlePageNumberClick = () => {
    //     onPageNumberClick(pageNumber)
    // }


    return (
        <div className='flex text-feather-primary'>
            <button
                disabled={currentPage === 1}
                onClick={handlePrevClick}
            >
                <ChevronLeft size={24} />
            </button>
            { }
            <button
                disabled={currentPage === totalPages}
                onClick={handleNextClick}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    )
}
