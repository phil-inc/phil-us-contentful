import React from 'react';
import {Container, createStyles, Grid, Image} from '@mantine/core';
import {SEO} from 'layouts/SEO/SEO';
import {Layout} from 'layouts/Layout/Layout';
import {getCustomizedReport} from 'assets/images';
import EmailCollection from 'components/ChannelComparision/EmailCollection';
import {useForm} from '@mantine/form';
import type {FormValues, TStepper} from 'contexts/ChannelComparisionContext';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import Information from 'components/ChannelComparision/Information';
import Done from 'components/ChannelComparision/Done';

export const Head: React.FC = () => <SEO title={'Channel comparision'}></SEO>;

const useStyles = createStyles(() => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
		width: '100%',
		maxWidth: 1440,
		display: 'flex',
		placeItems: 'center',
		justifyContent: 'center',
	},

	innerGrid: {
		margin: 0,
		maxWidth: 1440,
		width: '100%',
	},
}));

const ChannelComparisionPage = () => {
	const {classes} = useStyles();

	const form = useForm<FormValues>({
		initialValues: {
			email: '',
			yourName: '',
			title: '',
			brand: '',
			company: '',
			brandWAC: undefined,
			fillPerPatient: undefined,
			percentDispense: undefined,
			percentFormulatoryCoverage: undefined,
			copayAmountCovered: undefined,
			copayAmountUncovered: undefined,
			copayAmountCash: undefined,
			primaryPharmacy: '',
			concerns: '',
		},
	});

	const [step, setStep] = React.useState(0);

	const nextStep = () => {
		setStep(current => (current < 1 ? current + 1 : current + 2));
	};

	const prevStep = () => {
		setStep(current => (current > 0 ? current - 1 : current));
	};

	const stepper: TStepper = {
		nextStep,
		prevStep,
		step,
	};

	return (
		<Layout minimal={true}>
			<Container className={classes.root}>
				<Grid className={classes.innerGrid} justify='center'>
					<ChannelComparisionContext.Provider value={{stepper, form}}>
						{step === 0 && <EmailCollection />}
						{step === 1 && <Information />}
						{step >= 2 && <Done />}
					</ChannelComparisionContext.Provider>

					<Grid.Col span='auto' p={0}>
						<Image src={getCustomizedReport as string} fit='cover' />
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default ChannelComparisionPage;
