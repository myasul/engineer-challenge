import { ChevronLeft } from './icons/ChevronLeft'
import { ChevronRight } from './icons/ChevronRight'

export const Pagination = () => {
    return (
        <div className='flex text-feather-primary'>
            <ChevronLeft size={24} />
            <ChevronRight size={24} />
        </div>
    )
}
