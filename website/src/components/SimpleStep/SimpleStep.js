import React from 'react';
import styles from './SimpleStep.module.scss';

const features = [
	{
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="#A13455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<rect x="3" y="11" width="18" height="11" rx="2" />
				<path d="M7 11V7a5 5 0 0 1 10 0v4" />
			</svg>
		),
		title: 'Easy to start, trivial to secure',
		description:
			'Start by prototyping your infrastructure with an on-disk key, switch to an HSM when it makes sense.',
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="#A13455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				<polyline points="9 12 11 14 15 10" />
			</svg>
		),
		title: 'MavSeal signs only the operations you want',
		description:
			'Set policy on the type of Mavryk Operations you want to allow signing. Are you running a baker? Limit it to blocks and endorsements. Institution? MavSeal can enforce policies.',
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="#A13455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
			</svg>
		),
		title: 'Built with observability',
		description:
			'Critical infrastructure monitoring is crucial. MavSeal exposes operational metrics for Prometheus allowing teams to monitor operations with the tools they have already invested in.',
	},
];

export default function SimpleStep() {
	return (
		<section className={styles.features}>
			<div className={styles.featuresInner}>
				{features.map((feat, idx) => (
					<div key={idx} className={styles.feat}>
						<div className={styles.featIcon}>{feat.icon}</div>
						<h4 className={styles.featTitle}>{feat.title}</h4>
						<p className={styles.featDesc}>{feat.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
