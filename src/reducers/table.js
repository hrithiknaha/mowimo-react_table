import {
	DOW_JONES,
	FETCH_DATA,
	NASDAQ,
	SET_SCORE_STYLE,
	SET_WEEK_SELECTED,
	SP500,
} from "../actions/types";

const initialState = {
	selected: "all",
	rows: [],
	weeks: [],
	weekSelected: "",
	scoreStyle: "scores",
};

export default function (state = initialState, action) {
	console.log(action.payload);
	switch (action.type) {
		case FETCH_DATA:
			return {
				...state,
				weeks: action.payload.data[0].dates_available[0],
				rows: action.payload.data[1],
				selected: action.payload.type,
			};
		case DOW_JONES:
			return {
				...state,
				rows: action.payload.data[1],
				selected: action.payload.type,
			};
		case NASDAQ:
			return {
				...state,
				rows: action.payload.data[1],
				selected: action.payload.type,
			};
		case SP500:
			return {
				...state,
				rows: action.payload.data[1],
				selected: action.payload.type,
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
		default:
			return state;
	}
}
