import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Table } from '../components/Table'

export const PoliciesPage = () => (
    <div>
        <Navbar />
        <div className="w-full p-8">
            <Header headerText='Policies' />
            <Table />
        </div>
    </div>
)

