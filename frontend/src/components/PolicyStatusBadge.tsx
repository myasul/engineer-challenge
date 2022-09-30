import { PolicyStatus } from '../types/PolicyStatus'

interface BadgeProps {
    status: PolicyStatus
}

type BadgeColor = {
    textColor: string,
    backgroundColor: string
}

const BadgeColorMap = {
    [PolicyStatus.Active]: { textColor: 'tc-green-100', backgroundColor: 'bg-green-100' },
    [PolicyStatus.Pending]: { textColor: 'tc-yellow-600', backgroundColor: 'bg-yellow-100' },
    [PolicyStatus.Cancelled]: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
    [PolicyStatus.DroppedOut]: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' }
}

const BadgeTextMap = {
    [PolicyStatus.Active]: 'ACTIVE',
    [PolicyStatus.Pending]: 'PENDING',
    [PolicyStatus.Cancelled]: 'CANCELLED',
    [PolicyStatus.DroppedOut]: 'DROPPED OUT'
}

export const PolicyStatusBadge = ({ status }: BadgeProps) => {
    const { textColor, backgroundColor } = BadgeColorMap[status]
    const className = `inline-block rounded-full	py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`

    return <p className={className}>{BadgeTextMap[status]}</p>
}
