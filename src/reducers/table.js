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

const portfolioToken = JSON.parse(localStorage.getItem("portfolioToken"));

let initialState = {};

if (portfolioToken) {
	initialState = {
		hasPortfolio: !empty(portfolioToken),
		portfolio: portfolioToken,
		portfolio_like: [],
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
				portfolio: [...state.portfolio, action.payload],
				hasPortfolio: true,
			};
		case REMOVE_PORTFOLIO:
			return {
				...state,
				portfolio: state.portfolio.filter((item) => item !== action.payload),
			};
		default:
			return state;
	}
}
