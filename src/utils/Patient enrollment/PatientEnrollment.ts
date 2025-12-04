import Decimal from "decimal.js";

import { RoiInputsDec } from "types/roi";

import {
  PatientEnrollmentRF,
  PatientEnrollmentStats,
} from "utils/Patient enrollment/IpatientEnrollment";
import { toDecimal, toDecimalRounded } from "../../utils/decimal/decimal.utils";

/**
 * Patient Enrollment Calculator (Base Class For ROI Calculation)
 */
abstract class PatientEnrollment {
  private static defaultStatistics: PatientEnrollmentStats = {
    coveredOutrightPercent: toDecimal(0.15), //15%
    paApprovedPercent: toDecimal(0.55), //55%
    paymentApprovalRateCovered: toDecimal(0.9), //90%
    paymentApprovalRateUncovered: toDecimal(0.47), //47%
    enrolledWithoutInsurancePercent: toDecimal(0.2), //20%
    paymentApprovalRateCash: toDecimal(0.47), //47%
  };

  private inputs: RoiInputsDec;
  private defaultStats: PatientEnrollmentStats;
  private refillStats: PatientEnrollmentRF;

  constructor(PEinputs: RoiInputsDec, refillStats: PatientEnrollmentRF) {
    this.inputs = PEinputs;
    this.defaultStats = {
      ...PatientEnrollment.defaultStatistics,
    };
    this.refillStats = refillStats;
  }

  // new Rx
  private get NRx(): Decimal {
    return this.inputs.nRx;
  }

  //patientEnrollment
  private get PatientEnrollmentRate(): Decimal {
    return this.inputs.patientEnagedPercentage;
  }

  private get EnrolledWithInsurancePercentage() {
    return this.PatientEnrollmentRate.sub(
      this.defaultStats.enrolledWithoutInsurancePercent,
    );
  }

  private get EnrolledWithInsurance() {
    return toDecimalRounded(this.NRx.mul(this.EnrolledWithInsurancePercentage),0);
  }

  //coverage check
  private get CoveredOutRightPercentage() {
    return this.defaultStats.coveredOutrightPercent;
  }

  private get CovererdOutRight() {
    return toDecimalRounded(this.EnrolledWithInsurance.mul(this.CoveredOutRightPercentage),0);
  }

  //PA
  private get RequiresPAPercentage() {
    return toDecimal(1).sub(this.CoveredOutRightPercentage);
  }

  private get RequiresPA() {
    return toDecimalRounded(this.EnrolledWithInsurance.mul(this.RequiresPAPercentage),0);
  }

  private get PASubmittedRate() {
    return this.inputs.paSubmissionRate;
  }

  private get PASubmitted() {
    return toDecimalRounded(this.RequiresPA.mul(this.PASubmittedRate),0);
  }

  // PA Approval
  private get PAApprovedRate() {
    return this.defaultStats.paApprovedPercent;
  }

  private get PAApproved() {
    return toDecimalRounded(this.PASubmitted.mul(this.PAApprovedRate),0);
  }

  //Patients Reaching covered Copay
  private get PatientsReachingCoveredCopay() {
    return this.PAApproved.add(this.CovererdOutRight);
  }

  private get PaymentApprovalRateCovered() {
    return this.defaultStats.paymentApprovalRateCovered;
  }

  private get CoveredFFDispensed() {
    return toDecimalRounded(this.PatientsReachingCoveredCopay.mul(
      this.PaymentApprovalRateCovered,
    ),0);
  }

  //Patients Reaching uncovered Copay
  private get PatientsReachingUncoveredCopay() {
    return (this.PASubmitted.sub(this.PAApproved)).add(
      (this.RequiresPA.sub(this.PASubmitted)));
  }

  private get PaymentApprovalRateUncovered() {
    return this.defaultStats.paymentApprovalRateUncovered;
  }

  private get UncoveredFFDispensed() {
    return toDecimalRounded(this.PatientsReachingUncoveredCopay.mul(
      this.PaymentApprovalRateUncovered,
    ),0);
  }

  // Cash/Self-Pay Patients
  private get EnrolledWithoutInsurancePercentage() {
    return this.defaultStats.enrolledWithoutInsurancePercent;
  }

  private get EnrolledWithoutInsurance() {
    return toDecimalRounded(this.NRx.mul(this.EnrolledWithoutInsurancePercentage),0);
  }
  private get PaymentApprovalRateCash() {
    return this.defaultStats.paymentApprovalRateCash;
  }
  private get CashFFDispensed() {
    return toDecimalRounded(this.EnrolledWithoutInsurance.mul(this.PaymentApprovalRateCash),0);
  }

  // not enrolled patients
  private get NotEnrolledPercentage() {
    return toDecimal(1).sub(this.inputs.patientEnagedPercentage);
  }

  // Total First Fill Dispensed
  public get TotalFFDispensed() {
    return this.CoveredFFDispensed.add(this.UncoveredFFDispensed).add(
      this.CashFFDispensed,
    );
  }
  public get OverallPTRpercentage() {
    return this.TotalFFDispensed.div(this.NRx);
  }
  private get CoveredFFPercentage() {
    return this.CoveredFFDispensed.div(this.TotalFFDispensed);
  }

  //refills
  private get CoveredRF() {
    return this.refillStats.coveredRf;
  }
  private get UncoveredRF() {
    return this.refillStats.uncoveredRf;
  }
  private get CashRF() {
    return this.refillStats.cashRf;
  }

  // total Rx
  public get CoveredTRx() {
    return this.CoveredFFDispensed.mul(this.CoveredRF.add(1));
  }
  private get UncoveredTRx() {
    return this.UncoveredFFDispensed.mul(this.UncoveredRF.add(1));
  }
  private get CashTRx() {
    return this.CashFFDispensed.mul(this.CashRF.add(1));
  }
  public get TotalTRx() {
    return this.CoveredTRx.add(this.UncoveredTRx).add(this.CashTRx);
  }
  public get CoveredTRxPercentage() {
    return this.CoveredTRx.div(this.TotalTRx);
  }
}

export default PatientEnrollment;
