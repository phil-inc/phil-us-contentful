import {createFormContext} from '@mantine/form';

type ContactFormValues = {
	firstname: string;
	lastname: string;
	companyName: string;
	companyDomainName: string;
	phone: string;
	email: string;
	message: string;
	who: string;
};

export const [ContactFormProvider, useContactFormContext, useContactForm] = createFormContext<ContactFormValues>();
