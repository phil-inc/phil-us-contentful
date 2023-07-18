import {parse} from 'https://deno.land/x/xml@2.1.1/mod.ts';
import type {Config} from 'https://edge.netlify.com';

const getCareerListing = async (request: Request) => {
	let origin;

	// fetch allowed origins from netlify
	const allowedOrigins = Deno.env.get('ALLOWED_ORIGINS');
	const uri = Deno.env.get('ISOLVEDHIRE_FEED_URI');

	if (allowedOrigins == undefined || uri == undefined) {
		const error = "Failed to initiate function."
		console.error(error);
		return new Response(JSON.stringify({error}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	try {
		origin = request.headers.get('origin') || new URL(request.headers.get('referer') || '').origin;
	} catch (err) {
		// This will be triggered if the URL constructor fails, e.g., due to an invalid URL in the "referer" header.
		console.log('Unable to determine request origin from headers', err);
		// Default origin if both headers are not available or invalid.
		origin = '';
	}

	// If the origin is not allowed or not the same origin, deny the request
	if (!allowedOrigins.includes(origin)) {
		return new Response(JSON.stringify({error: 'Not allowed'}), {
			status: 403,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	try {
		const response = await fetch(uri);

		const text = await response.text();
		const json = parse(text);

		if (!response.ok) {
			throw Error('Fetch career feed failed!');
		}

		const jobs = json?.source?.job
			? json?.source?.job?.map((j: any) => {
					const locationString = [j.city, j.state, j.country];
					const ls = locationString.filter((item: string) => Boolean(item)).join(', ');

					return {
						title: j.title,
						url: j.url,
						location: ls,
						department: j.department,
					};
			  })
			: [];

		// Return JSON response
		return new Response(JSON.stringify(jobs), {
			status: 200,
			headers: {
				'cache-control': 'public, s-maxage=120',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': origin,
			},
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({error: `Failed to parse XML: ${error.message}`}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};

export default getCareerListing;

export const config: Config = {path: '/api/get-career-listing', cache: 'manual'};
