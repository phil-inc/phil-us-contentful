import {Stepper} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import React from 'react';
import * as classes from './stepper.module.css';

type StepperProps = Record<string, unknown>;

const CStepper: React.FC<StepperProps> = ({}) => {
	const {stepper, form} = React.useContext(ChannelComparisionContext);

	return (
		<Stepper
			active={stepper.step}
			iconSize={48}
			mb={48}
			color={'philBranding'}
			classNames={{
				step: classes.step,
				stepBody: classes.stepBody,
				separator: classes.separator,
				stepIcon: classes.stepIcon,
				stepCompletedIcon: classes.stepCompletedIcon,
			}}
		>
			<Stepper.Step label='Email' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
			<Stepper.Step label='Information' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
			<Stepper.Step label='Done' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
		</Stepper>
	);
};

export default CStepper;
