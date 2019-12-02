import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/counter.css';

import Calculator from './components/calculator';

// Custom

const counterState = {
	count: 0
};

const counterReducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + 1 };
		case 'DECREMENT':
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
};

function App() {

	const [state, dispatch] = useReducer(counterReducer, counterState);

	const handleIncrease = () => {
		dispatch({ type: 'INCREMENT' });
	};

	const handleDecrease = () => {
		dispatch({ type: 'DECREMENT' });
	};

	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
		<section className="content">
			<Calculator/>
			<div className="headline">
				<h1>Custom</h1>
			</div>
			<div className="box">
				<h1>Counter</h1>
				<p>Count: {state.count}</p>
				<div>
					<button type="button" onClick={handleIncrease}className="button is-grey">
						+
					</button>
					<button type="button" onClick={handleDecrease} className="button is-dark">
						-
					</button>
				</div>
			</div>
		</section>
		<footer className="App-footer">
			(c) Coptionyright - Mike Ludemann
		</footer>
	</div>
	);
}

export default App;
