import React from 'react';
import {Image, TextInput} from '@mantine/core';
import {searchIcon} from 'assets/images';
import {useForm} from '@mantine/form';

import * as classes from './searchBox.module.css';

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
