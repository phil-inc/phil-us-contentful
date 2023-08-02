import {DEV_PREVIEW_BUILD_WEBHOOK} from '../constants/api';
import {type KnownAppSDK} from '@contentful/app-sdk';
import {getInstanceParameter} from './sdk';
import {BASE_URL} from '../constants/instanceMap';
import {BUILD_HOOK} from '../constants/api';

type Request = {
	method: string;
	url: string;
	headers: Record<string, string>;
	body: string | undefined;
};

export async function signRequest(req: Request, sdk: KnownAppSDK): Promise<Request> {
	const {additionalHeaders} = await sdk.cma.appSignedRequest.create({
		appDefinitionId: sdk.ids.app!,
	}, {
		method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
		headers: req.headers,
		body: req.body,
		path: new URL(req.url).pathname,
	});
	Object.assign(req.headers, additionalHeaders);
	return req;
}

export async function triggerBuildHook(
	sdk: KnownAppSDK,
	setIsBuildTriggered: React.Dispatch<React.SetStateAction<boolean>>,
	setTimestamp: React.Dispatch<React.SetStateAction<number>>,
	setError: React.Dispatch<React.SetStateAction<string | undefined>>,
): Promise<void> {
	setIsBuildTriggered(true);
	setError(undefined);
	try {
		const baseUrl = getInstanceParameter(sdk, BASE_URL);

		const req: Request = {
			method: 'GET',
			url: baseUrl + BUILD_HOOK,
			headers: {},
			body: undefined,
		};
		const signedReq = await signRequest(req, sdk);

		const response = await fetch(signedReq.url, {
			method: signedReq.method,
			headers: signedReq.headers,
			body: signedReq.body,
		});
		if (response.ok) {
			setIsBuildTriggered(false);
			setTimestamp(Date.now()); // Update timestamp to reload image
		} else {
			console.log(`Build webhook failed with status: ${response.status}`);
			setError(`Build webhook failed with status: ${response.status}`);
			setIsBuildTriggered(false);
		}
	} catch (e) {
		if (e instanceof Error) {
			console.log(e);
			setError('An error occurred: ' + e.message);
		} else {
			setError('An unknown error occurred');
		}

		setIsBuildTriggered(false);
	}
}
