import {
  PatientEnrollmentInputs,
  PatientEnrollmentRF,
  PatientEnrollmentStats,
} from "utils/Patient enrollment/IpatientEnrollment";

/**
 * Patient Enrollment Calculator (Base Class For ROI Calculation)
 */
abstract class PatientEnrollment {
  private static defaultStatistics: PatientEnrollmentStats = {
    coveredOutrightPercent: 0.15, //15%
    paApprovedPercent: 0.55, //55%
    paymentApprovalRateCovered: 0.9, //90%
    paymentApprovalRateUncovered: 0.47, //47%
    enrolledWithoutInsurancePercent: 0.2, //20%
    paymentApprovalRateCash: 0.47, //47%
  };

  private inputs: PatientEnrollmentInputs;
  private defaultStats: PatientEnrollmentStats;
  private refillStats: PatientEnrollmentRF;

  constructor(
    PEinputs: PatientEnrollmentInputs,
    refillStats: PatientEnrollmentRF,
  ) {
    this.inputs = PEinputs;
    this.defaultStats = {
      ...PatientEnrollment.defaultStatistics,
    };
    this.refillStats = refillStats;
  }

  // new Rx
  private get NRx() {
    return this.inputs.nRx;
  }

  //patientEnrollment
  private get PatientEnrollmentRate() {
    return this.inputs.patientEnagedPercentage;
  }

  private get EnrolledWithInsurancePercentage() {
    return (
      this.PatientEnrollmentRate -
      this.defaultStats.enrolledWithoutInsurancePercent
    );
  }

  private get EnrolledWithInsurance() {
    return this.NRx * this.EnrolledWithInsurancePercentage;
  }

  //coverage check
  private get CoveredOutRightPercentage() {
    return this.defaultStats.coveredOutrightPercent;
  }

  private get CovererdOutRight() {
    return this.EnrolledWithInsurance * this.CoveredOutRightPercentage;
  }

  //PA
  private get RequiresPAPercentage() {
    return (1 - this.CoveredOutRightPercentage);
  }

  private get RequiresPA() {
    return this.EnrolledWithInsurance * this.RequiresPAPercentage;
  }

  private get PASubmittedRate() {
    return this.inputs.paSubmissionRate;
  }

  private get PASubmitted() {
    return this.RequiresPA * this.PASubmittedRate;
  }

  // PA Approval
  private get PAApprovedRate() {
    return this.defaultStats.paApprovedPercent;
  }

  private get PAApproved() {
    return this.PASubmitted * this.PAApprovedRate;
  }

  //Patients Reaching covered Copay
  private get PatientsReachingCoveredCopay() {
    return this.PAApproved + this.CovererdOutRight;
  }

  private get PaymentApprovalRateCovered() {
    return this.defaultStats.paymentApprovalRateCovered;
  }

  private get CoveredFFDispensed() {
    return this.PatientsReachingCoveredCopay * this.PaymentApprovalRateCovered;
  }

  //Patients Reaching uncovered Copay
  private get PatientsReachingUncoveredCopay() {
    return (
      (this.PASubmitted - this.PAApproved) + (this.RequiresPA - this.PASubmitted)
    );
  }

  private get PaymentApprovalRateUncovered() {
    return this.defaultStats.paymentApprovalRateUncovered;
  }

  private get UncoveredFFDispensed() {
    return (
      this.PatientsReachingUncoveredCopay * this.PaymentApprovalRateUncovered
    );
  }

  // Cash/Self-Pay Patients
  private get EnrolledWithoutInsurancePercentage() {
    return this.defaultStats.enrolledWithoutInsurancePercent;
  }

  private get EnrolledWithoutInsurance() {
    return this.NRx * this.EnrolledWithoutInsurancePercentage;
  }
  private get PaymentApprovalRateCash() {
    return this.defaultStats.paymentApprovalRateCash;
  }
  private get CashFFDispensed() {
    return this.EnrolledWithoutInsurance * this.PaymentApprovalRateCash;
  }

  // not enrolled patients
  private get NotEnrolledPercentage() {
    return (1 - this.inputs.patientEnagedPercentage);
  }

  // Total First Fill Dispensed
  public get TotalFFDispensed() {
    return (
      this.CoveredFFDispensed + this.UncoveredFFDispensed + this.CashFFDispensed
    );
  }
  public get OverallPTRpercentage() {
    return this.TotalFFDispensed / this.NRx;
  }
  private get CoveredFFPercentage() {
    return this.CoveredFFDispensed / this.TotalFFDispensed;
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
    return this.CoveredFFDispensed * (this.CoveredRF + 1);
  }
  private get UncoveredTRx() {
    return this.UncoveredFFDispensed * (this.UncoveredRF + 1);
  }
  private get CashTRx() {
    return this.CashFFDispensed * (this.CashRF + 1);
  }
  public get TotalTRx() {
    return this.CoveredTRx + this.UncoveredTRx + this.CashTRx;
  }
  public get CoveredTRxPercentage() {
    return this.CoveredTRx / this.TotalTRx;
  }
}

export default PatientEnrollment;
