import React, {FunctionComponent} from "react";
import CookieBanner, {Cookies} from 'react-cookie-banner';
import styles from "./CookiesBanner.module.css";

export const CookiesMessageBanner: FunctionComponent = () => {
	const cookies = new Cookies();

	if (!cookies || cookies.get("accepts-cookies")) {
		return null;
	}

	return (
		<CookieBanner
			disableStyle={true}
			className={styles.banner}
			message="By continuing to use our site, you consent to Capact using cookies in accordance with our "
			dismissOnScroll={false}
			buttonMessage={"Close"}
			link={
				<>
					<a href="/cookie-policy">Cookie Policy.</a>
				</>
			}
			cookie="user-has-accepted-cookies"
		/>
	);
};
