import { Customer } from './Customer'
import { InsuranceType } from './InsuranceType'
import { PolicyStatus } from './PolicyStatus'

export type Policy = {
    id: string
    customer: Customer
    provider: string
    insuranceType: InsuranceType
    status: PolicyStatus
    startDate: string
    endDate: string
    createdAt: string
}