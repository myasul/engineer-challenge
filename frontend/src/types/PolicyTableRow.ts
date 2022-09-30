import { InsuranceType } from './InsuranceType'

export type PolicyTableRow = {
    fullName: string
    provider: string
    insuranceType: InsuranceType
    status: React.ReactNode
}