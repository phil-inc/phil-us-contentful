import React from 'react';
import type {UseFormReturnType} from '@mantine/form';

export type FormValues = {
	email: string;
	yourName: string;
	title: string;
	brand: string;
	company: string;
	brandWAC: string;
	fillPerPatient: string;
	percentDispense: string;
	percentFormulatoryCoverage: string;
	copayAmountCovered: string;
	copayAmountUncovered: string;
	copayAmountCash: string;
	primaryPharmacy: string;
	concerns: string;
};

export type TStepper = {
	step: number;
	nextStep: () => void;
	prevStep: () => void;
};

export const ChannelComparisionContext = React.createContext<{
	stepper: TStepper;
	form: UseFormReturnType<FormValues, undefined>;
}>({stepper: {step: 0, nextStep: null, prevStep: null}, form: null});
