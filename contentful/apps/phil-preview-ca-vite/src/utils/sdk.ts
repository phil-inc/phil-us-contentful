import {type KnownAppSDK} from '@contentful/app-sdk';

export const getInstanceParameter = (sdk: KnownAppSDK, parameterKey: string): string => sdk.parameters.instance[parameterKey] as string;
