import {Script} from 'gatsby';
import React from 'react';
import {isProduction} from 'utils/isProduction';

type SEOProps = {
	title: string;
	children?: React.ReactNode;
};

export const SEO: React.FC<SEOProps> = ({title, children}) => (
	<>
		<title>{title}</title>
		{children}

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
	</>
);
