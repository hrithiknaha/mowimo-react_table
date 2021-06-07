import { TOGGLE_COUNT_SIGN } from "../actions/types";

const initialState = {
	isPositive: true,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_COUNT_SIGN:
			return {
				...state,
				isPositive: !state.isPositive,
			};
		default:
			return state;
	}
}
