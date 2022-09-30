import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Column, Table } from '../components/Table'
import { Policy } from '../types/Policy'
import { PolicyTableRow } from '../types/PolicyTableRow'
import { buildTableRowsFromPolicies, fetchActivePolicies } from './utils'

const policyColumns: Column<PolicyTableRow>[] = [
    { title: 'Name', rowKey: 'fullName' },
    { title: 'Provider', rowKey: 'provider' },
    { title: 'Type', rowKey: 'insuranceType' },
    { title: 'Status', rowKey: 'status' },
]

export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
    const [searchText, setSearchText] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handlePolicyFetch()
    }, [])

    const handlePolicyFetch = async () => {
        setIsLoading(true)

        const fetchedPolicies = await fetchActivePolicies()

        setPolicies(fetchedPolicies)
        setFilteredPolicies(fetchedPolicies)
        setIsLoading(false)
    }

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newSearchText = event.target.value.toLowerCase()
        const matchedPolicies: Policy[] = []

        setSearchText(newSearchText)

        if (newSearchText === '') {
            setFilteredPolicies(policies)
            return
        }

        for (const policy of policies) {
            const { customer: { firstName, lastName } } = policy
            const lowercasedFullName = `${firstName} ${lastName}`.toLowerCase()

            if (lowercasedFullName.includes(newSearchText)) {
                matchedPolicies.push(policy)
            }
        }

        setFilteredPolicies(matchedPolicies)
    }, [policies])

    return (
        <div>
            <Navbar />
            <div className="w-full p-8">
                <Header headerText='Policies' />
                {
                    isLoading
                        ? <div>Loading Policies</div>
                        : (
                            <div>
                                <input type="text" value={searchText} onChange={handleSearchChange} />
                                <Table
                                    columns={policyColumns}
                                    rows={buildTableRowsFromPolicies(filteredPolicies)}
                                />
                            </div>
                        )
                }
            </div>
        </div>
    )
}
