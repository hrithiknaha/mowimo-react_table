import axios from "axios";
import broker from "../reducers/broker";
import {
	GET_BROKER_DATA,
	SET_AVERAGE_TRADE_SIZE,
	SET_MARGIN_LOAD,
	SET_TRADES_PER_YEAR,
	TOGGLE_FRAGMENTS_TRADE,
	GET_FRAGMENT_BROKER_DATA,
	GET_BROKER_ON_MARGIN_LOAD,
} from "./types";

export const getBrokerData = () => (dispatch) => {
	axios.get(`https://levermy.herokuapp.com/broker`).then(({ data }) => {
		dispatch({
			type: GET_BROKER_DATA,
			payload: data,
		});
	});
};

export const getBrokerOnMargin = () => (dispatch, state) => {
	const { brokers, marginLoad } = state().broker;

	const brokersOnMargin = brokers.filter((broker) => {
		if (broker.margin_available) {
			return marginLoad > broker.margin_minimum_loan_amount;
		}
	});

	dispatch({
		type: GET_BROKER_ON_MARGIN_LOAD,
		payload: brokersOnMargin,
	});
};

export const getFragmentsOnly = () => (dispatch) => {
	axios.get(`https://levermy.herokuapp.com/broker`).then(({ data }) => {
		const fragmentsBroker = data[0].filter(
			(broker) => broker.fragments_trading_available === 1
		);
		console.log(fragmentsBroker);

		dispatch({
			type: GET_FRAGMENT_BROKER_DATA,
			payload: {
				fragmentsBroker,
				euroToUSD: data[1],
				averageEuroPrice: data[2],
			},
		});
	});
};

export const setTradesPerYear = (value) => (dispatch) => {
	dispatch({
		type: SET_TRADES_PER_YEAR,
		payload: value,
	});
};

export const setAverageTradeSize = (value) => (dispatch) => {
	dispatch({
		type: SET_AVERAGE_TRADE_SIZE,
		payload: value,
	});
};

export const setMarginLoad = (value) => (dispatch, state) => {
	dispatch({
		type: SET_MARGIN_LOAD,
		payload: value,
	});
};

export const toggleFragmentsTrade = (value) => (dispatch) => {
	dispatch({
		type: TOGGLE_FRAGMENTS_TRADE,
		payload: value,
	});
};
