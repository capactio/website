import React, {FunctionComponent, useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import CookieBanner from 'react-cookie-banner';

const styles = {
	banner: {
		position: 'fixed',
		textAlign: 'center',
		width: '100%',
		height: 'auto',
		zIndex: '9999',

		bottom: '0px',
		padding: '10px',

		background: 'var(--capact-orange-lighter)',
		opacity: '0.9',
		fontSize: '1rem',
	},
	button: {
		border: '1px solid black',
		borderRadius: 4,
		width: 54,
		height: 24,
		lineHeight: '24px',
		background: 'transparent',
		color: 'black',
		fontSize: '12px',
		fontWeight: 600,
	},
	message: {
		display: 'block',
		padding: '9px 67px',
		lineHeight: 1.3,
		textAlign: 'center',
		marginRight: 244,
		color: 'black'
	},
	link: {
		display: 'block',
		padding: '9px 67px',
		lineHeight: 1.3,
		textAlign: 'center',
		marginRight: 244,
		color: 'black'
	}
}
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
			styles={styles}
			message="By continuing to use our site you are consenting to Capact using cookies in accordance with our "
			dismissOnScroll={false}
			onAccept={() => {}}
			buttonMessage={"Close"}
			link={
				<>
					<a href="/disclaimer">Cookie Policy.</a>
				{/*	TODO: change colors*/}
				</>
			}
			cookie="user-has-accepted-cookies"/>
	);
};
