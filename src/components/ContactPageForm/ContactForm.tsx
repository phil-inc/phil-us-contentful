import React from 'react';
import {Anchor, Box, Text, Button, Grid, Group, Textarea, TextInput} from '@mantine/core';
import {ContactFormProvider, useContactForm} from 'contexts/ContactFormContext';
import http from 'utils/http';
import {HttpStatusCode} from 'axios';

const ContactForm: React.FC = () => {
	const [isLoading, setisLoading] = React.useState(false);
	const [isSubmitted, setisSubmitted] = React.useState(false);

	const form = useContactForm({
		initialValues: {
			email: '',
			firstname: '',
			lastname: '',
			companyDomainName: '',
			companyName: '',
			phone: '',
			message: '',
			who: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		const portalId = '23154898';
		const formGuid = '31cd219d-e1fd-441e-aeb7-b5681e821779';
		const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

		const formData = {
			fields: [
				{
					name: 'firstname',
					value: values.firstname,
				},
				{
					name: 'lastname',
					value: values.lastname,
				},
				{
					name: 'company',
					value: values.companyName,
				},
				{
					name: 'domain',
					value: values.companyDomainName,
				},
				{
					name: 'email',
					value: values.email,
				},
				{
					name: 'message',
					value: values.message,
				},
				{
					name: 'who_are_you_',
					value: values.who,
				},
				{
					name: 'phone',
					value: values.phone,
				},
			],
			context: {
				pageUri: 'https://www.example.com/form-page',
				pageName: 'Example Form Page',
			},
		};

		try {
			setisLoading(false);

			const res = await http.post(url, formData);

			if (res.status === HttpStatusCode.Ok) {
				setisSubmitted(true);
			}
		} catch (error: unknown) {
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	return (
		<ContactFormProvider form={form}>
			{isSubmitted ? (
				<Text>Thanks for submitting the form!</Text>
			) : form.values.who.length ? (
				<form
					onSubmit={form.onSubmit(async values => {
						await onSubmit(values);
					})}
				>
					<Box mb={16}>
						<Group position='apart' grow>
							<TextInput required label='First name' {...form.getInputProps('firstname')} />
							<TextInput required label='Last name' {...form.getInputProps('lastname')} />
						</Group>
						<Group grow>
							<TextInput label='Company name' {...form.getInputProps('companyName')} />
							<TextInput label='Company domain name' {...form.getInputProps('companyDomainName')} />
						</Group>

						<TextInput required label='Email' {...form.getInputProps('email')} />
						<TextInput label='Phone number' {...form.getInputProps('phone')} />
						<Textarea label='Message' {...form.getInputProps('message')} />
					</Box>
					<Button type='submit' loading={isLoading}>
						Submit
					</Button>
				</form>
			) : (
				<Grid>
					<Grid.Col span={6}>
						<Anchor style={{textDecoration: 'none'}} href='https://my.phil.us' target='_blank'>
							<Button fullWidth>Patient/Caregiver</Button>
						</Anchor>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button
							onClick={() => {
								form.setValues({who: 'HCP'});
							}}
							fullWidth
						>
							HCP
						</Button>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button
							onClick={() => {
								form.setValues({who: 'Manufacturer'});
							}}
							fullWidth
						>
							Manufacturer
						</Button>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button
							onClick={() => {
								form.setValues({who: 'Other'});
							}}
							fullWidth
						>
							Other
						</Button>
					</Grid.Col>
				</Grid>
			)}
		</ContactFormProvider>
	);
};

export default ContactForm;
