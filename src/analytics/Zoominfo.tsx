import React from 'react';
import {Script} from 'gatsby';

const ZoominfoAnalytics = () => (
	<Script>
		{`
        window.ZIProjectKey = ${process.env.GATSBY_ZI_PROJECT_KEY}; 
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
);

export default ZoominfoAnalytics;
