import { ProgramType } from "../../enum/global.enum";
import { RoiInputsNum, RoiInputsDec } from "types/roi";
import { PHIL_ROI_DEFAULT_INPUTS, RF_DEFAULT_STATS } from "../../constants/roi.constant";

import { toDecimal, toDecimalRounded } from './../../utils/decimal/decimal.utils';
import GrossRevenue from "../../utils/Gross Revenue/GrossRevenue";
import { getInDollar, getInX, getTrendArrow } from "utils/utils";


export class RoiViewModel {
  private philInputs: RoiInputsDec;
  private retailInputs: RoiInputsDec;

  constructor(rInputs: RoiInputsNum) {
    this.retailInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx),
      patientEnagedPercentage: toDecimal(rInputs.patientEnagedPercentage).div(100), // in decimal
      paSubmissionRate: toDecimal(rInputs.paSubmissionRate).div(100),
      averageRefillsPerNRx: toDecimal(rInputs.averageRefillsPerNRx),
    };
    this.philInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx),
      patientEnagedPercentage: toDecimal(PHIL_ROI_DEFAULT_INPUTS.patientEnagedPercentage).div(100),
      paSubmissionRate: toDecimal(PHIL_ROI_DEFAULT_INPUTS.paSubmissionRate).div(100),
      averageRefillsPerNRx: toDecimal(0), // will be calculated
    };
  }
  
  public get philROI() {
    const philGrossRevenue = new GrossRevenue(ProgramType.PHIL, this.philInputs, RF_DEFAULT_STATS.PHIL);
    
    return {
      wac: this.philInputs.wac, //input from user
      estNrx: this.philInputs.nRx, //input from user
      patientsEngagedPercentage: this.philInputs.patientEnagedPercentage, //input from user
      paSubmittedPercentage: this.philInputs.paSubmissionRate, //input from user
      coveredDispensesPercentage: philGrossRevenue.CoveredDispensesPercentage,
      patientsStartingPercentage: philGrossRevenue.PatientsStartingPercentage,
      averageRefillsPerNRx: philGrossRevenue.AverageRefillsPerNRx, // calculated for PHIL amd input for retail user
      totalRx: philGrossRevenue.TRx,
      totatCoveredFills: philGrossRevenue.TotalCoveredFills(),
      estGrossRevenue: philGrossRevenue.EstGrossRevenue(),
    };
  }

  public get retailROI() {
    const retailGrossRevenue = new GrossRevenue(ProgramType.RETAIL, this.retailInputs, RF_DEFAULT_STATS.RETAIL);

    return {
      wac: this.retailInputs.wac, //input from user
      estNrx: this.retailInputs.nRx, //input from user
      patientsEngagedPercentage: this.retailInputs.patientEnagedPercentage, //input from user
      paSubmittedPercentage: this.retailInputs.paSubmissionRate, //input from user
      coveredDispensesPercentage: retailGrossRevenue.CoveredDispensesPercentage,
      patientsStartingPercentage: retailGrossRevenue.PatientsStartingPercentage,
      averageRefillsPerNRx: this.retailInputs.averageRefillsPerNRx, //input from user
      totalRx: retailGrossRevenue.TRx,
      totalCoveredFills: retailGrossRevenue.TotalCoveredFills(),
      estGrossRevenue: retailGrossRevenue.EstGrossRevenue(),
    };
  }
  
  // difference between phil and retail ROI
  public get roiImprovement() {
    const roiImprovement = {
      estNrx: toDecimal(0), // not applicable
      patientsEngagedPercentage:
        ((this.philROI.patientsEngagedPercentage.sub(this.retailROI.patientsEngagedPercentage))
        .div(this.retailROI.patientsEngagedPercentage))
        .add(1),
      paSubmittedPercentage:
        ((this.philROI.paSubmittedPercentage.sub(this.retailROI.paSubmittedPercentage))
        .div(this.retailROI.paSubmittedPercentage))
        .add(1),
      coveredDispensesPercentage:
        ((this.philROI.coveredDispensesPercentage.sub(this.retailROI.coveredDispensesPercentage))
        .div(this.retailROI.coveredDispensesPercentage))
        .add(1),
      patientsStartingPercentage:
        ((this.philROI.patientsStartingPercentage.sub(this.retailROI.patientsStartingPercentage))
        .div(this.retailROI.patientsStartingPercentage))
        .add(1),
      averageRefillsPerNRx:
        ((this.philROI.averageRefillsPerNRx.sub(this.retailROI.averageRefillsPerNRx))
        .div(this.retailROI.averageRefillsPerNRx))
        .add(1),
      totalRx:
        ((this.philROI.totalRx.sub(this.retailROI.totalRx))
        .div(this.retailROI.totalRx))
        .add(1),
      totatCoveredFills:((this.philROI.totatCoveredFills.sub(this.retailROI.totalCoveredFills))
        .div(this.retailROI.totalCoveredFills))
        .add(1),
      estGrossRevenue:
        ((this.philROI.estGrossRevenue.sub(this.retailROI.estGrossRevenue))
        .div(this.retailROI.estGrossRevenue))
        .add(1),
    };

    return roiImprovement;
  }

  public get finalEstimation() {
    const philEstCostWithDSAsaving = this.philROI.estGrossRevenue.mul(0.08); // 8% DSA saving

    return {
      estPhilCostWithDSAsaving: philEstCostWithDSAsaving,
      estimatedROI: (this.philROI.estGrossRevenue.sub(this.retailROI.estGrossRevenue))
        .div(philEstCostWithDSAsaving)
    }
  }

  // display output in string
  public get philROIInString() {
    return {
      estGrossRevenue : getInDollar(toDecimalRounded(this.philROI.estGrossRevenue,1)),
    }
  }

  public get retailROIInString() {
    return {
      estGrossRevenue : getInDollar(toDecimalRounded(this.retailROI.estGrossRevenue,1)),
    }
  }
  
  public get roiImprovementInString() {
    return {
      estNrx: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.estNrx,1))),
      patientsEngagedPercentage: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.patientsEngagedPercentage,1))),
      paSubmittedPercentage: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.paSubmittedPercentage,1))),
      coveredDispensesPercentage: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.coveredDispensesPercentage,1))),
      patientsStartingPercentage: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.patientsStartingPercentage,1))),
      averageRefillsPerNRx: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.averageRefillsPerNRx,1))),
      totalRx: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.totalRx,1))),
      totatCoveredFills: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.totatCoveredFills,1))),
      estGrossRevenue: getInX(getTrendArrow(toDecimalRounded(this.roiImprovement.estGrossRevenue,1))),
    }
  }

  public get finalEstimationInString() {
    return {
      estPhilCostWithDSAsaving: getInDollar(toDecimalRounded(this.finalEstimation.estPhilCostWithDSAsaving,1)),
      estimatedROI: getInX(toDecimalRounded(this.finalEstimation.estimatedROI,1)),
    }
  }
}
