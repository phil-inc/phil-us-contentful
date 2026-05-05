import React from "react";
import { Box } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import type { Paragraph } from "@contentful/rich-text-types";

import type { TResource } from "types/resource";

import * as classes from "./GtnOpportunityPullQuote.module.css";

type Props = {
	resource: TResource;
};

function paragraphHasItalic(node: Paragraph): boolean {
	return node.content.some(
		(c) =>
			c.nodeType === "text" &&
			Boolean(c.marks?.some((m) => m.type === MARKS.ITALIC)),
	);
}

const GtnOpportunityPullQuote: React.FC<Props> = ({ resource }) => {
	const { body } = resource;

	const options: Options = {
		renderMark: {
			[MARKS.BOLD]: (children) => <strong>{children}</strong>,
			[MARKS.ITALIC]: (children) => <em>{children}</em>,
		},
		renderNode: {
			[BLOCKS.HEADING_1]() {
				return null;
			},
			[BLOCKS.HEADING_4](_node, children) {
				return <p className={classes.role}>{children}</p>;
			},
			[BLOCKS.PARAGRAPH](node, children) {
				const isQuoteParagraph = paragraphHasItalic(node as Paragraph);
				return (
					<p
						className={
							isQuoteParagraph ? classes.quoteParagraph : classes.companyParagraph
						}
					>
						{children}
					</p>
				);
			},
		},
	};

	return (
		<Box className={classes.root} data-component="gtn-opportunity-pull-quote">
			<Box className={classes.accent} aria-hidden />
			<Box className={classes.inner}>
				<span className={classes.quoteMark} aria-hidden>
					&ldquo;
				</span>
				{body && renderRichText(body, options)}
			</Box>
		</Box>
	);
};

export default GtnOpportunityPullQuote;
