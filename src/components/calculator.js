import React, { useReducer } from 'react';
import './calculator.css';

const initialState = {
	value: 0,
	option: '',
	firstNumber: 0,
	secondNumber: '',
	thirdNumber: ''
};

const reducer = (state, action) => {
	console.log(state)
	switch (action.type) {
		case "2":
			if (!state.firstNumber) {
				return {...state, firstNumber: state.secondNumber, option: action.payload, secondNumber: ''}
			}
			if(!state.secondNumber) {
				return {...state, option: action.payload}
			}
			if(state.firstNumber && state.option) {
				console.log('called')
				return {...state, value: eval(state.value+state.option+state.secondNumber), option: action.payload}
			}
			return {...state, value: eval(state.firstNumber+state.option+state.secondNumber), secondNumber: '', option: action.payload, firstNumber: eval(state.firstNumber+state.option+state.secondNumber)}

		case "1":
			if (state.secondNumber === '' && action.payload==='.') {
				return { ...state, secondNumber: '0'+action.payload }
			} else if (state.secondNumber === '') {
				return { ...state, secondNumber: action.payload }
			} else {
				if (action.payload === '.' && state.secondNumber.includes('.')){
					return state
				} else {
				return { ...state, secondNumber: state.secondNumber + action.payload }
				} 
			}

		case "3":
			if (state.option && state.secondNumber) {
				return {...state, value: eval(state.firstNumber+state.option+state.secondNumber), secondNumber: '', firstNumber: eval(state.firstNumber+state.option+state.secondNumber), thirdNumber : state.secondNumber}
			} else if (state.option && state.value) {
				return {...state, value: eval(state.value+state.option+state.thirdNumber)}
			} else {
				return state
			}

		case "c": 
			if (state.secondNumber.length === 2 && state.secondNumber.includes('0.')) {
				return {...state, secondNumber: ''}
			} else if (state.secondNumber.length>1) {
				return {...state, secondNumber: state.secondNumber.slice(0, -1)}
			} else {
				return {...state, secondNumber: ''}
			}
			//state.secondNumber.length > 1 ? return {...state, secondNumber: state.secondNumber.slice(0, -1)} : return {...state, secondNumber:0}

		case "ac":
			return {
				value: 0,
				option: '',
				firstNumber: 0,
				secondNumber: ''
			}

		default:
			return state
	}
}

function Calculator() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="main--calculator">
			<div className="headline">
				<h1>Calculator</h1>
			</div>
			<div className="calculator">
				<div className="container">
					<div className="display">
						{!state.secondNumber ? state.value : state.secondNumber} 
						<span className="cursor" />
					</div>
					<button className="btn" onClick={() => dispatch({ type: 'ac'})}>AC</button>
					<button className="btn" onClick={() => dispatch({ type: 'c'})}>C</button>
					<button className="btn" onClick={() => dispatch({ type: '2', payload: '*'})}>x</button>
					<button className="btn" onClick={() => dispatch({ type: '2', payload: '/'})}>/</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '7'})}>7</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '8'})}>8</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '9'})}>9</button>
					<button className="btn" onClick={() => dispatch({ type: '2', payload: '+'})}>+</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '4'})}>4</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '5'})}>5</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '6'})}>6</button>
					<button className="btn" onClick={() => dispatch({ type: '2', payload: '-'})}>-</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '1'})}>1</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '2'})}>2</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '3'})}>3</button>
					<button className="btn zero" onClick={() => dispatch({ type: '1', payload: '0'})}>0</button>
					<button className="btn" onClick={() => dispatch({ type: '1', payload: '.'})}>.</button>
					<button className="btn eq" onClick={() => dispatch({ type: '3'})}>=</button>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
