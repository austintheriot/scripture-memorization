import React from 'react';
import { Prompt } from 'react-router';
import styles from './Memorize.module.scss';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { SmallSpacer } from '../../components/Spacers/Spacers';
import { Footer } from '../../components/Footer/Footer';
import { SearchBible } from '../../components/SearchBible/SearchBible';
import { MostRecent } from '../../components/MostRecent/MostRecent';
import { TextCondensed } from './TextCondensed/TextCondensed';
import { TextLoading } from '../../components/TextLoading/TextLoading';
import { Copyright } from '../../components/Copyright/Copyright';
import { useBibleAudio } from 'hooks/useBibleAudio';
import { useAppSelector } from 'store/store';
import { RecordedAudioControls } from 'components/RecordedAudioControls/RecordedAudioControls';


const Memorize = () => {
	const { bibleAudioRef, handleKeyPress } = useBibleAudio();
	const { book, chapter, error, loading, showCondensed, body } = useAppSelector(s => s.text);

	let textComponent = null;
	if (error) {
		textComponent = (
			<p className={styles.errorMessage}>
				Sorry, there was an error loading this passage.
			</p>
		)
	} else if (loading) {
		textComponent = <TextLoading />;
	} else if (showCondensed) {
		textComponent = <TextCondensed />;
	} else {
		textComponent = (
			<p className={styles.fullText} data-testid='text-original'>
				{body}
			</p>
		)
	}

	return (
		<ErrorBoundary>
			<div
				onKeyDown={handleKeyPress}
				className={styles.LearnContainer}>
				<Prompt
					message={() => {
						//Pause textAudio when navigating away from Home
						console.log('Leaving Home page. Pausing textAudio.');
						if (bibleAudioRef.current.readyState >= 2) bibleAudioRef.current.pause();
						return true;
					}}
				/>
				<h1 className={styles.h1}>{`${book}`.replace('Psalms', 'Psalm')} {chapter}</h1>
				<div className={styles.searchContainer}>
					<SearchBible />
					<MostRecent />
				</div>
				<div className={styles.textAreaContainer} data-testid='text-container'>
					{textComponent}
				</div>
				<SmallSpacer />
				<Copyright />
				<Footer />
				<RecordedAudioControls />
			</div>
		</ErrorBoundary>
	);
};

export default Memorize;