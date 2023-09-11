import type {Config} from 'https://edge.netlify.com';
import {verifyRequest} from 'https://esm.sh/@contentful/node-apps-toolkit@2.2.0';

const corsHeaders = {
	'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGINS_CONTENTFUL_APP') || '',
	'Access-Control-Allow-Headers':
		'x-contentful-environment-id,x-contentful-signed-headers,x-contentful-space-id,x-contentful-timestamp,x-contentful-user-id,x-contentful-signature',
};

const hasRequiredHeaders = (headers: Headers): boolean => {
	return corsHeaders['Access-Control-Allow-Headers'].split(',').every(header => headers.has(header));
};

const hasRequiredOrigin = (origin: string): boolean => {
	const allowedOrigins = corsHeaders['Access-Control-Allow-Origin'];

	if (allowedOrigins) {
		return corsHeaders['Access-Control-Allow-Origin'].split(',').some(o => o === origin || o === "*");
	}

	return false;
};

const withCors = (handler: (request: Request) => Promise<Response>) => async (request: Request) => {
	if (request.method === 'OPTIONS') {
		return new Response('OK', {headers: corsHeaders});
	}

	if (!hasRequiredHeaders(request.headers) && !hasRequiredOrigin(request.headers.get('origin') || '')) {
		return new Response('Bad Request', {status: 400});
	}

	const response = await handler(request);
	response.headers.append('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
	response.headers.append('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
	return response;
};

const triggerNetlifyBuild = async (buildHookUrl: string) => {
	return await fetch(buildHookUrl, {method: 'POST'});
};

const handleContentfulRequestToBuild = async (request: Request) => {
	try {
		const key = Deno.env.get('CONTENTFUL_SIGNING_KEY');
		const webhook = Deno.env.get('PREVIEW_BUILD_WEBHOOK');
		if (!webhook || !key) {
			return new Response('Bad setup vars!', {status: 500});
		}
		const canonicalRequest = {
			path: new URL(request.url).pathname,
			headers: Object.fromEntries(request.headers.entries()),
			method: request.method as 'GET' | 'PATCH' | 'HEAD' | 'POST' | 'DELETE' | 'OPTIONS' | 'PUT',
			body: await request.text(),
		};

		const isValid = verifyRequest(key, canonicalRequest, 0);

		if (!isValid) {
			return new Response('Unauthorized', {status: 403});
		}

		const res = await triggerNetlifyBuild(webhook);
		if (res.ok) {
			return new Response('OK', {status: 200});
		}

		return new Response(res.body, {status: res.status});
	} catch (error) {
		return new Response(error.message, {status: 403});
	}
};

export default withCors(handleContentfulRequestToBuild);

export const config: Config = {path: '/api/contentful/apps/phil-preview-ca'};
