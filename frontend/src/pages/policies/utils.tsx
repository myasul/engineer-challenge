import { BadgeProps } from '../../components/Badge'
import { Badge } from '../../components/Badge'
import { Column } from '../../components/Table'
import { Policy } from '../../types/Policy'
import { PolicyFilters } from '../../types/PolicyFilters'
import { PolicyStatus } from '../../types/PolicyStatus'
import { PolicyTableRow } from '../../types/PolicyTableRow'

const POLICY_API_PATH = 'http://localhost:4000/policies'

export const fetchOngoingPolicies = async (): Promise<Policy[]> => {
    const validStatuses = [PolicyStatus.Active, PolicyStatus.Pending]
    const url = new URL(POLICY_API_PATH)
    url.searchParams.append('status', validStatuses.join(','))

    const result = await fetch(url.toString())
    const fetchedPolicies = await result.json()

    return fetchedPolicies
}

export const policyColumns: Column<PolicyTableRow>[] = [
    { title: 'Name', rowKey: 'fullName' },
    { title: 'Provider', rowKey: 'provider' },
    { title: 'Type', rowKey: 'insuranceType' },
    { title: 'Status', rowKey: 'status' },
]

const badgePropsMap: { [key in PolicyStatus]: BadgeProps } = {
    [PolicyStatus.Active]: {
        textColor: 'tc-green-100',
        backgroundColor: 'bg-green-100',
        text: 'Active'
    },
    [PolicyStatus.Pending]: {
        textColor: 'tc-yellow-600',
        backgroundColor: 'bg-yellow-100',
        text: 'Pending'
    },
    [PolicyStatus.Cancelled]: {
        textColor: 'tc-red-100',
        backgroundColor: 'bg-red-100',
        text: 'Cancelled'
    },
    [PolicyStatus.DroppedOut]: {
        textColor: 'tc-red-100',
        backgroundColor: 'bg-red-100',
        text: 'Dropped out'
    }
}
export const buildTableRowsFromPolicies = (policies: Policy[]) => {
    const rows: PolicyTableRow[] = []

    for (const policy of policies) {
        const badgeProps = badgePropsMap[policy.status]

        rows.push({
            fullName: `${policy.customer.firstName} ${policy.customer.lastName}`,
            provider: policy.provider,
            insuranceType: toTitleCase(policy.insuranceType),
            status: <Badge {...badgeProps} />,
        })
    }

    return rows
}

export const filterPolicies = (policies: Policy[], filters: PolicyFilters) => {
    const matchedPolicies: Policy[] = []
    const { name, insuranceType, policyStatus, provider } = filters

    for (const policy of policies) {
        const { customer: { firstName, lastName } } = policy
        const lowercasedFullName = `${firstName} ${lastName}`.toLowerCase()

        if (name !== undefined && name !== '' && !lowercasedFullName.includes(name)) continue
        if (insuranceType !== undefined && policy.insuranceType !== insuranceType) continue
        if (policyStatus !== undefined && policy.status !== policyStatus) continue
        if (provider !== undefined && policy.provider !== provider) continue

        matchedPolicies.push(policy)
    }

    return matchedPolicies
}

export const toTitleCase = (text: string) => {
    if (text.length <= 1) return text.toUpperCase()

    const [firstLetter, ...remainingLetters] = text.toLowerCase()

    return firstLetter.toUpperCase() + remainingLetters.join('')
}
