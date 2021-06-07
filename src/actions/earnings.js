import { TOGGLE_COUNT_SIGN } from "./types";

export const countSignToggler = () => (dispatch) => {
	dispatch({
		type: TOGGLE_COUNT_SIGN,
	});
};
