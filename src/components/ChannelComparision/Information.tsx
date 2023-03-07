import React from 'react';
import {
	Grid,
	Box,
	Title,
	createStyles,
	Stepper,
	TextInput,
	Button,
	Image,
	Text,
	Group,
	Stack,
	Radio,
	Textarea,
	NumberInput,
	SimpleGrid,
} from '@mantine/core';
import type {FormValues} from 'contexts/ChannelComparisionContext';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {IconArrowLeft, IconCheck} from '@tabler/icons';
import {CHANNEL_COMPARISION_API, HUBSPOT_CHANNEL_COMPARISION_URL} from 'constants/api';
import {useScrollIntoView} from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	content: {
		height: '100%',
		padding: '72px 105px',

		[theme.fn.smallerThan('md')]: {
			padding: 40,
		},
	},

	contentGrid: {
		background: '#F4F4F4',
	},

	title: {
		lineHeight: 1.2,
	},

	normalText: {
		lineHeight: '29px',
	},

	step: {
		flexDirection: 'column',
		justifyContent: 'center',
		placeItems: 'center',
	},

	stepBody: {
		margin: '0 auto',
		marginTop: 8,
	},

	stepIcon: {
		borderColor: '#9E9E9E',
		fontSize: 20,

		'&[data-progress=\'true\']': {
			background: '#00827E',
			color: '#FFFFFF',
		},
	},

	inputLabel: {
		color: '#525252',
		fontSize: 20,
	},

	rootWrapper: {
		marginBottom: '20px !important',
	},

	inputWrapper: {
		marginBottom: 0,
	},

	separator: {
		margin: -30,
		marginTop: -50,
		backgroundColor: '#9E9E9E',
	},

	radioButton: {
		width: 24,
		height: 24,
		borderRadius: 1,
	},

	radioIcon: {
		width: 16,
		height: 16,
		top: 'calc(50% - 8px)',
		left: 'calc(50% - 8px)',
	},

	radioLabel: {
		fontSize: 20,
		color: '#525252',
		fontWeight: 400,
	},

	radioGroup: {
		'div.mantine-Group-root': {
			columnGap: 20,
			rowGap: 12,
		},
	},

	backButton: {
		color: '#525252',

		'&:hover': {
			background: 'none',
		},
	},
}));

const Information = () => {
	const {classes} = useStyles();
	const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
	const {stepper, form} = React.useContext(ChannelComparisionContext);
	const url = CHANNEL_COMPARISION_API;
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		scrollIntoView({alignment: 'start'});
	}, []);

	const onSubmit = async (values: FormValues) => {
		try {
			setLoading(true);

			const hubspotData = {
				fields: [
					{
						objectTypeId: '0-1',
						name: 'firstname',
						value: values.yourName,
					},
					{objectTypeId: '0-1', name: 'jobtitle', value: values.title},
					{objectTypeId: '0-2', name: 'name', value: values.company},
					{objectTypeId: '0-1', name: 'email', value: values.email},
					{objectTypeId: '2-9880972', name: 'drug_name', value: values.brand},
					{objectTypeId: '2-9880972', name: 'wac', value: values.brandWAC},
					{objectTypeId: '2-9880972', name: 'dosage__wac_comments', value: values.fillPerPatient},
					{
						objectTypeId: '2-9880972',
						name: 'percentage_of_dispenses_utilize_a_manufacturer_uncovered_coupon',
						value: values.percentDispense,
					},
					{
						objectTypeId: '2-9880972',
						name: 'percentage_of_formulary_coverage',
						value: values.percentFormulatoryCoverage,
					},
					{objectTypeId: '2-9880972', name: 'opay_amount_covered', value: values.copayAmountCovered},
					{objectTypeId: '2-9880972', name: 'opay_amount_uncovered', value: values.copayAmountUncovered},
					{objectTypeId: '2-9880972', name: 'copay_amount_cash', value: values.copayAmountCash},
					{objectTypeId: '2-9880972', name: 'what_is_your_primary_pharmacy_', value: values.primaryPharmacy},
					{objectTypeId: '2-9880972', name: 'additional_refill_notes', value: values.concerns},
				],
				context: {
					pageUri: 'https://phil.us/channel-comparision/',
					pageName: 'Channel Comparision Page',
				},
			};

			// Submit to hubspot
			const hubspotRes = fetch(HUBSPOT_CHANNEL_COMPARISION_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(hubspotData),
			});

			// Submit to capi
			const capiRes = fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			await Promise.all([hubspotRes, capiRes]);
			stepper.nextStep();
		} catch (error: unknown) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Grid.Col
			ref={targetRef}
			p={0}
			span='auto'
			className={classes.contentGrid}
			order={2}
			orderLg={1}
			orderMd={1}
			orderSm={1}
		>
			<Box className={classes.content}>
				<Button
					className={classes.backButton}
					pl={0}
					mb={32}
					variant='subtle'
					leftIcon={<IconArrowLeft />}
					onClick={stepper.prevStep}
				>
					Go back to edit
				</Button>

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
					}}
				>
					<Stepper.Step label='Email' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label='Information' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label='Done' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
				</Stepper>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Title order={2} size={28} mb={16}>
						Details
					</Title>
					<SimpleGrid
						cols={2}
						breakpoints={[
							{maxWidth: 'md', cols: 1, spacing: 'xs', verticalSpacing: 1},
							{maxWidth: 'xs', cols: 1, spacing: 'xs', verticalSpacing: 1},
						]}
					>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							label='Your Name'
							radius={0}
							withAsterisk
							mb={48}
							{...form.getInputProps('yourName')}
						/>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							label='Title'
							radius={0}
							withAsterisk
							mb={48}
							{...form.getInputProps('title')}
						/>
					</SimpleGrid>

					<SimpleGrid
						cols={2}
						breakpoints={[
							{maxWidth: 'md', cols: 1, spacing: 'xs', verticalSpacing: 1},
							{maxWidth: 'xs', cols: 1, spacing: 'xs', verticalSpacing: 1},
						]}
					>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							label='Brand'
							radius={0}
							mb={48}
							{...form.getInputProps('brand')}
						/>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							label='Company'
							radius={0}
							withAsterisk
							mb={48}
							{...form.getInputProps('company')}
						/>
					</SimpleGrid>

					<Group position='apart' grow spacing={40}>
						<NumberInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							withAsterisk
							label='What is your brand’s WAC'
							min={0}
							radius={0}
							mb={48}
							{...form.getInputProps('brandWAC')}
						/>
					</Group>

					<Group position='apart' grow spacing={40}>
						<NumberInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							withAsterisk
							min={0}
							label='Average number of fills per patient'
							radius={0}
							mb={48}
							{...form.getInputProps('fillPerPatient')}
						/>
					</Group>

					<Group position='apart' grow spacing={40}>
						<NumberInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							withAsterisk
							label='Percentage of dispenses utilize a manufacturer uncovered coupon?'
							radius={0}
							max={100}
							min={0}
							mb={48}
							{...form.getInputProps('percentDispense')}
						/>
					</Group>

					<Group position='apart' grow spacing={40}>
						<NumberInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							max={100}
							min={0}
							label='Percentage of formulary coverage'
							radius={0}
							mb={48}
							{...form.getInputProps('percentFormulatoryCoverage')}
						/>
					</Group>

					<Stack spacing={0}>
						<Text size={20} color='#525252'>
							What is patient’s copay amount ($):*
						</Text>
						<SimpleGrid
							cols={3}
							breakpoints={[
								{maxWidth: 'md', cols: 2, spacing: 'xs', verticalSpacing: 1},
								{maxWidth: 'sm', cols: 2, spacing: 'xs', verticalSpacing: 1},
								{maxWidth: 'xs', cols: 1, spacing: 'xs', verticalSpacing: 1},
							]}
						>
							<NumberInput
								classNames={{
									root: classes.rootWrapper,
									wrapper: classes.inputWrapper,
									label: classes.inputLabel,
									required: classes.inputLabel,
								}}
								label='Covered'
								required
								radius={0}
								min={0}
								mb={48}
								{...form.getInputProps('copayAmountCovered')}
							/>
							<NumberInput
								classNames={{
									root: classes.rootWrapper,
									wrapper: classes.inputWrapper,
									label: classes.inputLabel,
									required: classes.inputLabel,
								}}
								required
								label='Uncovered'
								min={0}
								radius={0}
								mb={48}
								{...form.getInputProps('copayAmountUncovered')}
							/>
							<NumberInput
								classNames={{
									root: classes.rootWrapper,
									wrapper: classes.inputWrapper,
									label: classes.inputLabel,
									required: classes.inputLabel,
								}}
								required
								label='Cash'
								min={0}
								radius={0}
								mb={48}
								{...form.getInputProps('copayAmountCash')}
							/>
						</SimpleGrid>
					</Stack>

					<Group position='apart' grow spacing={40} mb={20}>
						<Radio.Group
							classNames={{root: classes.radioGroup, label: classes.inputLabel, required: classes.inputLabel}}
							name='primaryPharmacy'
							label='What is your primary pharmacy?'
							withAsterisk
							{...form.getInputProps('primaryPharmacy')}
						>
							<Radio
								classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
								required
								icon={IconCheck as React.FC}
								label='Retail Pharmacy'
								value='Retail Pharmacy'
							/>
							<Radio
								classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
								required
								icon={IconCheck as React.FC}
								label='Specialty Pharmacy'
								value='Specialty Pharmacy'
							/>
							<Radio
								classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
								required
								icon={IconCheck as React.FC}
								label='Digital Pharmacy'
								value='Digital Pharmacy'
							/>
						</Radio.Group>
					</Group>

					<Group position='apart' grow spacing={40}>
						<Textarea
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							label='Current program concerns or pain points?'
							radius={0}
							mb={48}
							autosize
							minRows={2}
							maxRows={4}
							{...form.getInputProps('concerns')}
						/>
					</Group>

					<Button type='submit' loading={loading} loaderPosition='right'>
						Get my customized report
					</Button>
				</form>
				<Button
					className={classes.backButton}
					pl={0}
					mt={32}
					variant='subtle'
					leftIcon={<IconArrowLeft />}
					onClick={stepper.prevStep}
				>
					Go back to edit
				</Button>
			</Box>
		</Grid.Col>
	);
};

export default Information;
