import {
	GET_BROKER_DATA,
	GET_FRAGMENT_BROKER_DATA,
	SET_AVERAGE_TRADE_SIZE,
	SET_MARGIN_LOAD,
	SET_TRADES_PER_YEAR,
	TOGGLE_FRAGMENTS_TRADE,
	GET_BROKER_ON_MARGIN_LOAD,
} from "../actions/types";

const initialState = {
	brokers: [],
	showBrokers: [],
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
		case GET_FRAGMENT_BROKER_DATA:
			return {
				...state,
				showBrokers: action.payload.fragmentsBroker,
				euroToUsd: action.payload.euroToUSD.EUR_USD,
				averageEuroPrice: action.payload.averageEuroPrice.average_price_in_euro,
			};
		case GET_BROKER_ON_MARGIN_LOAD:
			return {
				...state,
				showBrokers: action.payload,
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
