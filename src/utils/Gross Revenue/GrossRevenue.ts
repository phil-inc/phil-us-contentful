import { ProgramType } from "enum/global.enum";
import { PatientEnrollmentInputs, PatientEnrollmentRF } from "utils/Patient enrollment/IpatientEnrollment";
import PatientEnrollment from "utils/Patient enrollment/PatientEnrollment";



/**
 * GrossRevenue - calculate gross revenue for a set of items.
 */
class GrossRevenue  extends PatientEnrollment {
    private programType: ProgramType;
    private gInputs: PatientEnrollmentInputs;


    constructor(programType: ProgramType, inputs: PatientEnrollmentInputs, refillStats: PatientEnrollmentRF) {
        super(inputs,refillStats );
        this.programType = programType;
        this.gInputs = inputs;
    }

    public get AnnualNRx(): number {
        return this.gInputs.nRx;
    }
    public get PatientsEngagedPercentage(): number {
        return this.gInputs.patientEnagedPercentage;
    }
    public get PAsSubmittedPercentage(): number {
        return this.gInputs.paSubmissionRate;
    }
    public get CoveredDispensesPercentage(): number {
        return this.CoveredTRxPercentage;
    }
    public get PatientsStartingPercentage(): number {
        return this.OverallPTRpercentage;
    }
    public get AverageRefillsPerNRx(): number {
        if(this.programType === ProgramType.PHIL) {
            const value = (this.TotalTRx / this.TotalFFDispensed) - 1;
            return Number(value.toFixed(1))
        }

        return this.gInputs.averageRefillsPerNRx;
    }
    
    public get TRx(): number {
        return this.TotalTRx;
    }
    public TotalCoveredFills(): number {
        return this.CoveredTRx;
    }
    public EstGrossRevenue(): number {
        return (this.gInputs.wac * this.TRx) / 1000000;
    }
}

export default GrossRevenue;