// AUDIO ////////////////////////////

export const storePlaySpeed = (speed: number) => {
	console.log(`Storing ${speed} as default playback speed`);
	window.localStorage.setItem('speed', speed.toString());
};

export const getPlaySpeed = () => {
	console.log('Retrieving playback speed from local storage');
	const speed = window.localStorage.getItem('speed') || '1';
	console.log(`localStorage: playSpeed = ${speed}`);
	return parseFloat(speed);
};

// TEXT ////////////////////////////

interface TextObject {
	title: string;
	body: string;
}

type TextArray = TextObject[];

export const getUserSettings = () => {
	const targetSpeed = getPlaySpeed();
	const showCondensed = getShowCondensed();
	return {
		targetSpeed,
		showCondensed,
	};
};

export const splitTitleIntoBookAndChapter = (title: string) => {
	const wordArray = title.split(' ');
	const book = wordArray.slice(0, wordArray.length - 1).join(' ');
	const chapter = wordArray[wordArray.length - 1];
	return { book, chapter };
};

export const storeShowCondensed = (boolean: boolean) => {
	console.log(
		`Storing showCondensed as ${boolean.toString()} in local storage`
	);
	window.localStorage.setItem('showCondensed', boolean.toString());
};

export const getShowCondensed = (): boolean => {
	try {
		console.log(`Retrieving showCondensed setting from local storage`);
		const showCondensed =
			window.localStorage.getItem('showCondensed') === 'true';
		console.log(`localStorage: showCondensed = ${showCondensed}`);
		return showCondensed;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getTextArray = (): TextArray => {
	try {
		const textsString = window.localStorage.getItem('texts');
		return textsString
			? (JSON.parse(textsString) as TextArray)
			: ([{ title: '', body: '' }] as TextArray);
	} catch (err) {
		console.log(err);
		return [{ title: '', body: '' }];
	}
};

const shiftArrayByOne = (
	originalArray: Array<{ title: string; body: string }>,
	title: string,
	body: string
): TextArray => {
	try {
		const array = [...originalArray].map((el) => ({ ...el }));
		//store no more than 5 passages at a time
		if (array.length === 5) array.pop();
		array.unshift({
			title,
			body,
		});
		return array;
	} catch (err) {
		console.log(err);
		return [{ title: '', body: '' }];
	}
};

const movePassageToFrontOfArray = (title: string): TextArray => {
	try {
		console.log(`Moving ${title} to the front of the text body array`);
		const array = getTextArray();
		const titleIndex = array.findIndex((el) => el.title === title);
		if (titleIndex <= 0) return array;
		const extractedText = array.splice(titleIndex, 1)[0]; //extract and move to front
		array.unshift(extractedText);
		return array;
	} catch (err) {
		console.log(err);
		return [{ title: '', body: '' }];
	}
};

export const getTextBody = (title: string): string => {
	try {
		const textArray = getTextArray();
		const text = textArray.find((el) => el.title === title);
		return text?.body || '';
	} catch (err) {
		console.log(err);
		return '';
	}
};

export const getMostRecentText = () => {
	return getTextArray()[0];
};

export const addToTextArray = (title: string, body: string) => {
	console.log(
		`Checking if ${title} text body already exists in local storage array`
	);
	let passageIsInLocalStorage = !!getTextBody(title);
	if (passageIsInLocalStorage) {
		console.log(`${title} text body already exists in local storage array`);
		const shiftedArray = movePassageToFrontOfArray(title);
		window.localStorage.setItem('texts', JSON.stringify(shiftedArray));
		return;
	} else {
		console.log(`${title} text body does not exist in local storage array`);
		console.log(
			`Adding ${title} text body to local storage array as most recent`
		);
		const textArray = getTextArray();
		let shiftedArray: TextArray = [{ title: '', body: '' }];

		//no true item has been added yet
		if (textArray.length === 1 && textArray[0].title === '') {
			shiftedArray[0] = { title, body };
		}
		//other, real items have been added
		else {
			shiftedArray = shiftArrayByOne(textArray, title, body);
		}

		window.localStorage.setItem('texts', JSON.stringify(shiftedArray));
	}
};
