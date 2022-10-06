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

export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [providers, setProviders] = useState<string[]>([])
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])
    const [nameFilter, setNameFilter] = useState<string>()
    const [providerFilter, setProviderFilter] = useState<string>()
    const [insuranceTypeFilter, setInsuranceTypeFilter] = useState<InsuranceType>()
    const [policyStatusFilter, setPolicyStatusFilter] = useState<PolicyStatus>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        handlePolicyFetch()
    }, [])

    const handlePolicyFetch = async () => {
        setIsLoading(true)

        // NOTE: Hack to delay fetch and test loading screen
        // await new Promise((resolve) => setTimeout(resolve, 1500))

        try {
            // NOTE: This can be moved to an API class
            const fetchedPolicies = await fetchOngoingPolicies()

            const providers = fetchedPolicies.map(policy => policy.provider)
            const providerSet = new Set(providers)

            setPolicies(fetchedPolicies)
            setProviders(Array.from(providerSet))
            setFilteredPolicies(fetchedPolicies)
            setIsLoading(false)
        } catch (err) {
            const error = err as Error

            console.error(error)
            setError(error.message)
        }
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

    const body = error
        ? (
            <div className="h-full flex items-center justify-center animate-fade-in">
                <h1 className="text-2xl text-feather-primary text-center">
                    Something unexpected happened. Please try again later.
                </h1>
            </div>
        )
        : (
            <div className=' px-16 py-8 flex-grow flex md:px-4'>
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
                                    rowsPerPage={5}
                                />
                            </div>
                        )
                }
            </div>
        )


    return (
        <div className="font-serif w-full h-full flex flex-col">
            <div className="w-full shadow-md">
                <Navbar />
                <div className='bg-feather-primary px-16 py-6 lg:py-4 md:px-4'>
                    <h1 className="text-3xl text-white mb-8">
                        Policies
                    </h1>
                    <div
                        className='
                            grid grid-cols-5 gap-4 grid-rows-1
                            lg:grid lg:grid-cols-2 lg:grid-rows-2
                        '
                    >
                        <div className="col-span-2 lg:col-span-1">
                            <SearchInput
                                value={nameFilter}
                                onChange={handleNameFilterChange}
                                onClear={() => handleNameFilterChange(undefined)}
                                placeholder="Client name"
                            />
                        </div>
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
            {body}
        </div>
    )
}
