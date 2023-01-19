import {createStyles, Group, Text} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import React from 'react';
import {FacebookIcon} from '../../common/Buttons/SocialButtons/FacebookIcon';
import {LinkedinIcon} from '../../common/Buttons/SocialButtons/LinkedinIcon';
import {LinkIcon} from '../../common/Buttons/SocialButtons/LinkIcon';
import SocialButton from '../../common/Buttons/SocialButtons/SocialButton';
import {TwitterIcon} from '../../common/Buttons/SocialButtons/TwitterIcon';

const useStyles = createStyles(() => ({
	'font-lato': {
		fontFamily: 'Lato, sans-serif',
	},
}));

const SocialShare: React.FC = () => {
	const {classes} = useStyles();

	return (
		<Group position='left' spacing='sm'>
			<Text className={classes['font-lato']} size={16} m={0} color='#6B7979'>
				Share this article on:
			</Text>
			<Group spacing='sm'>
				<SocialButton tooltipLabel='Share on Facebook' icon={FacebookIcon as React.FC} />
				<SocialButton tooltipLabel='Share on Linkedin' icon={LinkedinIcon as React.FC} />
				<SocialButton tooltipLabel='Share on Twitter' icon={TwitterIcon as React.FC} />
				<SocialButton tooltipLabel='Copy Link' icon={LinkIcon as React.FC} />
			</Group>
		</Group>
	);
};

export default SocialShare;
