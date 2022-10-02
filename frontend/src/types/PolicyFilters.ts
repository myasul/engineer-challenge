import { InsuranceType } from './InsuranceType'
import { PolicyStatus } from './PolicyStatus'

export type PolicyFilters = {
    name?: string,
    insuranceType?: InsuranceType,
    policyStatus?: PolicyStatus,
    // TODO: Implement
    // provider: string
}
