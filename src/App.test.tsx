import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Firebase Config
import { app, analytics, FirebaseContext } from './app/firebaseContext';

//Redux
import { Provider } from 'react-redux';
import store from './app/store';
import { MemoryRouter } from 'react-router-dom';

const firebaseContext = {
	app,
	analytics,
};

test('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<FirebaseContext.Provider value={firebaseContext}>
			<Provider store={store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>
		</FirebaseContext.Provider>,
		div
	);
});
