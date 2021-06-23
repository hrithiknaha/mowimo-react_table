import {
	GET_BROKER_DATA,
	SET_AVERAGE_TRADE_SIZE,
	SET_MARGIN_LOAD,
	SET_TRADES_PER_YEAR,
	TOGGLE_FRAGMENTS_TRADE,
} from "../actions/types";

const initialState = {
	brokers: [],
	averageEuroPrice: null,
	euroToUsd: null,
	tradesPerYear: 48,
	averageTradeSize: 1000,
	marginLoad: 0,
	showFragments: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_BROKER_DATA:
			return {
				...state,
				brokers: action.payload[0],
				euroToUsd: action.payload[1].EUR_USD,
				averageEuroPrice: action.payload[2].average_price_in_euro,
			};
		case SET_TRADES_PER_YEAR:
			return {
				...state,
				tradesPerYear: action.payload,
			};
		case SET_AVERAGE_TRADE_SIZE:
			return {
				...state,
				averageTradeSize: action.payload,
			};
		case SET_MARGIN_LOAD:
			return {
				...state,
				marginLoad: action.payload,
			};
		case TOGGLE_FRAGMENTS_TRADE:
			return {
				...state,
				showFragments: action.payload,
			};
		default:
			return state;
	}
}
