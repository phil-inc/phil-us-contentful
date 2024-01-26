import {Group, Text} from '@mantine/core';
import React from 'react';
import {ESocialShare} from 'types/social';
import {FacebookIcon} from '../../common/Buttons/SocialButtons/FacebookIcon';
import {LinkedinIcon} from '../../common/Buttons/SocialButtons/LinkedinIcon';
import {LinkIcon} from '../../common/Buttons/SocialButtons/LinkIcon';
import SocialButton from '../../common/Buttons/SocialButtons/SocialButton';
import {TwitterIcon} from '../../common/Buttons/SocialButtons/TwitterIcon';

import * as classes from './socialShare.module.css';

const SocialShare: React.FC = () => (
	<Group justify="left" gap="sm">
		<Text className={classes.text}>
			Share this article on:
		</Text>
		<Group gap="sm">
			<SocialButton type={ESocialShare.Facebook} icon={FacebookIcon as React.FC} />
			<SocialButton type={ESocialShare.Linkedin} icon={LinkedinIcon as React.FC} />
			<SocialButton type={ESocialShare.Twitter} icon={TwitterIcon as React.FC} />
			<SocialButton type={ESocialShare.CopyLink} icon={LinkIcon as React.FC} />
		</Group>
	</Group>
);

export default SocialShare;
