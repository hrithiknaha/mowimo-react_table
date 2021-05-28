import {
	ADD_PORTFOLIO,
	DOW_JONES,
	FETCH_DATA,
	FETCH_TICKER,
	NASDAQ,
	REMOVE_PORTFOLIO,
	SET_SCORE_STYLE,
	SET_WEEK_SELECTED,
	SP500,
} from "../actions/types";

var empty = require("is-empty");

//Here the initial state is considring the data of the liked portfolio to be taken from localstorage if, the localstorage has no data then a brand new state is created.
const portfolioToken = JSON.parse(localStorage.getItem("portfolioToken"));

const like = JSON.parse(localStorage.getItem("like"));

let initialState = {};

if (portfolioToken) {
	initialState = {
		hasPortfolio: !empty(portfolioToken),
		portfolio: portfolioToken,
		portfolio_like: like,
		selected: "all",
		rows: [],
		weeks: [],
		weekSelected: "",
		scoreStyle: "scores",
		data: {},
		isLoading: true,
	};
} else {
	initialState = {
		hasPortfolio: false,
		portfolio: [],
		portfolio_like: [],
		selected: "all",
		rows: [],
		weeks: [],
		weekSelected: "",
		scoreStyle: "scores",
		data: {},
		isLoading: true,
	};
}

//This is something known as a Reducer, it basically is called by the action(more on that on the action folder), to manipulate the data, If i take one example the first one FETCH_DATA when called it will only update the fields mentioned inside it which are weeks, rows, selected, isLoading, similarly all the reducers are called one by one when the requirement is placed
//It harness the power of a siple switch case.

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_DATA:
			return {
				...state,
				weeks: action.payload.data[0].dates_available[0],
				rows: action.payload.data[1],
				selected: action.payload.type,
				isLoading: true,
			};
		case DOW_JONES:
			return {
				...state,
				weeks: action.payload.data[0].dates_available[0],
				rows: action.payload.data[1],
				selected: action.payload.type,
				isLoading: true,
			};
		case NASDAQ:
			return {
				...state,
				weeks: action.payload.data[0].dates_available[0],
				rows: action.payload.data[1],
				selected: action.payload.type,
				isLoading: true,
			};
		case SP500:
			return {
				...state,
				weeks: action.payload.data[0].dates_available[0],
				rows: action.payload.data[1],
				selected: action.payload.type,
				isLoading: true,
			};
		case SET_WEEK_SELECTED:
			return {
				...state,
				weekSelected: action.payload,
			};
		case SET_SCORE_STYLE:
			return {
				...state,
				scoreStyle: action.payload,
			};
		case FETCH_TICKER:
			return {
				...state,
				isLoading: empty(action.payload),
				data: action.payload[1][0],
			};
		case ADD_PORTFOLIO:
			return {
				...state,
				portfolio: [
					...state.portfolio,
					action.payload.sec_ticker + "," + action.payload.end_score,
				],
				portfolio_like: [...state.portfolio_like, action.payload.sec_ticker],
				hasPortfolio: true,
			};
		case REMOVE_PORTFOLIO:
			console.log(state.portfolio);
			return {
				...state,
				portfolio: state.portfolio.filter(
					(item) =>
						item != action.payload.sec_ticker + "," + action.payload.end_score
				),
				portfolio_like: state.portfolio_like.filter(
					(item) => item != action.payload.sec_ticker
				),
			};
		default:
			return state;
	}
}
