import {
	DOW_JONES,
	FETCH_DATA,
	FETCH_TICKER,
	NASDAQ,
	SET_SCORE_STYLE,
	SET_WEEK_SELECTED,
	SP500,
} from "../actions/types";

var empty = require("is-empty");

const initialState = {
	selected: "all",
	rows: [],
	weeks: [],
	weekSelected: "",
	scoreStyle: "scores",
	data: {},
	isLoading: true,
};

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
		default:
			return state;
	}
}
