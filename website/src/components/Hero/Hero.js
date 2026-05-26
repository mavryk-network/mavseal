import React from 'react';
import styles from './Hero.module.scss';

function HeroDiagram() {
	return (
		<svg
			viewBox="0 0 520 395"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ width: '100%', maxWidth: 624 }}
		>
			<defs>
				<radialGradient id="hglow" cx="50%" cy="49%" r="40%">
					<stop offset="0%" stopColor="#A13455" stopOpacity="0.18" />
					<stop offset="100%" stopColor="#A13455" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Ambient glow */}
			<ellipse cx="260" cy="193" rx="210" ry="175" fill="url(#hglow)" />

			{/* Animated connection lines */}
			<line x1="260" y1="193" x2="260" y2="45" stroke="#C84070" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="7 5">
				<animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
			</line>
			<line x1="260" y1="193" x2="403" y2="149" stroke="#C84070" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="7 5">
				<animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" begin="0.4s" repeatCount="indefinite" />
			</line>
			<line x1="260" y1="193" x2="348" y2="316" stroke="#C84070" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="7 5">
				<animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" begin="0.8s" repeatCount="indefinite" />
			</line>
			<line x1="260" y1="193" x2="172" y2="316" stroke="#C84070" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="7 5">
				<animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" begin="1.2s" repeatCount="indefinite" />
			</line>
			<line x1="260" y1="193" x2="117" y2="149" stroke="#C84070" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="7 5">
				<animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" begin="1.6s" repeatCount="indefinite" />
			</line>

			{/* Outer node: Google KMS */}
			<g transform="translate(260,45)">
				<circle r="30" fill="#1C1530" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
				<path d="M-7,3 Q-9,-3 -4,-4 Q-4,-9 2,-8 Q8,-10 9,-5 Q13,-5 11,2 Q11,5 7,5 H-5 Q-8,5 -7,3" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" />
				<text y="44" textAnchor="middle" fill="#A0AABE" fontSize="10" fontWeight="500" fontFamily="system-ui,sans-serif">Google KMS</text>
			</g>

			{/* Outer node: Azure KMS */}
			<g transform="translate(403,149)">
				<circle r="30" fill="#1C1530" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
				<path d="M-7,3 Q-9,-3 -4,-4 Q-4,-9 2,-8 Q8,-10 9,-5 Q13,-5 11,2 Q11,5 7,5 H-5 Q-8,5 -7,3" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" />
				<text y="44" textAnchor="middle" fill="#A0AABE" fontSize="10" fontWeight="500" fontFamily="system-ui,sans-serif">Azure KMS</text>
			</g>

			{/* Outer node: Yubico HSM */}
			<g transform="translate(348,316)">
				<circle r="30" fill="#1C1530" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
				<circle cx="-6" cy="0" r="5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
				<line x1="-1" y1="0" x2="10" y2="0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
				<line x1="6" y1="0" x2="6" y2="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
				<line x1="10" y1="0" x2="10" y2="-3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
				<text y="44" textAnchor="middle" fill="#A0AABE" fontSize="10" fontWeight="500" fontFamily="system-ui,sans-serif">Yubico HSM</text>
			</g>

			{/* Outer node: Ledger */}
			<g transform="translate(172,316)">
				<circle r="30" fill="#1C1530" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
				<rect x="-10" y="-7" width="20" height="14" rx="2" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
				<rect x="-6" y="-3" width="8" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
				<line x1="-10" y1="-3" x2="-13" y2="-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<line x1="-10" y1="0" x2="-13" y2="0" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<line x1="-10" y1="3" x2="-13" y2="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<line x1="10" y1="-3" x2="13" y2="-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<line x1="10" y1="0" x2="13" y2="0" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<line x1="10" y1="3" x2="13" y2="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
				<text y="44" textAnchor="middle" fill="#A0AABE" fontSize="10" fontWeight="500" fontFamily="system-ui,sans-serif">Ledger</text>
			</g>

			{/* Outer node: AWS KMS */}
			<g transform="translate(117,149)">
				<circle r="30" fill="#1C1530" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
				<path d="M-7,3 Q-9,-3 -4,-4 Q-4,-9 2,-8 Q8,-10 9,-5 Q13,-5 11,2 Q11,5 7,5 H-5 Q-8,5 -7,3" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" />
				<text y="44" textAnchor="middle" fill="#A0AABE" fontSize="10" fontWeight="500" fontFamily="system-ui,sans-serif">AWS KMS</text>
			</g>

			{/* Center node: pulse rings */}
			<circle cx="260" cy="193" r="52" fill="none" stroke="#C84070" strokeWidth="1.5">
				<animate attributeName="r" from="52" to="90" dur="2.5s" repeatCount="indefinite" />
				<animate attributeName="stroke-opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
			</circle>
			<circle cx="260" cy="193" r="52" fill="none" stroke="#C84070" strokeWidth="1.5">
				<animate attributeName="r" from="52" to="78" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
				<animate attributeName="stroke-opacity" from="0.35" to="0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
			</circle>

			{/* Center node circle */}
			<circle cx="260" cy="193" r="50" fill="#200d18" stroke="#C84070" strokeWidth="2" />

			{/* Shield icon in center */}
			<g transform="translate(260,187) scale(0.5) translate(-32,-32)" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M55.7603 29.6515C55.7603 42.6915 46.2936 54.9048 33.3603 58.4782C32.4803 58.7182 31.5202 58.7182 30.6402 58.4782C17.7069 54.9048 8.24023 42.6915 8.24023 29.6515V17.9448C8.24023 15.7581 9.89361 13.2781 11.9469 12.4515L26.8002 6.37156C30.1335 5.01156 33.8936 5.01156 37.2269 6.37156L52.0802 12.4515C54.1069 13.2781 55.7869 15.7581 55.7869 17.9448L55.7603 29.6515Z" strokeMiterlimit="10" />
				<path d="M31.9998 33.3307C34.9454 33.3307 37.3332 30.9429 37.3332 27.9974C37.3332 25.0519 34.9454 22.6641 31.9998 22.6641C29.0543 22.6641 26.6665 25.0519 26.6665 27.9974C26.6665 30.9429 29.0543 33.3307 31.9998 33.3307Z" strokeMiterlimit="10" />
				<path d="M32 33.3281V41.3281" strokeMiterlimit="10" />
			</g>
			<text x="260" y="220" textAnchor="middle" fill="#C84070" fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.12em">MAVSEAL</text>
		</svg>
	);
}

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.heroText}>
					<h1 className={styles.heroTitle}>
						A <span className={styles.grad}>Mavryk</span>
						<br />Remote Signer
					</h1>
					<p className={styles.heroDescription}>
						MavSeal signs your Mavryk Ops while protecting your private keys
					</p>
					<a href="/docs/start" className={styles.btnPrimary}>
						Get Started
					</a>
				</div>
				<div className={styles.heroImage}>
					<HeroDiagram />
				</div>
			</div>
		</section>
	);
}
