import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import './styles/tailwind.css';

function Root() {
	return <App />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
