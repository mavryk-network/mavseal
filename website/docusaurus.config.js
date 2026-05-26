module.exports = {
	title: 'MavSeal - A Mavryk Remote Signer',
	tagline: 'MavSeal signs your Mavryk Ops while protecting your private keys',
	url: 'https://mavseal.mavryk.org',
	baseUrl: '/',
	favicon: 'img/favicon.svg',
	organizationName: 'mavryk-network', // Usually your GitHub org/user name.
	projectName: 'mavseal', // Usually your repo name.
	onBrokenLinks: 'warn',
	markdown: {
		mermaid: true,
	},
	themes: ['@docusaurus/theme-mermaid'],
	themeConfig: {
		mermaid: {
			theme: { light: 'default', dark: 'default' },
		},
		colorMode: {
			defaultMode: 'dark',
			disableSwitch: true,
			respectPrefersColorScheme: false,
			// The following value has been deprecated and will need to be re-implemented when dark mode is implemented
			// switchConfig: {
			// 	darkIcon: '🌙',
			// 	darkIconStyle: {
			// 		marginLeft: '2px',
			// 	},
			// 	// Unicode icons such as '\u2600' will work
			// 	// Unicode with 5 chars require brackets: '\u{1F602}'
			// 	lightIcon: '\u{1F602}',
			// 	lightIconStyle: {
			// 		marginLeft: '1px',
			// 	},
			// },
		},
		docs: {
			sidebar: {
			  autoCollapseCategories: true,
			},
		},
		navbar: {
			// hideOnScroll: true,
			logo: {
				alt: 'MavSeal Signer for Mavryk',
				src: 'img/header-logo.svg',
			},
			items: [
				{
					type: 'doc',
					docId: 'start',
					label: 'Docs',
					position: 'right',
					className: 'header-link',
				},
				{
					href: 'https://github.com/mavryk-network/mavseal',
					label: 'GitHub',
					position: 'right',
					className: 'header-link header-github-link',
					'aria-label': 'GitHub repository',
				},
			],
		},
		footer: {
			links: [
				{
					title: 'Contact',
					items: [
						{
							label: 'Report Issues',
							to: 'https://github.com/mavryk-network/mavseal/issues/new/choose',
						},
						{
							label: 'Contribute',
							to: 'https://github.com/mavryk-network/mavseal/blob/main/README.md',
						},
					],
				},

				{
					title: 'Community',
					items: [
						{
							label: 'Discord',
							to: 'https://discord.gg/7tJ7f9eJHY',
						},
						{
							label: 'Twitter',
							to: 'https://twitter.com/mavsealio',
						},
						{
							label: 'Code of Conduct',
							to: 'https://github.com/mavryk-network/mavseal/blob/main/CODE_OF_CONDUCT.md',
						},
						{
							label: 'GitHub',
							to: 'https://github.com/mavryk-network/mavseal',
						},
					],
				},
				{
					title: 'Docs',
					items: [
						{
							label: 'Quick Start',
							to: '/docs/start',
						},
					],
				},
				{
					items: [
						{
							html: `image`,
						},
						{
							html: `
									<p class='footerDescription'>
										A Mavryk Remote Signer
									</p>
								  `,
						},
						{
							html: `
									<a class='footerButton' href='https://github.com/mavryk-network/mavseal'>
										GITHUB
									</a>
								  `,
						},
						{
							html: `form`,
						},
					],
				},
			],
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					path: '../docs',
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/mavryk-network/mavseal/edit/master/website/',
				},
				theme: {
					customCss: [
						require.resolve('./src/css/custom.scss'),
						require.resolve('./src/css/tables.scss'),
						require.resolve('./src/css/admonitions.scss'),
						require.resolve('./src/css/codeBlock.scss'),
						require.resolve('./src/css/tabs.scss'),
					],
				},
			},
		],
	],
	plugins: ['docusaurus-plugin-sass'],
};
