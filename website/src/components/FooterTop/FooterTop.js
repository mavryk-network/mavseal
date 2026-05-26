import React from 'react';
import styles from './FooterTop.module.scss';
import MavrykDynamicsSvg from '../../../static/img/ECAD_logo.svg';

export default function FooterTop() {
	return (
		<section className={styles.brandSection}>
			<MavrykDynamicsSvg className={styles.brandLogo} />
		</section>
	);
}
