import {useMediaQuery} from '@mantine/hooks';
/**
 * Custom hook to determine if the current view is a mobile view.
 *
 * Returns true if the screen width is less than 48em, indicating a mobile view.
 */
const useMobileView = () => {
	// Define the media query for mobile view
	const isMobile = useMediaQuery('(min-width: 48em)');

	return !isMobile;
};

export default useMobileView;
