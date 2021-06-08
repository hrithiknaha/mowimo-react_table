import { TOGGLE_COUNT_SIGN } from "../actions/types";

const initialState = {
	isNegative: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_COUNT_SIGN:
			return {
				...state,
				isNegative: !state.isNegative,
			};
		default:
			return state;
	}
}
