module.exports = function (context, options) {
	const {trackingID} = options
	if (!trackingID) {
		throw new Error(
			`You need to specify 'trackingID' field to use docusaurus-plugin-gtm`,
		);
	}

	const isProd = process.env.NODE_ENV === 'production';

	return {
		name: 'docusaurus-plugin-gtm',

		injectHtmlTags() {
			if (!isProd) {
				return {};
			}
			return {
				headTags: [
					{
						tagName: 'link',
						attributes: {
							rel: 'preconnect',
							href: 'https://www.googletagmanager.com',
						},
					},
					{
						tagName: 'script',
						innerHTML: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${trackingID}');
            `,
					},
				],
				preBodyTags: [
					`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${trackingID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
				],
			};
		},
	};
};
