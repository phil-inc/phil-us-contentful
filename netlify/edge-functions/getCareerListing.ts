import type {Config} from 'https://edge.netlify.com';

const getCareerListing = async (request: Request) => {
	const uri = Deno.env.get('ASHBY_FEED_URI');
	if (!uri) {
		const error = 'Failed to initiate function. URI is undefined.';
		console.error(error);
		return new Response(JSON.stringify({error}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	let origin: string;
	try {
		origin = request.headers.get('origin') || new URL(request.headers.get('referer') || '').origin || '';
	} catch (err) {
		console.error('Unable to determine request origin from headers', err);
		origin = '';
	}

	const allowedOrigins = Deno.env.get('ALLOWED_ORIGINS')?.split(',') || [];
	if (!allowedOrigins.includes(origin)) {
		return new Response(JSON.stringify({error: 'Not allowed'}), {
			status: 403,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': origin,
			},
		});
	}

	try {
		const response = await fetch(uri);
		if (!response.ok) {
			throw new Error('Fetch career feed failed!');
		}

		const {jobs} = await response.json();
		const myJobs = jobs?.map(
			({
				title,
				department,
				jobUrl,
				address: {
					postalAddress: {addressLocality, addressRegion, addressCountry},
				},
			}: any) => {
				const location = [addressLocality, addressRegion, addressCountry].filter(Boolean).join(', ');
				return {title, location, department, url: jobUrl};
			}
		);

		return new Response(JSON.stringify(myJobs), {
			status: 200,
			headers: {
				'cache-control': 'public, s-maxage=120',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': origin,
			},
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({error: `Failed to fetch or parse jobs: ${error.message}`}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};

export default getCareerListing;

export const config: Config = {path: '/api/get-career-listing', cache: 'manual'};
