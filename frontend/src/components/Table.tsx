import { useEffect, useState } from 'react'
import { Pagination } from './Pagination'

export type Column<Key> = {
    title: string
    rowKey: keyof Key
}

export type Props<RowType> = {
    rowsPerPage?: number
    rows: RowType[]
    columns: Column<RowType>[]
}

export const Table = <RowType extends object> ({ rows, columns, rowsPerPage = rows.length }: Props<RowType>) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataBuckets, setDataBuckets] = useState<RowType[][]>([[]])

    useEffect(() => {
        const totalPages = Math.ceil(rows.length / rowsPerPage)
        const buckets = []

        for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
            const lastRecordIndex = pageIndex * rowsPerPage
            const firstRecordIndex = lastRecordIndex - rowsPerPage

            const rowsForThisPage = rows.slice(firstRecordIndex, lastRecordIndex)

            buckets[pageIndex] = rowsForThisPage
        }

        setDataBuckets(buckets)
    }, [rows, rowsPerPage])

    const handleNextClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handlePrevClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handlePageNumberClick = (pageNumber: number) => { }

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg shadow-sm">
                        <table className="min-w-full">
                            <thead className="border-b bg-gray-100">
                                <tr>
                                    {columns.map(column => (
                                        <th
                                            key={column.rowKey.toString()}
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* NOTE: If table becomes interactive, index can be a generated UUID */}
                                {(dataBuckets[currentPage] && dataBuckets[currentPage].length > 0)
                                    ? dataBuckets[currentPage].map((row, index) => (
                                        <tr className="border-b" key={index}>
                                            {columns.map((column, index) => (
                                                <td
                                                    key={index}
                                                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                                >
                                                    {row[column.rowKey]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                    : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex align-center justify-center mt-2">
                <Pagination
                    currentPage={currentPage}
                    totalPages={dataBuckets.length - 1}
                    onNextClick={handleNextClick}
                    onPrevClick={handlePrevClick}
                    onPageNumberClick={handlePageNumberClick}
                />
            </div>
        </div>
    )
}

export default Table