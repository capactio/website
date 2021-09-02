import React, {FunctionComponent, useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import CookieBanner from 'react-cookie-banner';
import styles from "./CookiesBanner.module.css";

export const CookiesMessageBanner: FunctionComponent = () => {
	const cookies = new Cookies();
	const [init, setInit] = useState<boolean>(false);

	useEffect(() => {
		setInit(true);
	}, []);

	if (!init || !cookies || cookies.get("accepts-cookies")) {
		return null;
	}

	return (
		<CookieBanner
			disableStyle={true}
			className={styles.banner}
			message="By continuing to use our site you are consenting to Capact using cookies in accordance with our "
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
