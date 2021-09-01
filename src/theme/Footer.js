// Note: importing from "@theme/Footer" would fail due to the file importing itself
import OriginalFooter from '@theme-original/Footer';
import {CookiesMessageBanner} from "../components/CookiesBanner";
import React from 'react';

export default function Footer(props) {
	return (
		<>
			<CookiesMessageBanner/>
			<OriginalFooter {...props} />
		</>
	);
}
