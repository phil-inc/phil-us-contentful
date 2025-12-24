import Decimal from "decimal.js";


import { ProgramType } from "../../enum/global.enum";
import { RoiInputsDec } from "types/roi";

import { toDecimal, toDecimalRounded } from './../decimal/decimal.utils';
import { PatientEnrollmentRF } from "../../utils/Patient enrollment/IpatientEnrollment";
import PatientEnrollment from "../../utils/Patient enrollment/PatientEnrollment";



/**
 * GrossRevenue - calculate gross revenue for a set of items.
 */
class GrossRevenue  extends PatientEnrollment {
    private programType: ProgramType;
    private gInputs: RoiInputsDec;


    constructor(programType: ProgramType, inputs: RoiInputsDec, refillStats: PatientEnrollmentRF) {
        super(inputs,refillStats );
        this.programType = programType;
        this.gInputs = inputs;
    }

    public get AnnualNRx(): Decimal {
        return this.gInputs.nRx;
    }
    // Note: patientEnagedPercentage has been removed. Using default enrollment rate of 80%
    public get PatientsEngagedPercentage(): Decimal {
        return toDecimal(0.8);
    }
    public get PAsSubmittedPercentage(): Decimal {
        return this.gInputs.paSubmissionRate;
    }
    public get CoveredDispensesPercentage(): Decimal {
        return this.CoveredTRxPercentage;
    }
    public get PatientsStartingPercentage(): Decimal {
        return this.OverallPTRpercentage;
    }
    public get AverageRefillsPerNRx(): Decimal {
        if(this.programType === ProgramType.PHIL) {
            const value = (this.TotalTRx.div(this.TotalFFDispensed)).sub(1);
            return toDecimalRounded(value,1)
        }

        // For non-PHIL programs, use the inputAverageRefillsPerNRx directly
        return this.gInputs.inputAverageRefillsPerNRx;
    }
    
    public get TRx(): Decimal {
        return this.TotalTRx;
    }
    public TotalCoveredFills(): Decimal {
        return this.CoveredTRx;
    }
    public EstGrossRevenue(): Decimal {
        return (this.gInputs.wac.mul(this.TRx)).div(1000000);
    }
}

export default GrossRevenue;