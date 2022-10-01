import { ChangeEvent, useEffect, useState } from 'react'

import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { SearchInput } from '../components/SearchInput'
import { Table } from '../components/Table'
import { InsuranceType } from '../types/InsuranceType'
import { Policy } from '../types/Policy'
import { PolicyStatus } from '../types/PolicyStatus'
import {
    buildTableRowsFromPolicies,
    fetchActivePolicies,
    filterPolicies,
    PolicyFilters,
    policyColumns
} from './utils'

export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
    const [nameFilter, setNameFilter] = useState<string>()
    const [policyStatusFilter, setPolicyStatusFilter] = useState<PolicyStatus>()
    const [insuranceTypeFilter, setInsuranceTypeFilter] = useState<InsuranceType>()
    // Add a smoother loading experience
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

    const handleNameFilterChange = (updatedNameFilter: string) => {
        const lowercasedNameFilter = updatedNameFilter.toLowerCase()

        const filters: PolicyFilters = {
            name: lowercasedNameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: policyStatusFilter,
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setNameFilter(lowercasedNameFilter)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    const handlePolicyStatusFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedPolicyStatusFilter = event.target.value as PolicyStatus

        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: updatedPolicyStatusFilter,
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setPolicyStatusFilter(updatedPolicyStatusFilter)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    const handleInsuranceTypeFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedInsuranceTypeFilter = event.target.value as InsuranceType

        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: updatedInsuranceTypeFilter,
            policyStatus: policyStatusFilter,
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setInsuranceTypeFilter(updatedInsuranceTypeFilter)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    // TODO: Implement
    // const handleProviderFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {}    

    return (
        <div className='font-serif'>
            <div className="w-full">
                <Navbar />
                <div className='bg-feather px-16 py-6'>
                    <Header headerText='Policies' />
                    <div className='flex gap-4'>
                        <SearchInput
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            placeholder="Search policies using client's name"
                        />
                        {/* TODO: 
                            - Pull out to a separate component
                            - Add label/placeholder
                            - Add x icon to remove selected option
                            - Add magnifying glass icon
                         */}
                        <select value={policyStatusFilter} onChange={handlePolicyStatusFilterChange}>
                            <option value={PolicyStatus.Active}>{PolicyStatus.Active}</option>
                            <option value={PolicyStatus.Pending}>{PolicyStatus.Pending}</option>
                        </select>
                        <select value={insuranceTypeFilter} onChange={handleInsuranceTypeFilterChange}>
                            <option value={InsuranceType.Health}>{InsuranceType.Health}</option>
                            <option value={InsuranceType.Household}>{InsuranceType.Household}</option>
                            <option value={InsuranceType.Liability}>{InsuranceType.Liability}</option>
                        </select>
                    </div>
                </div>
                <div className='px-16 py-8'>
                    {
                        isLoading
                            ? <div>Loading Policies</div>
                            : (
                                <Table
                                    columns={policyColumns}
                                    rows={buildTableRowsFromPolicies(filteredPolicies)}
                                />
                            )
                    }
                </div>
            </div>
        </div>
    )
}
