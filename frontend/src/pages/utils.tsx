import { PolicyStatusBadge } from '../components/PolicyStatusBadge'
import { Policy } from '../types/Policy'
import { PolicyStatus } from '../types/PolicyStatus'
import { PolicyTableRow } from '../types/PolicyTableRow'

const POLICY_API_PATH = 'http://localhost:4000/policies'

// TODO: Think of a more appropriate name
export const fetchActivePolicies = async (): Promise<Policy[]> => {
    const validStatuses = [PolicyStatus.Active, PolicyStatus.Pending]
    const url = new URL(POLICY_API_PATH)
    url.searchParams.append('status', validStatuses.join(','))

    const result = await fetch(url.toString())
    const fetchedPolicies = await result.json()

    return fetchedPolicies
}

export const buildTableRowsFromPolicies = (policies: Policy[]) => {
    const rows: PolicyTableRow[] = []

    for (const policy of policies) {
        rows.push({
            fullName: `${policy.customer.firstName} ${policy.customer.lastName}`,
            provider: policy.provider,
            insuranceType: policy.insuranceType,
            status: <PolicyStatusBadge status={policy.status} />,
        })
    }

    return rows
}
