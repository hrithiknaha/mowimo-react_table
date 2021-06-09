import { CHANGE_THRESHOLD, SET_EARNING_PAGE, TOGGLE_COUNT_SIGN } from "./types";

export const countSignToggler = () => (dispatch) => {
	dispatch({
		type: TOGGLE_COUNT_SIGN,
	});
};

export const setEarningPage = (boolean) => (dispatch) => {
	dispatch({
		type: SET_EARNING_PAGE,
		payload: boolean,
	});
};

export const setThreshold = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_THRESHOLD,
		payload: value,
	});
};
