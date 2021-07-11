import { Link } from "react-router-dom";
import i18n from "../i18n";
import { AiFillLock } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import store from "../store";
import {
	ADD_PORTFOLIO,
	REMOVE_PORTFOLIO,
	SET_PAYMENT_METHOD,
} from "../actions/types";
import axios from "axios";

//The last column, which is the interaction column has two button depending on the data stored in localstorage. Here the two functions are written, one to add the liked ticker and one to remove the liked ticket
//Here we are calling the recuder function ADD_PORTFOIO and also storing thr data in localstorage, same for removal calling dispatch function REMOVE_PORTFOLIO and also removing from localstorage
const chooseTicker = (data) => {
	if (
		store.getState().table.portfolio.length <=
		store.getState().table.portfolioLength
	) {
		store.dispatch({
			type: ADD_PORTFOLIO,
			payload: data,
		});

		let existingPortfolio = JSON.parse(localStorage.getItem("portfolioToken"));
		if (existingPortfolio === null) existingPortfolio = [];
		existingPortfolio = [
			...existingPortfolio,
			data.sec_ticker + "," + data.end_score,
		];
		localStorage.setItem("portfolioToken", JSON.stringify(existingPortfolio));

		let like = JSON.parse(localStorage.getItem("like"));
		if (like === null) like = [];
		like = [...like, data.sec_ticker];
		localStorage.setItem("like", JSON.stringify(like));
	}
};

const removeTicker = (data) => {
	store.dispatch({
		type: REMOVE_PORTFOLIO,
		payload: data,
	});

	let existingPortfolio = JSON.parse(localStorage.getItem("portfolioToken"));
	const index = existingPortfolio.findIndex(function (stock) {
		return stock.sec_ticker === data.sec_ticker;
	});
	existingPortfolio.splice(index, 1);
	localStorage.setItem("portfolioToken", JSON.stringify(existingPortfolio));

	let like = JSON.parse(localStorage.getItem("like"));
	const indexofLike = like.findIndex(function (stock) {
		return stock.sec_ticker === data.sec_ticker;
	});
	like.splice(indexofLike, 1);
	localStorage.setItem("like", JSON.stringify(like));
};

const setPayment = (row) => {
	store.dispatch({
		type: SET_PAYMENT_METHOD,
		payload: row.sec_ticker,
	});
};

//The definations of the columns are set here, Header signifies the Name which will be displayed on the table Header
// accessor is basically the data from which it should map each column from the api returned json,
// Tiptext is the hover over tip value which needs to be displayed
// And cell is in a nutshell t function which can be modified, here i have modified only the Sec_name cell to retuen a Link to the subsequent Ticker page

export const COLUMNS = [
	{
		Header: () => (
			<div
				style={{
					textAlign: "left",
				}}
			>
				{i18n.t("SEC NAME")}
			</div>
		),
		accessor: "sec_name",
		align: "left",
		Cell: (props) => {
			return (
				<Link
					to={`/score/${props.cell.row.original.sec_ticker}`}
					style={{
						display: "block",
						width: "100%",
						textAlign: props.cell.column.align,
					}}
				>
					{props.cell.value}
				</Link>
			);
		},
	},
	{
		Header: i18n.t("SEC TICKER"),
		accessor: "sec_ticker",
	},

	{
		Header: "1",
		tipText: i18n.t("1"),
		accessor: "roe_score",
		disableGlobalFilter: true,
	},
	{
		Header: "2",
		tipText: i18n.t("2"),
		accessor: "ebit_margin_score",
		disableGlobalFilter: true,
	},
	{
		Header: "3",
		tipText: i18n.t("3"),
		accessor: "equity_ratio_score",
		disableGlobalFilter: true,
	},
	{
		Header: "4",
		tipText: i18n.t("4"),
		accessor: "pe_ratio_5y_score",
		disableGlobalFilter: true,
	},
	{
		Header: "5",
		tipText: i18n.t("5"),
		accessor: "pe_ratio_cy_score",
		disableGlobalFilter: true,
	},
	{
		Header: "6",
		tipText: i18n.t("6"),
		accessor: "analyst_opinions_score",
		disableGlobalFilter: true,
	},
	{
		Header: "7",
		tipText: i18n.t("7"),
		accessor: "reaction_earnings_score",
		disableGlobalFilter: true,
		Cell: (row) => {
			if (row.row.original.visibility === 0)
				return (
					<div>
						<button
							className="column-lock"
							onClick={() => setPayment(row.row.original)}
						>
							<AiFillLock />
						</button>
					</div>
				);
			// if (row.row.original.reaction_earnings_score === 0) return 0;
			return row.row.original.reaction_earnings_score || 0;
		},
	},
	{
		Header: "8",
		tipText: i18n.t("8"),
		accessor: "profit_revision_score",
		disableGlobalFilter: true,
	},
	{
		Header: "9",
		tipText: i18n.t("9"),
		accessor: "price_today_vs_6_months_score",
		disableGlobalFilter: true,
	},
	{
		Header: "10",
		tipText: i18n.t("10"),
		accessor: "price_today_vs_year_score",
		disableGlobalFilter: true,
	},
	{
		Header: "11",
		tipText: i18n.t("11"),
		accessor: "price_momentum_score",
		disableGlobalFilter: true,
	},
	{
		Header: "12",
		tipText: i18n.t("12"),
		accessor: "three_month_reversal_score",
		disableGlobalFilter: true,
	},
	{
		Header: "13",
		tipText: i18n.t("13"),
		accessor: "profit_growth_score",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("Total"),
		// tipText: "END SCORE",
		accessor: "end_score",
		sortType: "basic",
		Cell: (row) => {
			if (row.value >= 4)
				return <span className="flag-green">{row.value}</span>;
			else if (row.value === 3)
				return <span className="flag-grey">{row.value}</span>;
			else return <span className="flag-red">{row.value}</span>;
		},
	},
	{
		Header: () => (
			<div className="column-interactions-header">{i18n.t("Interactions")}</div>
		),
		id: "interactions",
		Cell: ({ row }) => {
			if (
				store.getState().table.portfolio_like.includes(row.original.sec_ticker)
			) {
				return (
					<div>
						<button
							className="column-interactions-liked"
							onClick={() => removeTicker(row.original)}
						>
							<AiFillHeart />
						</button>
					</div>
				);
			} else
				return (
					<div>
						<button
							className="column-interactions"
							onClick={() => chooseTicker(row.original)}
						>
							<AiOutlineHeart />
						</button>
					</div>
				);
		},
	},
];
