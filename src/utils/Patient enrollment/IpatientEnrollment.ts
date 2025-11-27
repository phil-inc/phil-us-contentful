export type PatientEnrollmentInputs = {
    wac: number;
    nRx: number;
    patientEnagedPercentage: number;
    paSubmissionRate: number;
    averageRefillsPerNRx: number;
}

export type PatientEnrollmentStats = {
    coveredOutrightPercent: number;
    paApprovedPercent: number;
    paymentApprovalRateCovered: number;
    paymentApprovalRateUncovered: number;
    enrolledWithoutInsurancePercent: number;
    paymentApprovalRateCash: number;
}

export type PatientEnrollmentRF = {
    coveredRf: number;
    uncoveredRf: number;
    cashRf: number;
}

