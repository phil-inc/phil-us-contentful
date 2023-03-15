import React from 'react';
import type {UseFormReturnType} from '@mantine/form';

export type FormValues = {
	email: string;
	yourName: string;
	title: string;
	brand: string;
	company: string;
	brandWAC: number | undefined;
	fillPerPatient: number | undefined;
	percentDispense: number | undefined;
	percentFormulatoryCoverage: number | undefined;
	copayAmountCovered: number | undefined;
	copayAmountUncovered: number | undefined;
	copayAmountCash: number | undefined;
	primaryPharmacy: string;
	concerns: string;
	cycle: string;
	drug_name: string;
};

export type TStepper = {
	step: number;
	nextStep: () => void;
	prevStep: () => void;
};

const stepper: unknown = {};
const form: unknown = {};

export const ChannelComparisionContext = React.createContext<{
	stepper: TStepper;
	form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}>({stepper: stepper as TStepper, form: form as UseFormReturnType<FormValues, (values: FormValues) => FormValues>});
