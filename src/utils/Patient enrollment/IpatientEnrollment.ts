import Decimal from "decimal.js";

export type PatientEnrollmentInputs = {
    wac: Decimal;
    nRx: Decimal;
    patientEnagedPercentage: Decimal;
    paSubmissionRate: Decimal;
    averageRefillsPerNRx: Decimal;
}

export type PatientEnrollmentStats = {
    coveredOutrightPercent: Decimal;
    paApprovedPercent: Decimal;
    paymentApprovalRateCovered: Decimal;
    paymentApprovalRateUncovered: Decimal;
    enrolledWithoutInsurancePercent: Decimal;
    paymentApprovalRateCash: Decimal;
}

export type PatientEnrollmentRF = {
    coveredRf: Decimal;
    uncoveredRf: Decimal;
    cashRf: Decimal;
}

