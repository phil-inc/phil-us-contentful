import type {Config} from 'https://edge.netlify.com';
import {TAM_DOMAINS} from './lib/tamDomains.ts';

/**
 * Target-account (TAM) domain check for the demo flow — MRTG-1438.
 *
 * The demo page sends only the submitter's email domain and gets back a single
 * boolean. The domain list lives in tamDomains.ts (server-only), so it is never
 * shipped to the browser.
 */
const targets = new Set(TAM_DOMAINS.map((d) => d.trim().toLowerCase()));
console.log(targets);

const isTargetAccount = async (request: Request) => {
	const url = new URL(request.url);
	const raw = (url.searchParams.get('domain') || '').trim().toLowerCase();
	// Accept a bare domain (abbvie.com) or a full email, and reduce to the domain.
	const domain = raw.includes('@') ? raw.split('@')[1] : raw;
	const isTAM = Boolean(domain) && targets.has(domain);

	return new Response(JSON.stringify({isTAM}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-store',
		},
	});
};

export default isTargetAccount;

export const config: Config = {path: '/api/is-target-account', cache: 'manual'};
