import axios from "axios";
import {
	FETCH_DATA,
	DOW_JONES,
	NASDAQ,
	SP500,
	SET_WEEK_SELECTED,
	SET_SCORE_STYLE,
} from "./types";

export const fetchData = () => (dispatch, state) => {
	const { weekSelected, scoreStyle } = state().table;

	console.log(
		`https://levermy.herokuapp.com/levermann/all/${weekSelected}?style=${scoreStyle}`
	);
	axios
		.get(
			`https://levermy.herokuapp.com/levermann/all/${weekSelected}?style=${scoreStyle}`
			// `https://mysql-test-2021.herokuapp.com/levermann_week/all/${weekSelected}`
		)
		.then(({ data }) => {
			console.log(data);
			dispatch({
				type: FETCH_DATA,
				payload: { data, type: "all" },
			});
		});
};

export const callDowJones = () => (dispatch, state) => {
	const { weekSelected, scoreStyle } = state().table;

	console.log(
		`http://levermy.herokuapp.com/levermann/dowjones/${weekSelected}?style=${scoreStyle}`
	);

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/dowjones/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			console.log(data);
			dispatch({
				type: DOW_JONES,
				payload: { data, type: "dowjones" },
			});
		});
};

export const callNasdaq = () => (dispatch, state) => {
	const { weekSelected, scoreStyle } = state().table;

	console.log(
		`http://levermy.herokuapp.com/levermann/nasdaq100/${weekSelected}?style=${scoreStyle}`
	);

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/nasdaq100/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			console.log(data);
			dispatch({
				type: NASDAQ,
				payload: { data, type: "nasdaq" },
			});
		});
};

export const callSP = () => (dispatch, state) => {
	const { weekSelected, scoreStyle } = state().table;

	console.log(
		`http://levermy.herokuapp.com/levermann/sp500/${weekSelected}?style=${scoreStyle}`
	);

	axios
		.get(
			`http://levermy.herokuapp.com/levermann/sp500/${weekSelected}?style=${scoreStyle}`
		)
		.then(({ data }) => {
			console.log(data);
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
