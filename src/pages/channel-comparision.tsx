import React from 'react';
import {
	Anchor,
	AspectRatio,
	Box,
	Container,
	createStyles,
	Grid,
	Group,
	Image,
	MediaQuery,
	useMantineTheme,
} from '@mantine/core';
import {SEO} from 'layouts/SEO/SEO';
import {Layout} from 'layouts/Layout/Layout';
import {getCustomizedReport, getCustomizedReportMobile} from 'assets/images';
import EmailCollection from 'components/ChannelComparision/EmailCollection';
import {useForm} from '@mantine/form';
import type {FormValues, TStepper} from 'contexts/ChannelComparisionContext';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import Information from 'components/ChannelComparision/Information';
import Done from 'components/ChannelComparision/Done';
import {StaticImage} from 'gatsby-plugin-image';

export const Head: React.FC = () => (
	<SEO title='Channel Comparision'>
		<meta
			name='description'
			content='Learn how you can optimize your patient access strategy to improve adherence and gross-to-net'
		/>
		<meta property='og:title' content='Channel Comparision' />
		<meta property='og:type' content='Page' />
		<meta
			property='og:description'
			content='Learn how you can optimize your patient access strategy to improve adherence and gross-to-net'
		/>
		<meta property='og:url' content='https://phil.us/channel-comparision/' />
	</SEO>
);

const useStyles = createStyles(theme => ({
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
		background: '#F4F4F4',
	},

	image: {
		maxWidth: 110,
		width: '100%',

		[theme.fn.smallerThan('md')]: {
			width: 60,
		},
	},
}));

const ChannelComparisionPage = () => {
	const {classes} = useStyles();
	const formattedDateTime
		= new Date().toLocaleString('en-US', {hour12: false}).replace(/[,/: ]+/g, '_') + '_' + String(Date.now());

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
			cycle: 'Channel Calculator',
			drug_name: formattedDateTime,
		},

		validate: {
			email: value => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Invalid email'),
		},

		transformValues: (values: FormValues) => ({
			...values,
			percentFormulatoryCoverage: Number(values.percentFormulatoryCoverage) || 0,
		}),
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
		<Layout minimal headerTargetBlank={true}>
			<Container className={classes.root} py={0}>
				<Grid className={classes.innerGrid} justify='center'>
					<ChannelComparisionContext.Provider value={{stepper, form}}>
						{step === 0 && <EmailCollection />}
						{step === 1 && <Information />}
						{step >= 2 && <Done />}
					</ChannelComparisionContext.Provider>

					<Grid.Col sm={6} xs={12} p={0} order={1}>
						<MediaQuery styles={{display: 'none'}} smallerThan={'sm'}>
							<Image src={getCustomizedReport as string} fit='cover' />
						</MediaQuery>
						<MediaQuery styles={{display: 'none'}} largerThan={'sm'}>
							<Image src={getCustomizedReportMobile as string} fit='cover' />
						</MediaQuery>
					</Grid.Col>
				</Grid>
			</Container>
			<Container className={classes.root} py={0}>
				<Grid className={classes.innerGrid} sx={{background: '#fff'}}>
					<Grid.Col span={5} p={0} py={32}>
						<Group position='left' align={'center'} spacing={'xs'}>
							<Box p={0} m={0}>
								Connect on
							</Box>{' '}
							<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
								<StaticImage src='../assets/images/linkedin-whitebg.svg' alt='LinkedIn Icon' />
							</Anchor>
						</Group>
					</Grid.Col>
					<Grid.Col span={7} p={0} py={32}>
						<Group position='right'>
							<AspectRatio ratio={1} className={classes.image}>
								<Image src='https://images.ctfassets.net/2h91ja0efsni/35go8TPfye2RQRi5tBOwnY/aa25c2e80e7a2da5f6195606e075b37d/aicpasvg.svg' />
							</AspectRatio>
							<AspectRatio ratio={1} className={classes.image}>
								<Image src='https://images.ctfassets.net/2h91ja0efsni/yZzZQ61D5fUVPiX4ioZnd/623274c0cf3ce4b4eec6f28ba3ee6761/HIPAA-mulberry.svg' />
							</AspectRatio>
						</Group>
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default ChannelComparisionPage;
