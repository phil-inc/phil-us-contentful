import React from 'react';
import {Script} from 'gatsby';

const ZoominfoAnalytics = () => {
	const [shouldExecute, setShouldExecute] = React.useState(false);

	React.useEffect(() => {
		if (!window.zi) {
			setShouldExecute(true);
		}
	}, []);

	return (
		shouldExecute && (
			<Script>
				{`
    window.ZIProjectKey = "${process.env.GATSBY_ZI_PROJECT_KEY ?? ''}"; 
    var zi = document.createElement('script');
    (zi.type = 'text/javascript'),
    (zi.async = true),
    (zi.src = 'https://js.zi-scripts.com/zi-tag.js'),
    document.readyState === 'complete'?
    document.body.appendChild(zi):
    window.addEventListener('load', function(){
    document.body.appendChild(zi)
    });
`}
			</Script>
		)
	);
};

export default ZoominfoAnalytics;
