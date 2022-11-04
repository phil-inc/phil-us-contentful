import type {MantineTheme} from '@mantine/core';

export const handleSpacing = (theme: MantineTheme, spacing: number) =>
	theme.fn.smallerThan('lg') ? spacing / 2 : spacing;
