import {useLocation} from '@reach/router';

export const isIndex = () => {
	const location = useLocation();

	return location.pathname === '/';
};
