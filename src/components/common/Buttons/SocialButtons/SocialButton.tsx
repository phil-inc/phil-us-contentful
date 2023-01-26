import React from 'react';
import {ActionIcon, Anchor, createStyles, Tooltip} from '@mantine/core';
import {useClipboard, useHover, useTimeout} from '@mantine/hooks';
import type {TablerIcon} from '@tabler/icons';
import {ESocialShare} from 'types/social';
import {getShareLink} from 'utils/socialShare';

type TSocialButton = {
	type: ESocialShare;
	icon: TablerIcon;
	tooltipLabel?: string;
};

const SocialButton: React.FC<TSocialButton> = ({icon: IconComponent, tooltipLabel, type}) => {
	const {hovered, ref} = useHover();
	const clipboard = useClipboard({timeout: 5000});
  
	const [url, setUrl] = React.useState(getShareLink(type));
	const {start: clearClipboard} = useTimeout(() => {
		clipboard.reset();
	}, 100);

	const useStyles = createStyles(() => ({
		socialButton: {
			color: '#01201F',
			background: '#f4f4f4',

			':hover': {
				color: clipboard.copied ? '#FFF' : '#FFF',
				background: clipboard.copied ? '#11827D' : '#000',
			},
		},

		socialIcon: {
			fill: hovered ? '#fff' : '#01201F',
			strokeWidth: '0',
		},
	}));

	const {classes} = useStyles();

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
		const url = getShareLink(type);
		clipboard.copy(url);
	};

	React.useEffect(() => {
		if (!isCopyLink) {
			setUrl(getShareLink(type));
		}
	}, [isCopyLink]);

	React.useEffect(() => {
		if (!hovered && clipboard.copied) {
			clearClipboard();
		}
	}, [hovered]);

	return (
		<Anchor href={isCopyLink ? null : url} target='_blank' onClick={isCopyLink ? onClick : null}>
			<Tooltip
				color={clipboard.copied ? '#11827D' : '#01201F'}
				label={computedLabel}
				withArrow
				arrowSize={10}
				closeDelay={0}
			>
				<ActionIcon
					ref={ref}
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
