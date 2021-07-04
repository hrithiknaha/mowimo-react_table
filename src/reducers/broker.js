//This is the DB of your react application. All the data that we get from our API needs to be stored first somewhere in order to anything with it.
//WHen we use Redux we store all those data in a Reducer like this one.
//Here we define the initialState or the default values of all the values that we want to store/
//As you can see we have a brokers empty array as default value. So when the site is loaded, that will get populated with the broker datas from thr api.
//These CASES, are called from the action component. When a particular event takes place, such as a page is loaded, or a button is clicked.
//SO the ideal flow is, Suppose a page is loaded, at that time one particular action will be called and that action will call the API to get all the data
//And then that action will pass that data to one particular reducer's case to make data manipulations

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
				brokers: [...state.brokers],
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
