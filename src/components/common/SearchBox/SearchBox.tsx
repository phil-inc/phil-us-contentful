import React from 'react';
import {Image, TextInput, createStyles} from '@mantine/core';
import {searchIcon} from 'assets/images';
import {useForm} from '@mantine/form';

const useStyles = createStyles(() => ({
	searchInput: {
		borderRadius: 0,
		borderColor: '#6A7979',

		'::placeholder': {
			color: '#0A0A0A',
		},
	},

	rightSection: {
		width: 'fit-content',
		paddingRight: 12,
	},
}));

type SearchBoxType = {
	placeholder: string;
	onChange?: (searchText: string) => void;
	onSubmitCallback: (values: FormValuesType) => void;
	value: string;
};

type FormValuesType = {
	searchText: string;
};

const SearchBox: React.FC<SearchBoxType> = ({onChange, placeholder, onSubmitCallback, value}) => {
	const {classes} = useStyles();
	const form = useForm<FormValuesType>({
		initialValues: {
			searchText: value,
		},
	});

	React.useEffect(() => {
		if (onChange) {
			onChange(form.values.searchText);
		}
	}, [form.values.searchText]);

	return (
		<form onSubmit={form.onSubmit(onSubmitCallback)}>
			<TextInput
				classNames={{
					input: classes.searchInput,
					rightSection: classes.rightSection,
				}}
				autoComplete='off'
				rightSection={<Image src={searchIcon as string} width={14} />}
				placeholder={placeholder}
				{...form.getInputProps('searchText')}
			/>
		</form>
	);
};

export default SearchBox;
