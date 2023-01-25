import React from 'react';

export type IMixpanel = {
	track: (eventName: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const track = (eventName: string) => {};

export const MixpanelContext = React.createContext<IMixpanel>({track});
