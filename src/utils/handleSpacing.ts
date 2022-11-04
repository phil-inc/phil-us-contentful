import type {MantineTheme} from '@mantine/core';

export const handleSpacing = (theme: MantineTheme, spacing: number) =>
	theme.fn.largerThan('sm') ? spacing : spacing / 2;
