export {};

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		Trustpilot?: {
			loadFromElement: (element: HTMLElement | undefined, useCache?: boolean) => void;
			// Add other methods and properties here
		};
	}
}
