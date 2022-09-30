export type Column<Key> = {
    title: string
    rowKey: keyof Key
}

export type Props<RowType> = {
    rows: RowType[]
    columns: Column<RowType>[]
}

export const Table = <RowType extends object> ({ rows, columns }: Props<RowType>) => (
    <div className="flex flex-col">
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
                            {/* TODO: Install `uuid` and use it instead of index */}
                            {rows.map((row, index) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
)

export default Table