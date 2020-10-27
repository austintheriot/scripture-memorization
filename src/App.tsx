import React, { useState } from 'react';

//App
import './App.scss';

import { AudioContext } from './state/audioContext';

//Config
import { firebaseConfig } from './utilities/config';

//Firebase Config
import * as firebase from 'firebase/app';
import 'firebase/analytics';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Custom components
import { Menu } from './components/Menu/Menu';
import { MenuButton } from './components/MenuButton/MenuButton';
import { Transition } from './components/Transition/Transition';
import { Footer } from './components/Footer/Footer';

//Pages
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

const audio = new Audio();
type AudioType = typeof audio;
type SetAudioType = React.Dispatch<React.SetStateAction<HTMLAudioElement>>;

interface AudioState {
	textAudio: AudioType;
	userAudio: AudioType;
}

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [textAudio, setTextAudio] = useState(new Audio()); //Audio from ESV
	const [userAudio, setUserAudio] = useState(new Audio()); //User-recorded Audio

	const audio = {
		textAudio,
		setTextAudio,
		userAudio,
		setUserAudio,
	};

	const nonMenuClickHandler = (e: React.MouseEvent) => {
		setMenuOpen(false);
	};

	const handleMenuToggle = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	return (
		<div className='App'>
			<AudioContext.Provider value={audio}>
				<Transition menuOpen={menuOpen}>
					<Router>
						<MenuButton handleClick={handleMenuToggle} menuOpen={menuOpen} />
						<Menu menuOpen={menuOpen} closeMenu={handleMenuClose} />
						<div onClick={nonMenuClickHandler}>
							<Switch>
								<Route exact path='/contact' component={Contact} />
								<Route exact path='/about' component={About} />
								<Route path='/'>
									<Home menuOpen={menuOpen} analytics={analytics} />
								</Route>
							</Switch>
						</div>
					</Router>
					<Footer />
				</Transition>
			</AudioContext.Provider>
		</div>
	);
}
