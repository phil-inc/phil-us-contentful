import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {SEO} from 'layouts/SEO/SEO';
import {Box, Grid, Title, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import {handleSpacing} from 'utils/handleSpacing';
import {Script} from 'gatsby';

const isProduction = process.env.NODE_ENV === 'production';

type HelmetProps = {
	pageContext: ContentfulPage;
};

export const Head: React.FC<HelmetProps> = ({pageContext}) => {
	const heroSection = pageContext.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;

	return (
		<SEO title={pageContext.title}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={pageContext.title} />
			<meta name='twitter:description' content={pageContext.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={pageContext.description} />
			<meta property='og:title' content={pageContext.title} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={pageContext.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta
				property='og:url'
				content={`https://phil.us${pageContext.title === 'Home' ? '/' : `/${pageContext.title}`}`}
			/>
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
			{/* FormComplete Snippet */}
			{isProduction && pageContext.title === 'Contact' ? (
				<Script>
					{`(function() {
					window._zi = {formId: '2a091fcc-1139-440c-83c4-d170f9678a32', formLoadTimeout:4000};
					var zi = document.createElement('script');
					zi.type = 'text/javascript';
					zi.async = true;
					zi.src = 'https://ws-assets.zoominfo.com/formcomplete.js';
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(zi, s);
					})();`}
				</Script>
			) : null}

			{/* Tracking Pixel */}
			{isProduction ? (
				<Script>
					{`
		(function (options) {
			var s = document.createElement("script");
			s.async = true;
			s.src = "https://metadata-static-files.sfo2.cdn.digitaloceanspaces.com/pixel/lp.js";
			s.onload = function () {
			window.Metadata.pixel.init(options);
			};
			document.head.appendChild(s);
			})({
			primaryKey: "name",
			onReady: function () {
			var minutes = 30;
			var setCookie = function (name, value) {
			var expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
			document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=phil.us; expires=" + expires;
			};
			var cid = new URLSearchParams(window.location.search).get("metadata_cid");
			
			if (cid) {
			setCookie("metadata_cid", cid);
			}
			},
			adjustDataBeforeSend: function (data) {
			var getCookie = function (name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if (parts.length === 2) return parts.pop().split(";").shift();
			};
			
			return Object.assign(data, {
			metadata_cid: getCookie("metadata_cid"),
			});
			},
			});			
		`}
				</Script>
			) : null}
		</SEO>
	);
};

type PageTemplateProps = {
	pageContext: ContentfulPage;
};

const PageTemplate: React.FC<PageTemplateProps> = ({pageContext}) => {
	const {id, sections, title} = pageContext;
	const theme = useMantineTheme();

	let basicSectionCount = 0;

	return (
		<Layout>
			{title === 'Resources' && (
				<Expanded id={id} mb={handleSpacing(theme, 128)}>
					<Grid align='center' justify='space-between'>
						<Grid.Col span={12}>
							<Box>
								<Title order={2}>Resources</Title>
							</Box>
						</Grid.Col>
					</Grid>
				</Expanded>
			)}
			{sections
				.filter(section => !section.isHidden)
				.map(section => (
					<Section
						key={section.id + 'mapSectionComponent'}
						section={section}
						index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
					/>
				))}
		</Layout>
	);
};

export default PageTemplate;
