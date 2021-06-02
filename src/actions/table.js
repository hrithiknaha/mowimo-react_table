import axios from "axios";
import {
	FETCH_DATA,
	DOW_JONES,
	NASDAQ,
	SP500,
	SET_WEEK_SELECTED,
	SET_SCORE_STYLE,
	FETCH_TICKER,
	SET_TYPE,
} from "./types";

//Now this is known as actions, actions are basically functions which are called by or from components and actions in return triggers or calles the reducers functions, Al the dipatch function are basically a fancy way of calling reducer functions
export const fetchData = () => (dispatch, state) => {
	console.log("Fetching All");
	const { weekSelected, scoreStyle } = state().table;

	axios
		.get(
			`https://levermy.herokuapp.com/levermann/all/${weekSelected}?style=${scoreStyle}`
			// `https://mysql-test-2021.herokuapp.com/levermann_week/all/${weekSelected}`
		)
		.then(({ data }) => {
			dispatch({
				type: FETCH_DATA,
				payload: { data, type: "all" },
			});
		});
};

export const callDowJones = () => (dispatch, state) => {
	console.log("Fetching Dow Jones");
	const { weekSelected, scoreStyle } = state().table;

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/dowjones/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			dispatch({
				type: DOW_JONES,
				payload: { data, type: "dowjones" },
			});
		});
};

export const callNasdaq = () => (dispatch, state) => {
	console.log("Fetching Nasdaq");
	const { weekSelected, scoreStyle } = state().table;

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/nasdaq100/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			dispatch({
				type: NASDAQ,
				payload: { data, type: "nasdaq" },
			});
		});
};

export const callSP = () => (dispatch, state) => {
	console.log("Fetching SP500");
	const { weekSelected, scoreStyle } = state().table;

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/sp500/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			dispatch({
				type: SP500,
				payload: { data, type: "sp" },
			});
		});
};

export const setWeekSelected = (week) => (dispatch) => {
	dispatch({
		type: SET_WEEK_SELECTED,
		payload: week,
	});
};

export const setScoreStyle = (style) => (dispatch) => {
	dispatch({
		type: SET_SCORE_STYLE,
		payload: style,
	});
};

export const fetchTickerData = (ticker) => (dispatch) => {
	console.log("Fetching Ticker");
	axios
		.get(`https://levermy.herokuapp.com/levermann/stock/${ticker}`)
		.then(({ data }) => {
			dispatch({
				type: FETCH_TICKER,
				payload: data,
			});
		});
};

export const callStart = () => (dispatch) => {
	dispatch({
		type: SET_TYPE,
		payload: "start",
	});
};

export const callLevermann = () => (dispatch) => {
	dispatch({
		type: SET_TYPE,
		payload: "levermann",
	});
};

export const callLike = () => (dispatch) => {
	dispatch({
		type: SET_TYPE,
		payload: "liked",
	});
};

export const chooseTicker = (row) => {
	console.log("Liked");
};
