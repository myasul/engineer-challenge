import {  useEffect, useState } from 'react'
import { Dropdown } from '../../components/Dropdown'

import { Navbar } from '../../components/Navbar'
import { SearchInput } from '../../components/SearchInput'
import { Table } from '../../components/Table'
import { InsuranceType } from '../../types/InsuranceType'
import { Policy } from '../../types/Policy'
import { PolicyFilters } from '../../types/PolicyFilters'
import { PolicyStatus } from '../../types/PolicyStatus'
import {
    buildTableRowsFromPolicies,
    fetchOngoingPolicies,
    filterPolicies,
    policyColumns
} from './utils'

// NOTES:
// - Components are independent and decoupled.
//   You can easily use them anywhere in this codebase.

// TODO:
// - Make the data that are all caps displayed as title case
// - Change loading text to be a loading pulse same as what feather uses
// - Make it responsive
// - Implement path aliases (just @src is enough)
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

        // NOTE: This can be moved to an API class
        const fetchedPolicies = await fetchOngoingPolicies()

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

    // TODO: Fix parameter typing
    const handlePolicyStatusFilterChange = (selecetedPolicyStatus: any) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: selecetedPolicyStatus,
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setPolicyStatusFilter(selecetedPolicyStatus)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    // TODO: Fix parameter typing
    const handleInsuranceTypeFilterChange = (selectedInsuranceType: any) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: selectedInsuranceType,
            policyStatus: policyStatusFilter,
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setInsuranceTypeFilter(selectedInsuranceType)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    // TODO: Implement
    // const handleProviderFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {}    

    return (
        <div className='font-serif'>
            <div className="w-full">
                <div className="w-full shadow-md">
                    <Navbar />
                    <div className='bg-feather-primary px-16 py-6'>
                        <h1 className="text-3xl text-white mb-8">
                            Policies
                        </h1>
                        <div className='flex gap-4'>
                            <SearchInput
                                value={nameFilter}
                                onChange={handleNameFilterChange}
                                placeholder="Search policies using client's name"
                            />
                            <Dropdown
                                placeholder='Policy status'
                                options={[
                                    { key: PolicyStatus.Active, value: PolicyStatus.Active },
                                    { key: PolicyStatus.Pending, value: PolicyStatus.Pending }
                                ]}
                                onSelectedOptionChange={handlePolicyStatusFilterChange}
                                selectedOption={{ key: policyStatusFilter, value: policyStatusFilter }}
                                onSelectedOptionRemove={() => handlePolicyStatusFilterChange(undefined)}
                            />
                            <Dropdown
                                placeholder='Insurance type'
                                options={[
                                    { key: InsuranceType.Health, value: InsuranceType.Health },
                                    { key: InsuranceType.Household, value: InsuranceType.Household },
                                    { key: InsuranceType.Liability, value: InsuranceType.Liability }
                                ]}
                                selectedOption={{ key: insuranceTypeFilter, value: insuranceTypeFilter }}
                                onSelectedOptionChange={handleInsuranceTypeFilterChange}
                                onSelectedOptionRemove={() => handleInsuranceTypeFilterChange(undefined)}
                            />
                        </div>
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
                                    rowsPerPage={8}
                                />
                            )
                    }
                </div>
            </div>
        </div>
    )
}
