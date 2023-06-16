import {Accordion, Box, Card, Checkbox, Divider, Title, createStyles, useMantineTheme} from '@mantine/core';
import {useDebouncedState, useToggle, useViewportSize} from '@mantine/hooks';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import {generateSearchParams} from 'utils/search';
import {navigate} from 'gatsby';

const useStyles = createStyles((theme, _params: {isMobileView: boolean}) => ({
	navigationList: {
		background: '#F4F4F4',
		padding: '36px 34px',
	},

	sectionNavLinksContainer: {
		'a:first-of-type > button': {
			paddingTop: 0,
		},

		'> a:last-child > button': {
			paddingBottom: 0,
		},
	},

	accordionContent: {
		padding: 0,
	},

	accordionControl: {
		padding: 0,
		borderBottom: '0 !important',
		backgroundColor: 'transparent !important',
		cursor: _params.isMobileView ? 'pointer' : 'default !important',
		marginBottom: 0,

		color: '#0A0A0A !important',

		'&[data-active]': {
			marginBottom: 24,
		},

		':disabled': {
			opacity: 1,
		},
	},

	chevron: {
		svg: {
			height: 24,
			width: 24,
		},
	},

	checkboxRoot: {
		padding: '12px 0 12px 0',
	},

	checkboxLabel: {
		paddingLeft: 8,
		fontSize: 16,
	},

	checkboxLabelChecked: {
		paddingLeft: 8,
		fontSize: 16,
		color: '#00827E',
	},
}));

type FilterType = {
	values: string[];
	searchQueryParam: string;
	filterQueryParam: string[];
};

const Filter: React.FC<FilterType> = ({values, searchQueryParam, filterQueryParam}) => {
	const {width} = useViewportSize();
	const theme = useMantineTheme();
	const isMobileView = theme.breakpoints.md > width;
	const {classes} = useStyles({isMobileView});
	const [value, toggle] = useToggle(['ResourcesType', null]);

	const [checkboxState, setCheckboxState] = React.useState<Record<string, boolean>>({});
	const [searchText, setSearchText] = React.useState('');

	React.useEffect(() => {
		const initCheckboxState = values.reduce((obj, str) => ({...obj, [str]: filterQueryParam.includes(str)}), {});

		setCheckboxState(initCheckboxState);
	}, [values, filterQueryParam]);

	return (
		<Card className={classes.navigationList} mb={36}>
			<Box>
				<Title size={24} order={4} mb={28}>
					Filter By:
				</Title>

				<SearchBox
					value={searchQueryParam}
					onSubmitCallback={vs => {
						const trueKeys = Object.entries(checkboxState)
							.filter(([key, value]) => value)
							.map(([key]) => key);
						const path = generateSearchParams(trueKeys, vs.searchText);

						void navigate('/resources/search/' + path);
					}}
					placeholder='Search'
					onChange={setSearchText}
				/>
			</Box>

			{Boolean(values.length) && <Divider my={28} />}

			{Boolean(values.length) && (
				<Accordion
					value={value}
					chevronSize={24}
					classNames={{
						content: classes.accordionContent,
						control: classes.accordionControl,
						chevron: classes.chevron,
					}}
				>
					<Accordion.Item value='ResourcesType'>
						<Accordion.Control
							onClick={() => {
								toggle();
							}}
						>
							<Title size={24} order={4}>
								Content Type
							</Title>
						</Accordion.Control>
						<Accordion.Panel>
							<Box className={classes.sectionNavLinksContainer}>
								{values.map((value, index, array) => (
									<React.Fragment key={value}>
										<Checkbox
											classNames={{
												root: classes.checkboxRoot,
												label: checkboxState[value] ? classes.checkboxLabelChecked : classes.checkboxLabel,
											}}
											onChange={e => {
												const newState = {
													...checkboxState,
													[value]: (e.target as HTMLInputElement).checked,
												};

												const trueKeys = Object.entries(newState)
													.filter(([key, value]) => value)
													.map(([key]) => key);

												const path = generateSearchParams(trueKeys, searchText);

												setCheckboxState({...newState});

												void navigate('/resources/search/' + path);
											}}
											label={value}
											checked={Boolean(checkboxState[value])}
										/>

										{index !== array.length - 1 && <Divider my={0} />}
									</React.Fragment>
								))}
							</Box>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			)}
		</Card>
	);
};

export default Filter;
