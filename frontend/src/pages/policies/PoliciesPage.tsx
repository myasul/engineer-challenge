import { useEffect, useState } from 'react'
import { Select } from '../../components/Select'
import { LoadingPulse } from '../../components/LoadingPulse'

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
// * Make the data that are all caps displayed as title case
// * Change loading text to be a loading pulse same as what feather uses
// * Add a smoother loading experience
// * Implement pagination
// - Make it responsive (Currently the app's styling is ruined in mobile)
// - Manual testing
// - Remove fetch delay hack
// - Implement path aliases (just @src is enough)

export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [providers, setProviders] = useState<string[]>([])
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
    const [nameFilter, setNameFilter] = useState<string>()
    const [providerFilter, setProviderFilter] = useState<string>()
    const [insuranceTypeFilter, setInsuranceTypeFilter] = useState<InsuranceType>()
    const [policyStatusFilter, setPolicyStatusFilter] = useState<PolicyStatus>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handlePolicyFetch()
    }, [])

    const handlePolicyFetch = async () => {
        setIsLoading(true)

        // NOTE: This can be moved to an API class
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const fetchedPolicies = await fetchOngoingPolicies()

        const providers = fetchedPolicies.map(policy => policy.provider)
        const providerSet = new Set(providers)

        setPolicies(fetchedPolicies)
        setProviders(Array.from(providerSet))
        setFilteredPolicies(fetchedPolicies)
        setIsLoading(false)
    }

    const handleNameFilterChange = (updatedNameFilter?: string) => {
        const lowercasedNameFilter = updatedNameFilter?.toLowerCase() 

        const filters: PolicyFilters = {
            name: lowercasedNameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: policyStatusFilter,
            provider: providerFilter
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

    const handleProviderFilterChange = (selectedProvider?: string) => {
        const filters: PolicyFilters = {
            name: nameFilter,
            insuranceType: insuranceTypeFilter,
            policyStatus: policyStatusFilter,
            provider: selectedProvider
        }

        const updatedFilteredPolicies = filterPolicies(policies, filters)

        setProviderFilter(selectedProvider)
        setFilteredPolicies(updatedFilteredPolicies)
    }

    return (
        <div className="font-serif w-full h-full flex flex-col">
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
                            onClear={() => handleNameFilterChange(undefined)}
                            placeholder="Client name"
                        />
                        <Select
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
                        <Select
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
                        <Select
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
            <div className='px-16 py-8 flex-grow flex'>
                {
                    isLoading
                        ? (
                            <div className="flex items-center justify-center w-full">
                                <LoadingPulse />
                            </div>
                        )
                        : (
                            <div className="w-full animate-fade-in">
                                <Table
                                    columns={policyColumns}
                                    rows={buildTableRowsFromPolicies(filteredPolicies)}
                                    rowsPerPage={7}
                                />
                            </div>
                        )
                }
            </div>
        </div>
    )
}
