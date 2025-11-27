import { PHIL_ROI_DEFAULT_INPUTS, RF_DEFAULT_STATS } from "constants/roi.constant";
import { ProgramType } from "enum/global.enum";
import { ROIinputs } from "types/roi";
import GrossRevenue from "utils/Gross Revenue/GrossRevenue";


export class RoiViewModel {
  private philInputs: ROIinputs;
  private retailInputs: ROIinputs;

  constructor(rInputs: ROIinputs) {
    this.retailInputs = {
      ...rInputs,
      patientEnagedPercentage: rInputs.patientEnagedPercentage / 100, // in decimal
      paSubmissionRate: rInputs.paSubmissionRate / 100,
    };
    this.philInputs = {
      wac: rInputs.wac,
      nRx: rInputs.nRx,
      patientEnagedPercentage: PHIL_ROI_DEFAULT_INPUTS.patientEnagedPercentage / 100,
      paSubmissionRate: PHIL_ROI_DEFAULT_INPUTS.paSubmissionRate / 100,
      averageRefillsPerNRx: PHIL_ROI_DEFAULT_INPUTS.averageRefillsPerNRx,
    };
  }

  public get philROI() {
    const philGrossRevenue = new GrossRevenue(ProgramType.PHIL, this.philInputs, RF_DEFAULT_STATS.PHIL);

    return {
      wac: this.philInputs.wac,
      estNrx: this.philInputs.nRx,
      patientsEngagedPercentage: this.philInputs.patientEnagedPercentage,
      paSubmittedPercentage: this.philInputs.paSubmissionRate,
      coveredDispensesPercentage: philGrossRevenue.CoveredDispensesPercentage,
      patientsStartingPercentage: philGrossRevenue.PatientsStartingPercentage,
      averageRefillsPerNRx: philGrossRevenue.AverageRefillsPerNRx,
      totalRx: philGrossRevenue.TRx,
      totaCoveredFills: philGrossRevenue.TotalCoveredFills(),
      estGrossRevenue: philGrossRevenue.EstGrossRevenue(),
    };
  }

  public get retailROI() {
    const retailGrossRevenue = new GrossRevenue(ProgramType.RETAIL, this.retailInputs, RF_DEFAULT_STATS.RETAIL);

    return {
      wac: this.retailInputs.wac,
      estNrx: this.retailInputs.nRx,
      patientsEngagedPercentage: this.retailInputs.patientEnagedPercentage,
      paSubmittedPercentage: this.retailInputs.paSubmissionRate,
      coveredDispensesPercentage: retailGrossRevenue.CoveredDispensesPercentage,
      patientsStartingPercentage: retailGrossRevenue.PatientsStartingPercentage,
      averageRefillsPerNRx: this.retailInputs.averageRefillsPerNRx,
      totalRx: retailGrossRevenue.TRx,
      totalCoveredFills: retailGrossRevenue.TotalCoveredFills(),
      estGrossRevenue: retailGrossRevenue.EstGrossRevenue(),
    };
  }
  
  // difference between phil and retail ROI
  public get roiImprovement() {
    const roiImprovement = {
      estNrx: 0,
      patientsEngagedPercentage:
        (this.philROI.patientsEngagedPercentage -
          this.retailROI.patientsEngagedPercentage) /
          this.retailROI.patientsEngagedPercentage +
        1,
      paSubmittedPercentage:
        (this.philROI.paSubmittedPercentage -
          this.retailROI.paSubmittedPercentage) /
          this.retailROI.paSubmittedPercentage +
        1,
      coveredDispensesPercentage:
        (this.philROI.coveredDispensesPercentage -
          this.retailROI.coveredDispensesPercentage) /
          this.retailROI.coveredDispensesPercentage +
        1,
      patientsStartingPercentage:
        (this.philROI.patientsStartingPercentage -
          this.retailROI.patientsStartingPercentage) /
          this.retailROI.patientsStartingPercentage +
        1,
      averageRefillsPerNRx:
        (this.philROI.averageRefillsPerNRx -
          this.retailROI.averageRefillsPerNRx) /
          this.retailROI.averageRefillsPerNRx +
        1,
      totalRx:
        (this.philROI.totalRx - this.retailROI.totalRx) /
          this.retailROI.totalRx +
        1,
      estGrossRevenue:
        (this.philROI.estGrossRevenue - this.retailROI.estGrossRevenue) /
          this.retailROI.estGrossRevenue +
        1,
    };

    return roiImprovement;
  }

  public get finalEstimation() {
    const philEstCostWithDSAsaving = this.philROI.estGrossRevenue * 0.08;

    const roiEstimate = {
      estPhilCostWithDSAsaving: philEstCostWithDSAsaving,
      estimatedROI:
        (this.philROI.estGrossRevenue - this.retailROI.estGrossRevenue) /
        philEstCostWithDSAsaving,
    };

    return {
      philEstCostWithDSAsaving,
      roiEstimate,
    };
  }
}
