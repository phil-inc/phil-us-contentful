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
} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {IconCheck} from '@tabler/icons';

const useStyles = createStyles(theme => ({
	content: {
		height: '100%',
		padding: '72px 105px',
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
}));

const Information = () => {
	const {classes} = useStyles();

	const {stepper, form} = React.useContext(ChannelComparisionContext);

	return (
		<Grid.Col span='auto' className={classes.contentGrid}>
			<Box className={classes.content}>
				<Text onClick={stepper.prevStep}>Go back to edit</Text>
				<Stepper
					active={stepper.step}
					iconSize={48}
					mb={48}
					color={'philBranding'}
					breakpoint='sm'
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
				<Title order={2} size={28} mb={16}>
					Details
				</Title>
				<Group position='apart' grow spacing={40}>
					<TextInput
						classNames={{
							root: classes.rootWrapper,
							wrapper: classes.inputWrapper,
							label: classes.inputLabel,
							required: classes.inputLabel,
						}}
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
						label='Title'
						radius={0}
						withAsterisk
						mb={48}
						{...form.getInputProps('title')}
					/>
				</Group>

				<Group position='apart' grow spacing={40}>
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
						label='Company'
						radius={0}
						withAsterisk
						mb={48}
						{...form.getInputProps('company')}
					/>
				</Group>

				<Group position='apart' grow spacing={40}>
					<TextInput
						classNames={{
							root: classes.rootWrapper,
							wrapper: classes.inputWrapper,
							label: classes.inputLabel,
							required: classes.inputLabel,
						}}
						withAsterisk
						label='What is your brand’s WAC'
						radius={0}
						mb={48}
						{...form.getInputProps('brandWAC')}
					/>
				</Group>

				<Group position='apart' grow spacing={40}>
					<TextInput
						classNames={{
							root: classes.rootWrapper,
							wrapper: classes.inputWrapper,
							label: classes.inputLabel,
							required: classes.inputLabel,
						}}
						withAsterisk
						label='Average number of fills per patient'
						radius={0}
						mb={48}
						{...form.getInputProps('fillPerPatient')}
					/>
				</Group>

				<Group position='apart' grow spacing={40}>
					<TextInput
						classNames={{
							root: classes.rootWrapper,
							wrapper: classes.inputWrapper,
							label: classes.inputLabel,
							required: classes.inputLabel,
						}}
						withAsterisk
						label='Percentage of dispenses utilize a manufacturer uncovered coupon?'
						radius={0}
						mb={48}
						{...form.getInputProps('percentDispense')}
					/>
				</Group>

				<Group position='apart' grow spacing={40}>
					<TextInput
						classNames={{
							root: classes.rootWrapper,
							wrapper: classes.inputWrapper,
							label: classes.inputLabel,
							required: classes.inputLabel,
						}}
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
					<Group position='apart' grow spacing={40}>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							label='Covered'
							required
							radius={0}
							mb={48}
							{...form.getInputProps('copayAmountCovered')}
						/>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							label='Uncovered'
							radius={0}
							mb={48}
							{...form.getInputProps('copayAmountUncovered')}
						/>
						<TextInput
							classNames={{
								root: classes.rootWrapper,
								wrapper: classes.inputWrapper,
								label: classes.inputLabel,
								required: classes.inputLabel,
							}}
							required
							label='Cash'
							radius={0}
							mb={48}
							{...form.getInputProps('copayAmountCash')}
						/>
					</Group>
				</Stack>

				<Group position='apart' grow spacing={40} mb={20}>
					<Radio.Group
						classNames={{root: classes.radioGroup, label: classes.inputLabel, required: classes.inputLabel}}
						name='primaryPharmacy'
						label='What is your primary pharmacy?'
						withAsterisk
					>
						<Radio
							classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
							icon={IconCheck as React.FC}
							value='Retail Pharmacy'
							label='Retail Pharmacy'
						/>
						<Radio
							classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
							icon={IconCheck as React.FC}
							value='Specialty Pharmacy'
							label='Specialty Pharmacy'
						/>
						<Radio
							classNames={{radio: classes.radioButton, icon: classes.radioIcon, label: classes.radioLabel}}
							icon={IconCheck as React.FC}
							value='Digital Pharmacy'
							label='Digital Pharmacy'
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

				<Button type='submit' onClick={stepper.nextStep}>
					Get my customized report
				</Button>
			</Box>
		</Grid.Col>
	);
};

export default Information;
