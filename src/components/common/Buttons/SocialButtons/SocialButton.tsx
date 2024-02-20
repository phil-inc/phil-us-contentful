import React from 'react';
import {ActionIcon, Anchor, Tooltip} from '@mantine/core';
import {useClipboard, useHover} from '@mantine/hooks';
import type {TablerIcon} from '@tabler/icons';
import {ESocialShare} from 'types/social';
import {getShareLink} from 'utils/socialShare';
import {getWindowProperty} from 'utils/getWindowProperty';

import * as classes from './socialButton.module.css';

type TSocialButton = {
	type: ESocialShare;
	icon: TablerIcon;
	tooltipLabel?: string;
};

const SocialButton: React.FC<TSocialButton> = ({icon: IconComponent, tooltipLabel, type}) => {
	const clipboard = useClipboard({timeout: 5000});
	const [href, setHref] = React.useState<string>();

	const {hovered, ref} = useHover();

	const isCopyLink = type === ESocialShare.CopyLink;

	const computeLabel = (type: ESocialShare) => {
		const usePropLabel = Boolean(tooltipLabel?.length);
		if (usePropLabel) {
			return tooltipLabel;
		}

		if (isCopyLink) {
			return ESocialShare.CopyLink;
		}

		return `Share on ${type}`;
	};

	const computedLabel = clipboard.copied ? 'Link Copied!' : computeLabel(type);

	const onClick = async () => {
		const url = getShareLink(type, href);
		clipboard.copy(url);
	};

	React.useEffect(() => {
		const url: string = getWindowProperty('location.href', 'phil.us');
		setHref(url);
	}, []);

	return (
		<Anchor
			href={isCopyLink ? undefined : getShareLink(type, href)}
			target='_blank'
			onClick={isCopyLink ? onClick : undefined}
			underline='never'
			referrerPolicy='no-referrer'
		>
			<Tooltip
				className={classes.tooltip}
				opened={clipboard.copied || hovered}
				disabled={!hovered || !clipboard.copied}
				data-copied={clipboard.copied}
				label={computedLabel}
				withArrow
				arrowSize={10}
				closeDelay={0}
			>
				<ActionIcon
					ref={ref}
					data-copied={clipboard.copied}
					data-hovered={hovered}
					component='div'
					size={40}
					variant='filled'
					radius='xl'
					className={classes.socialButton}
				>
					<IconComponent className={classes.socialIcon} size={16} />
				</ActionIcon>
			</Tooltip>
		</Anchor>
	);
};

export default SocialButton;
