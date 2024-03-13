import React from 'react';

export function FacebookIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			xmlns='http://www.w3.org/2000/svg'
			data-icon='facebook'
			{...props}
		>
			<path
				d='M2.97 18.93V10.26H0V7.11H2.97V5.01C2.97 1.52 4.66 0 7.55 0C8.93 0 9.66 0.1 10.01 0.15V2.9H8.04C6.81 2.9 6.39 4.06 6.39 5.37V7.09H9.98L9.49 10.24H6.38V18.94L2.96 18.92L2.97 18.93Z'
				fill={props.fill}
			/>
		</svg>
	);
}
