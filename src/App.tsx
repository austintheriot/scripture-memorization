import React, { useState } from 'react';

//App
import './App.scss';

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

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

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
			<Transition menuOpen={menuOpen}>
				<Router>
					<MenuButton handleClick={handleMenuToggle} menuOpen={menuOpen} />
					<Menu menuOpen={menuOpen} closeMenu={handleMenuClose} />
					<div onClick={nonMenuClickHandler}>
						<Switch>
							<Route exact path='/contact'></Route>
							<Route exact path='/about'>
								<About />
							</Route>
							<Route path='/'>
								<Home menuOpen={menuOpen} analytics={analytics} />
							</Route>
						</Switch>
					</div>
				</Router>
				<Footer />
			</Transition>
		</div>
	);
}
