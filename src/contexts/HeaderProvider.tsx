import React from 'react';
import {type TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import {type TResource} from 'types/resource';

export type THeaderContext = {
	minimal: boolean;
	isDrawer: boolean;
	toggleDrawer: (value?: boolean) => void;
	close: () => void;
	header: {
		logo: TAsset;
		navigationLinks: ContentfulPage[];
	};
	pages: ContentfulPage[];
	allContentfulResource: {nodes: Array<Pick<TResource, 'id' | 'heading' | 'relatesTo'>>};
	opened: boolean;
	setCollapseRef: React.Dispatch<React.SetStateAction<HTMLDivElement | undefined>>;
	target: string;
};

const HeaderContext = React.createContext({} as THeaderContext);

export default HeaderContext;
