import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, createStore } from 'easy-peasy';

import model from './model';
import App from './components/app';

import './styles/tailwind.css';

const store = createStore(model);

function Root() {
	return (
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
