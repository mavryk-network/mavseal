import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import IconExternalLink from '@theme/Icon/ExternalLink';
import FooterForm from '../../components/FooterForm/FooterForm';

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
	const toUrl = useBaseUrl(to);
	const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

	return (
		<Link
			className="footer__link-item"
			{...(href
				? { href: prependBaseUrlToHref ? normalizedHref : href }
				: { to: toUrl })}
			{...props}
		>
			{href && !isInternalUrl(href) ? (
				<span>
					{label}
					<IconExternalLink />
				</span>
			) : (
				label
			)}
		</Link>
	);
}

function Footer() {
	const { footer } = useThemeConfig();
	const { links = [] } = footer || {};

	if (!footer) {
		return null;
	}

	return (
		<footer className={clsx('footer', styles.footer)}>
			<div className="container">
				{links && links.length > 0 && (
					<div className="row footer__links">
						{links.map((linkItem, i) => (
							<div key={i} className="col footer__col">
								{linkItem.title != null ? (
									<div className="footer__title">{linkItem.title}</div>
								) : null}
								{linkItem.items != null &&
								Array.isArray(linkItem.items) &&
								linkItem.items.length > 0 ? (
									<ul className="footer__items">
										{linkItem.items.map((item, key) =>
											item.html ? (
												item.html === 'form' ? (
													<li key={key} className="footer__item">
														<FooterForm />
													</li>
												) : item.html === 'image' ? (
													<a
														key={key}
														href="/"
														rel="noreferrer noopener"
														aria-label="MavSeal Home"
														className="footerLogoLink"
													>
														<img
															src={useBaseUrl('/img/footer-logo.svg')}
															alt="MavSeal"
															className="themedDocusaurus"
														/>
													</a>
												) : (
													<li
														key={key}
														className="footer__item"
														dangerouslySetInnerHTML={{
															__html: item.html,
														}}
													/>
												)
											) : (
												<li key={item.href || item.to} className="footer__item">
													<FooterLink {...item} />
												</li>
											)
										)}
									</ul>
								) : null}
							</div>
						))}
					</div>
				)}
			</div>
			<div className="footer__copyright">
				{`Copyright \u00A9 ${new Date().getFullYear()} Mavryk Network - Apache License 2.0`}
			</div>
		</footer>
	);
}

export default Footer;
