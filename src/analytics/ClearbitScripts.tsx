import React from 'react';
import {Script} from 'gatsby';

const ClearbitScripts = () => (
	<Script
		defer
		async
		src='https://tag.clearbitscripts.com/v1/pk_cc7ad2bb46df02a6f0c687a22b250fa0/tags.js'
		referrerPolicy='strict-origin-when-cross-origin'
	/>
);

export default ClearbitScripts;
