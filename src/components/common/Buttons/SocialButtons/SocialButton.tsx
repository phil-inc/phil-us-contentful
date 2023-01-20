import {ActionIcon, Anchor, createStyles, Tooltip} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import type {TablerIcon} from '@tabler/icons';
import React from 'react';
import {ESocialShare} from 'types/social';
import {copyLocationToClipboard} from 'utils/clipboard';
import {getShareLink} from 'utils/socialShare';

type TSocialButton = {
	type: ESocialShare;
	icon: TablerIcon;
	tooltipLabel?: string;
};

const SocialButton: React.FC<TSocialButton> = ({icon: IconComponent, tooltipLabel, type}) => {
	const {hovered, ref} = useHover();

	const useStyles = createStyles(() => ({
		socialButton: {
			color: '#01201F',
			background: '#f4f4f4',

			':hover': {
				color: '#FFF',
				background: '#000',
			},
		},

		socialIcon: {
			fill: hovered ? '#fff' : '#01201F',
			strokeWidth: '0',
		},

		tooltip: {
			color: '#01201F',
		},
	}));

	const {classes} = useStyles();

	const isCustom = type === ESocialShare.Custom;
	const usePropLabel = Boolean(tooltipLabel) || isCustom;
	const computedLabel = usePropLabel ? tooltipLabel : `Share on ${type}`;

	const onClick = async () => {
		await copyLocationToClipboard();
	};

	return (
		<Tooltip className={classes.tooltip} label={computedLabel} withArrow arrowSize={10}>
			<Anchor href={getShareLink(type)} target='_blank' onClick={onClick}>
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
			</Anchor>
		</Tooltip>
	);
};

export default SocialButton;
