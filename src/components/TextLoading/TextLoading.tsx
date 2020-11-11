import React from 'react';
import styles from './TextLoading.module.scss';

export const TextLoading = () => {
	return (
		<div className={styles.loadingMockContainer} data-testid='text-loading'>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
		</div>
	);
};
