import axios from "axios";
import {
	GET_BROKER_DATA,
	SET_AVERAGE_TRADE_SIZE,
	SET_MARGIN_LOAD,
	SET_TRADES_PER_YEAR,
	TOGGLE_FRAGMENTS_TRADE,
} from "./types";

export const getBrokerData = () => (dispatch) => {
	axios.get(`https://levermy.herokuapp.com/broker`).then(({ data }) => {
		dispatch({
			type: GET_BROKER_DATA,
			payload: data,
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

export const setMarginLoad = (value) => (dispatch) => {
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
