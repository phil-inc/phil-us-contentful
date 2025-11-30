import Decimal from "decimal.js";

export type RoiInputsNum = {
    wac: number;
    nRx: number;
    patientEnagedPercentage: number;
    paSubmissionRate: number;
    averageRefillsPerNRx: number;
}

export type RoiInputsDec = {
    wac: Decimal;
    nRx: Decimal;
    patientEnagedPercentage: Decimal;
    paSubmissionRate: Decimal;
    averageRefillsPerNRx: Decimal;
}