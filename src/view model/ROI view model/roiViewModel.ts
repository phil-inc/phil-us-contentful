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

  constructor(rInputs: RoiInputsNum) {
    this.rawInputs = rInputs;
    
    // Note: nRx is now monthly, will be converted to annual in calculations
    this.retailInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx), // This is now monthly
      patientEnagedPercentage: toDecimal(rInputs.patientEnagedPercentage).div(100), // in decimal
      paSubmissionRate: toDecimal(rInputs.paSubmissionRate).div(100),
      inputAverageRefillsPerNRx: toDecimal(rInputs.inputAverageRefillsPerNRx),
      commerciallyInsuredPercentage: toDecimal(rInputs.commerciallyInsuredPercentage || 0).div(100),
    };
    this.philInputs = {
      wac: toDecimal(rInputs.wac),
      nRx: toDecimal(rInputs.nRx), // This is now monthly
      patientEnagedPercentage: toDecimal(PHIL_ROI_DEFAULT_INPUTS.patientEnagedPercentage).div(100),
      paSubmissionRate: toDecimal(PHIL_ROI_DEFAULT_INPUTS.paSubmissionRate).div(100),
      // For volume calculations (C.P.21), we use the user-provided inputAverageRefillsPerNRx (I.5)
      inputAverageRefillsPerNRx: toDecimal(rInputs.inputAverageRefillsPerNRx),
      commerciallyInsuredPercentage: toDecimal(rInputs.commerciallyInsuredPercentage || 0).div(100),
    };

    // Calculate new ROI using new calculation system
    this.calculateNewPhilROI();
  }

  /**
   * Calculate Phil ROI using new calculation system
   */
  private calculateNewPhilROI(): void {
    try {
      // Log raw inputs and normalized decimal inputs
      console.log("=== Phil ROI Inputs (raw) ===");
      console.log("rawInputs:", this.rawInputs);
      console.log("=== Phil ROI Inputs (decimal) ===");
      console.log("philInputs:", this.philInputs.toString ? this.philInputs.toString() : this.philInputs);

      const assumptions = new RoiAssumptions(this.philInputs, ProgramType.PHIL);
      const volumeCalculations = getVolumeCalculations(
        this.philInputs,
        assumptions,
        this.rawInputs.haveUncoverCouponOffer
      );
      
      // Detailed log of volume calculations
      console.log("=== Phil Volume Calculations ===");
      console.log("annualNRx:", volumeCalculations.annualNRx.toString());
      console.log("enrollWithInsurance:", {
        rate: volumeCalculations.enrollWithInsurance.rate.toString(),
        amount: volumeCalculations.enrollWithInsurance.amount.toString(),
      });
      console.log("enrollWithoutInsurance:", {
        rate: volumeCalculations.enrollWithoutInsurance.rate.toString(),
        amount: volumeCalculations.enrollWithoutInsurance.amount.toString(),
      });
      console.log("dontEnroll:", {
        rate: volumeCalculations.dontEnroll.rate.toString(),
        amount: volumeCalculations.dontEnroll.amount.toString(),
      });
      console.log("coveredOutright:", {
        rate: volumeCalculations.coveredOutright.rate.toString(),
        amount: volumeCalculations.coveredOutright.amount.toString(),
      });
      console.log("requiresPA:", {
        rate: volumeCalculations.requiresPA.rate.toString(),
        amount: volumeCalculations.requiresPA.amount.toString(),
      });
      console.log("paSubmitted:", {
        rate: volumeCalculations.paSubmitted.rate.toString(),
        amount: volumeCalculations.paSubmitted.amount.toString(),
      });
      console.log("paNotSubmitted:", {
        rate: volumeCalculations.paNotSubmitted.rate.toString(),
        amount: volumeCalculations.paNotSubmitted.amount.toString(),
      });
      console.log("paApproved:", {
        rate: volumeCalculations.paApproved.rate.toString(),
        amount: volumeCalculations.paApproved.amount.toString(),
      });
      console.log("paDenied:", {
        rate: volumeCalculations.paDenied.rate.toString(),
        amount: volumeCalculations.paDenied.amount.toString(),
      });
      console.log("coveredOutrightPriceShown:", {
        amount: volumeCalculations.coveredOutrightPriceShown.amount.toString(),
        average: volumeCalculations.coveredOutrightPriceShown.average.toString(),
      });
      console.log("coveredAfterPAApprovedPriceShown:", {
        amount: volumeCalculations.coveredAfterPAApprovedPriceShown.amount.toString(),
        average: volumeCalculations.coveredAfterPAApprovedPriceShown.average.toString(),
      });
      console.log("uncoveredAfterPADeniedPriceShown:", {
        amount: volumeCalculations.uncoveredAfterPADeniedPriceShown.amount.toString(),
        average: volumeCalculations.uncoveredAfterPADeniedPriceShown.average.toString(),
      });
      console.log("uncoveredAfterNoPASubmittedPriceShown:", {
        amount: volumeCalculations.uncoveredAfterNoPASubmittedPriceShown.amount.toString(),
        average: volumeCalculations.uncoveredAfterNoPASubmittedPriceShown.average.toString(),
      });
      console.log("uninsuredPriceShown:", {
        amount: volumeCalculations.uninsuredPriceShown.amount.toString(),
        average: volumeCalculations.uninsuredPriceShown.average.toString(),
      });
      console.log("coveredOutrightFirstFills:", {
        rate: volumeCalculations.coveredOutrightFirstFills.rate.toString(),
        amount: volumeCalculations.coveredOutrightFirstFills.amount.toString(),
      });
      console.log("coveredAfterPAApprovedFirstFills:", {
        rate: volumeCalculations.coveredAfterPAApprovedFirstFills.rate.toString(),
        amount: volumeCalculations.coveredAfterPAApprovedFirstFills.amount.toString(),
      });
      console.log("uncoveredAfterPADeniedFirstFills:", {
        rate: volumeCalculations.uncoveredAfterPADeniedFirstFills.rate.toString(),
        amount: volumeCalculations.uncoveredAfterPADeniedFirstFills.amount.toString(),
      });
      console.log("uncoveredAfterNoPASubmittedFirstFills:", {
        rate: volumeCalculations.uncoveredAfterNoPASubmittedFirstFills.rate.toString(),
        amount: volumeCalculations.uncoveredAfterNoPASubmittedFirstFills.amount.toString(),
      });
      console.log("uninsuredFirstFills:", {
        rate: volumeCalculations.uninsuredFirstFills.rate.toString(),
        amount: volumeCalculations.uninsuredFirstFills.amount.toString(),
      });
      console.log("averageRefillsPerPatient:", volumeCalculations.averageRefillsPerPatient.toString());
      console.log("uncoveredRefills:", {
        rate: volumeCalculations.uncoveredRefills.rate.toString(),
        amount: volumeCalculations.uncoveredRefills.amount.toString(),
      });
      console.log("uncoveredTRx:", {
        rate: volumeCalculations.uncoveredTRx.rate.toString(),
        amount: volumeCalculations.uncoveredTRx.amount.toString(),
      });
      console.log("coveredRefills:", {
        rate: volumeCalculations.coveredRefills.rate.toString(),
        amount: volumeCalculations.coveredRefills.amount.toString(),
      });
      console.log("coveredTRx:", {
        rate: volumeCalculations.coveredTRx.rate.toString(),
        amount: volumeCalculations.coveredTRx.amount.toString(),
      });
      console.log("uninsuredRefills:", {
        rate: volumeCalculations.uninsuredRefills.rate.toString(),
        amount: volumeCalculations.uninsuredRefills.amount.toString(),
      });
      console.log("uninsuredTRx:", {
        rate: volumeCalculations.uninsuredTRx.rate.toString(),
        amount: volumeCalculations.uninsuredTRx.amount.toString(),
      });
      console.log("=== End Phil Volume Calculations ===");

      this.philFinalOutputs = new RoiFinalCalculations(
        this.philInputs,
        assumptions,
        volumeCalculations,
        this.rawInputs.haveCoverCouponOffer,
        this.rawInputs.haveUncoverCouponOffer
      );

      // Console log all final outputs for verification
      const outputs = this.philFinalOutputs.getFinalOutputs();
      console.log("=== Phil ROI Final Outputs ===");
      console.log("1. Patient Starts:", outputs.patientStarts.toString());
      console.log("2. Covered dispenses:", outputs.coveredDispenses.toString());
      console.log("3. Total Dispenses:", outputs.totalDispenses.toString());
      console.log("4. Gross Revenue:", outputs.grossRevenue.toString());
      console.log("5. Gross Buydown:", outputs.grossBuydown.toString());
      console.log("6. Gross DSA:", outputs.grossDSA.toString());
      console.log("7. Payer Rebate:", outputs.payerRebate.toString());
      console.log("8. Net Revenues:", outputs.netRevenues.toString());
      console.log("=============================");
    } catch (error) {
      console.error("Error calculating new Phil ROI:", error);
    }
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
      averageRefillsPerNRx: this.retailInputs.inputAverageRefillsPerNRx, // input from user
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
