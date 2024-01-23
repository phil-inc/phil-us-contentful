import React, {useCallback} from 'react';
import {Anchor, AspectRatio, Box, Container, Grid, Group, Image, useMantineTheme} from '@mantine/core';
import {SEO} from 'layouts/SEO/SEO';
import {Layout} from 'layouts/Layout/Layout';
import {getCustomizedReport} from 'assets/images';
import EmailCollection from 'components/ChannelComparision/EmailCollection';
import {useForm} from '@mantine/form';
import type {FormValues, TStepper} from 'contexts/ChannelComparisionContext';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import Information from 'components/ChannelComparision/Information';
import Done from 'components/ChannelComparision/Done';
import {GatsbyImage, StaticImage} from 'gatsby-plugin-image';

import {useContentfulImage} from 'gatsby-source-contentful/hooks';
import * as classes from './channelComparision.module.css';
import useDeviceType from 'hooks/useView';

export const Head: React.FC = () => (
	<SEO title="Channel Comparision">
		<meta
			name="description"
			content="Learn how you can optimize your patient access strategy to improve adherence and gross-to-net"
		/>
		<meta property="og:title" content="Channel Comparision" />
		<meta property="og:type" content="Page" />
		<meta
			property="og:description"
			content="Learn how you can optimize your patient access strategy to improve adherence and gross-to-net"
		/>
		<meta property="og:url" content="https://phil.us/channel-comparision/" />
	</SEO>
);

const ChannelComparisionPage = () => {
	const images = [
		'//images.ctfassets.net/2h91ja0efsni/35go8TPfye2RQRi5tBOwnY/aa25c2e80e7a2da5f6195606e075b37d/aicpasvg.svg',
		'//images.ctfassets.net/2h91ja0efsni/yZzZQ61D5fUVPiX4ioZnd/cfa25cb6c64b81496395dbaaa9bd7bba/hipaa-compliance.svg',
	];

	const getImageConfig = (src: string) => ({
		image: {
			layout: 'constrained',
			url: src,
			width: 110,
			height: 110,
			quality: 100,
			formats: ['auto', 'webp'],
		},
	});

	const badges = React.useMemo(() => images.map(src => useContentfulImage(getImageConfig(src))), [images]);

	const isMobileDevice = useDeviceType('xs');

	const formattedDateTime =
		new Date().toLocaleString('en-US', {hour12: false}).replace(/[,/: ]+/g, '_') + '_' + String(Date.now());

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
				<Grid gutter={0} className={classes.grid} justify="center">
					<ChannelComparisionContext.Provider value={{stepper, form}}>
						{step === 0 && <EmailCollection />}
						{step === 1 && <Information />}
						{step >= 2 && <Done />}
					</ChannelComparisionContext.Provider>

					{!isMobileDevice && (
						<Grid.Col span={{base: 12, sm: 6}} p={0} order={1}>
							<Image src={getCustomizedReport as string} fit="cover" />
						</Grid.Col>
					)}
				</Grid>

				<Grid gutter={0} className={classes.footer}>
					<Grid.Col span="auto" p={0} py={32}>
						<Group justify="left" gap={16} align={'center'}>
							<Box p={0} m={0}>
								Connect on
							</Box>{' '}
							<Anchor href="https://www.linkedin.com/company/phil-inc-" target="_blank">
								<StaticImage src="../assets/images/linkedin-whitebg.svg" loading="lazy" alt="LinkedIn Icon" />
							</Anchor>
						</Group>
					</Grid.Col>
					<Grid.Col span={7} p={0} py={32}>
						<Group justify="right">
							{badges.map((image, index) => (
								<GatsbyImage
									loading="lazy"
									className={classes.badge}
									objectFit="contain"
									image={image}
									key={index}
									alt=""
								/>
							))}
						</Group>
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default ChannelComparisionPage;
