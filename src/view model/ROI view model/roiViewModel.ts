import { ProgramType } from "../../enum/global.enum";
import { RoiInputsNum, RoiInputsDec } from "types/roi";
import { PHIL_ROI_DEFAULT_INPUTS, RF_DEFAULT_STATS } from "../../constants/roi.constant";

import { toDecimal, toDecimalRounded } from './../../utils/decimal/decimal.utils';
import GrossRevenue from "../../utils/Gross Revenue/GrossRevenue";
import { getInDollar, getInX, getTrendArrow } from "utils/utils";
import { RoiAssumptions } from "config/roiAssumptions.config";
import { getVolumeCalculations } from "utils/ROI/VolumeCalculations";
import { RoiFinalCalculations } from "utils/ROI/RoiFinalCalculations";


export class RoiViewModel {
  private philInputs: RoiInputsDec;
  private retailInputs: RoiInputsDec;
  private rawInputs: RoiInputsNum;
  private philFinalOutputs: RoiFinalCalculations | null = null;
  private retailFinalOutputs: RoiFinalCalculations | null = null;

  constructor(rInputs: RoiInputsNum) {
    this.rawInputs = rInputs;
    
    // Note: nRx is now monthly, will be converted to annual in calculations
    this.retailInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx), // This is now monthly
      paSubmissionRate: toDecimal(rInputs.paSubmissionRate).div(100),
      inputAverageRefillsPerNRx: toDecimal(rInputs.inputAverageRefillsPerNRx),
      commerciallyInsuredPercentage: toDecimal(rInputs.commerciallyInsuredPercentage || 0).div(100),
    };
    this.philInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx), // This is now monthly
      paSubmissionRate: toDecimal(PHIL_ROI_DEFAULT_INPUTS.paSubmissionRate).div(100),
      // For volume calculations, we use the user-provided inputAverageRefillsPerNRx
      inputAverageRefillsPerNRx: toDecimal(rInputs.inputAverageRefillsPerNRx),
      commerciallyInsuredPercentage: toDecimal(rInputs.commerciallyInsuredPercentage || 0).div(100),
    };

    // Calculate new ROI using new calculation system for both programs
    this.calculateNewPhilROI();
    this.calculateNewRetailROI();
  }

  /**
   * Calculate Phil ROI using new calculation system
   */
  private calculateNewPhilROI(): void {
    try {
      const assumptions = new RoiAssumptions(this.philInputs, ProgramType.PHIL);
      const volumeCalculations = getVolumeCalculations(
        this.philInputs,
        assumptions,
        this.rawInputs.haveUncoverCouponOffer,
        ProgramType.PHIL,
        this.rawInputs.haveHubService
      );

      this.philFinalOutputs = new RoiFinalCalculations(
        this.philInputs,
        assumptions,
        volumeCalculations,
        this.rawInputs.haveCoverCouponOffer,
        this.rawInputs.haveUncoverCouponOffer
      );
    } catch (error) {
      console.error("Error calculating new Phil ROI:", error);
    }
  }

  /**
   * Calculate Retail ROI using new calculation system
   */
  private calculateNewRetailROI(): void {
    try {
      const assumptions = new RoiAssumptions(this.retailInputs, ProgramType.RETAIL);
      const volumeCalculations = getVolumeCalculations(
        this.retailInputs,
        assumptions,
        this.rawInputs.haveUncoverCouponOffer,
        ProgramType.RETAIL,
        this.rawInputs.haveHubService
      );

      this.retailFinalOutputs = new RoiFinalCalculations(
        this.retailInputs,
        assumptions,
        volumeCalculations,
        this.rawInputs.haveCoverCouponOffer,
        this.rawInputs.haveUncoverCouponOffer
      );
    } catch (error) {
      console.error("Error calculating new Retail ROI:", error);
    }
  }
  
  public get philROI() {
    const philGrossRevenue = new GrossRevenue(ProgramType.PHIL, this.philInputs, RF_DEFAULT_STATS.PHIL);
    
    return {
      wac: this.philInputs.wac, //input from user
      estNrx: this.philInputs.nRx, //input from user
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
      paSubmittedPercentage: this.retailInputs.paSubmissionRate, //input from user
      coveredDispensesPercentage: retailGrossRevenue.CoveredDispensesPercentage,
      patientsStartingPercentage: retailGrossRevenue.PatientsStartingPercentage,
      averageRefillsPerNRx: this.retailInputs.inputAverageRefillsPerNRx, // input from user
      totalRx: retailGrossRevenue.TRx,
      totalCoveredFills: retailGrossRevenue.TotalCoveredFills(),
      estGrossRevenue: retailGrossRevenue.EstGrossRevenue(),
    };
  }
  
  // difference between phil and retail ROI (ratios Phil / Retail)
  public get roiImprovement() {
    if (!this.philFinalOutputs || !this.retailFinalOutputs) {
      return {
        patientStarts: toDecimal(0),
        coveredDispenses: toDecimal(0),
        grossRevenue: toDecimal(0),
        netRevenue: toDecimal(0),
      };
    }

    const philFinal = this.philFinalOutputs.getFinalOutputs();
    const retailFinal = this.retailFinalOutputs.getFinalOutputs();

    const safeRatio = (philValue: any, retailValue: any) =>
      retailValue.eq(0) ? toDecimal(0) : philValue.div(retailValue);

    return {
      patientStarts: safeRatio(philFinal.patientStarts, retailFinal.patientStarts),
      coveredDispenses: safeRatio(
        philFinal.coveredDispenses,
        retailFinal.coveredDispenses,
      ),
      grossRevenue: safeRatio(philFinal.grossRevenue, retailFinal.grossRevenue),
      netRevenue: safeRatio(philFinal.netRevenues, retailFinal.netRevenues),
    };
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
      patientStarts: getInX(
        toDecimalRounded(this.roiImprovement.patientStarts, 1),
      ),
      coveredDispenses: getInX(
        toDecimalRounded(this.roiImprovement.coveredDispenses, 1),
      ),
      grossRevenue: getInX(
        toDecimalRounded(this.roiImprovement.grossRevenue, 1),
      ),
      netRevenue: getInX(
        toDecimalRounded(this.roiImprovement.netRevenue, 1),
      ),
    }
  }

  public get finalEstimationInString() {
    return {
      estPhilCostWithDSAsaving: getInDollar(toDecimalRounded(this.finalEstimation.estPhilCostWithDSAsaving,1)),
      estimatedROI: getInX(toDecimalRounded(this.finalEstimation.estimatedROI,1)),
    }
  }
}
