import {Group, Text} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import React from 'react';
import {ESocialShare} from 'types/social';
import {FacebookIcon} from '../../common/Buttons/SocialButtons/FacebookIcon';
import {LinkedinIcon} from '../../common/Buttons/SocialButtons/LinkedinIcon';
import {LinkIcon} from '../../common/Buttons/SocialButtons/LinkIcon';
import SocialButton from '../../common/Buttons/SocialButtons/SocialButton';
import {TwitterIcon} from '../../common/Buttons/SocialButtons/TwitterIcon';


import * as classes from './socialShare.module.css';

const SocialShare: React.FC = () => {

	return (
		<Group position='left' spacing='sm'>
			<Text className={classes['font-lato']} size={16} m={0} color='#6B7979'>
				Share this article on:
			</Text>
			<Group spacing='sm'>
				<SocialButton type={ESocialShare.Facebook} icon={FacebookIcon as React.FC} />
				<SocialButton type={ESocialShare.Linkedin} icon={LinkedinIcon as React.FC} />
				<SocialButton type={ESocialShare.Twitter} icon={TwitterIcon as React.FC} />
				<SocialButton type={ESocialShare.CopyLink} icon={LinkIcon as React.FC} />
			</Group>
		</Group>
	);
};

export default SocialShare;
