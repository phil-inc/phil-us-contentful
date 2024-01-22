import React from 'react';
import {useMediaQuery} from '@mantine/hooks';

type DeviceType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

const useDeviceType = (deviceType?: DeviceType): boolean | undefined => {
	const breakpoints = {
		xs: '(max-width: 39.99em)', // less than 640px
		sm: '(min-width: 40em) and (max-width: 47.99em)', // 640px - 767px
		md: '(min-width: 48em) and (max-width: 63.99em)', // 768px - 1023px
		lg: '(min-width: 64em) and (max-width: 79.99em)', // 1024px - 1279px
		xl: '(min-width: 80em)', // 1280px and up
	};

	let query = breakpoints['xs'];

	if (deviceType) {
		query = breakpoints[deviceType];
	}

	return useMediaQuery(query);
};

export default useDeviceType;
