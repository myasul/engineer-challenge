import { useEffect, useState } from 'react'
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
    policyColumns,
    toTitleCase
} from './utils'

// NOTES:
// - Components are independent and decoupled.
//   You can easily use them anywhere in this codebase.

// TODO:
// - Make the data that are all caps displayed as title case
// - Change loading text to be a loading pulse same as what feather uses
// - Make it responsive (Currently the app's styling is ruined in mobile)
// - Implement path aliases (just @src is enough)
export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [providers, setProviders] = useState<string[]>([])
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
    const [nameFilter, setNameFilter] = useState<string>()
    const [providerFilter, setProviderFilter] = useState<string>()
    const [insuranceTypeFilter, setInsuranceTypeFilter] = useState<InsuranceType>()
    const [policyStatusFilter, setPolicyStatusFilter] = useState<PolicyStatus>()
    // Add a smoother loading experience
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handlePolicyFetch()
    }, [])

    const handlePolicyFetch = async () => {
        setIsLoading(true)

        // NOTE: This can be moved to an API class
        const fetchedPolicies = await fetchOngoingPolicies()

        const providers = fetchedPolicies.map(policy => policy.provider)
        const providerSet = new Set(providers)

        setPolicies(fetchedPolicies)
        setProviders(Array.from(providerSet))
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

    const handlePolicyStatusFilterChange = (selecetedPolicyStatus?: PolicyStatus) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: selecetedPolicyStatus,
            provider: providerFilter
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setPolicyStatusFilter(selecetedPolicyStatus)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    const handleInsuranceTypeFilterChange = (selectedInsuranceType?: InsuranceType) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: selectedInsuranceType,
            policyStatus: policyStatusFilter,
            provider: providerFilter
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setInsuranceTypeFilter(selectedInsuranceType)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    const handleProviderFilterChange = (provider?: string) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: policyStatusFilter,
            provider: provider
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setProviderFilter(provider)
        setFilteredPolicies(updatedFilteredPolicies)
    }    

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
                                placeholder='Provider'
                                onSelectedOptionChange={handleProviderFilterChange}
                                onSelectedOptionRemove={() => handleProviderFilterChange(undefined)}
                                options={providers.map(provider => ({ displayedText: provider, value: provider }))}
                                selectedOption={
                                    providerFilter
                                        ? { displayedText: providerFilter, value: providerFilter }
                                        : undefined
                                }
                            />
                            <Dropdown
                                placeholder='Insurance type'
                                onSelectedOptionChange={handleInsuranceTypeFilterChange}
                                onSelectedOptionRemove={() => handleInsuranceTypeFilterChange(undefined)}
                                options={Object.values(InsuranceType).map(type => ({ displayedText: toTitleCase(type), value: type }))}
                                selectedOption={
                                    insuranceTypeFilter
                                        ? { displayedText: toTitleCase(insuranceTypeFilter), value: insuranceTypeFilter }
                                        : undefined
                                }
                            />
                            <Dropdown
                                placeholder='Policy status'
                                onSelectedOptionChange={handlePolicyStatusFilterChange}
                                onSelectedOptionRemove={() => handlePolicyStatusFilterChange(undefined)}
                                options={[
                                    { displayedText: toTitleCase(PolicyStatus.Active), value: PolicyStatus.Active },
                                    { displayedText: toTitleCase(PolicyStatus.Pending), value: PolicyStatus.Pending }
                                ]}
                                selectedOption={
                                    policyStatusFilter
                                        ? { displayedText: toTitleCase(policyStatusFilter), value: policyStatusFilter }
                                        : undefined
                                }
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
                                    rowsPerPage={100}
                                />
                            )
                    }
                </div>
            </div>
        </div>
    )
}
