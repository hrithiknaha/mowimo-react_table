import {
	CHANGE_THRESHOLD,
	SET_EARNING_PAGE,
	TOGGLE_COUNT_SIGN,
} from "../actions/types";

const initialState = {
	isNegative: true,
	onEarning: false,
	threshold: 1,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_COUNT_SIGN:
			return {
				...state,
				isNegative: !state.isNegative,
			};
		case SET_EARNING_PAGE:
			return {
				...state,
				onEarning: action.payload,
			};
		case CHANGE_THRESHOLD:
			return {
				...state,
				threshold: action.payload,
			};
		default:
			return state;
	}
}
