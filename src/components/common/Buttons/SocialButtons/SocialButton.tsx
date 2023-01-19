import {ActionIcon, createStyles, Tooltip} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import type {TablerIcon} from '@tabler/icons';
import React from 'react';

type TSocialButton = {
	icon: TablerIcon;
	tooltipLabel: string;
};

const SocialButton: React.FC<TSocialButton> = ({icon: IconComponent, tooltipLabel}) => {
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

	return (
		<Tooltip className={classes.tooltip} label={tooltipLabel} withArrow arrowSize={10}>
			<ActionIcon ref={ref} component='div' size={40} variant='filled' radius='xl' className={classes.socialButton}>
				<IconComponent className={classes.socialIcon} size={16} />
			</ActionIcon>
		</Tooltip>
	);
};

export default SocialButton;
