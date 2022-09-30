import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Column, Table } from '../components/Table'
import { PolicyStatusBadge } from "../components/PolicyStatusBadge"
import React, { useEffect, useState } from 'react'
import { Policy } from '../types/Policy'
import { InsuranceType } from '../types/InsuranceType'

const POLICY_API_PATH = 'http://localhost:4000/policies'

type PolicyTableRow = {
    fullName: string
    provider: string
    insuranceType: InsuranceType
    status: React.ReactNode
}

const policyColumns: Column<PolicyTableRow>[] = [
    { title: 'Name', rowKey: 'fullName' },
    { title: 'Provider', rowKey: 'provider' },
    { title: 'Type', rowKey: 'insuranceType' },
    { title: 'Status', rowKey: 'status' },
]

export const PoliciesPage = () => {
    const [policies, setPolicies] = useState<Policy[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchActivePolicies()
    }, [])

    // TODO: Think of a more appropriate name
    const fetchActivePolicies = async () => {
        setIsLoading(true)

        // TODO: Add error handling
        const result = await fetch(POLICY_API_PATH)
        const fetchedPolicies = await result.json()

        setPolicies(fetchedPolicies)
        setIsLoading(false)
    }

    const buildTableRowsFromPolicies = (policies: Policy[]) => {
        const rows: PolicyTableRow[] = []

        for (const policy of policies) {
            rows.push({
                fullName: `${policy.customer.firstName} ${policy.customer.firstName}`,
                provider: policy.provider,
                insuranceType: policy.insuranceType,
                status: <PolicyStatusBadge status={policy.status} />,
            })
        }

        return rows
    }

    return (
        <div>
            <Navbar />
            <div className="w-full p-8">
                <Header headerText='Policies' />
                {
                    isLoading
                        ? <div>Loading Policies</div>
                        : (
                            <Table
                                columns={policyColumns}
                                rows={buildTableRowsFromPolicies(policies)}
                            />
                        )
                }
            </div>
        </div>
    )
}
