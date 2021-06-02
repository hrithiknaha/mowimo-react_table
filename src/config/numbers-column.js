import { Link } from "react-router-dom";
import i18n from "../i18n";
import { AiFillLock } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import store from "../store";
import { ADD_PORTFOLIO, REMOVE_PORTFOLIO } from "../actions/types";

const chooseTicker = (data) => {
	if (store.getState().table.portfolio.length <= 5) {
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

//The definations of the columns are set here, Header signifies the Name which will be displayed on the table Header
// accessor is basically the data from which it should map each column from the api returned json,
// Tiptext is the hover over tip value which needs to be displayed
// And cell is in a nutshell t function which can be modified, here i have modified only the Sec_name cell to retuen a Link to the subsequent Ticker page

export const NUM_COLUMNS = [
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
		Header: i18n.t("roe_value"),
		tipText: "",
		accessor: "roe_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("2"),
		tipText: "",
		accessor: "ebit_margin_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("3"),
		// tipText: "",
		accessor: "equity_ratio_value",
		disableGlobalFilter: true,
		Cell: (row) => {
			if (row.row.original.visibility === 0) return <AiFillLock />;
			return row.value || null;
		},
	},
	{
		Header: i18n.t("4"),
		tipText: "",
		accessor: "pe_ratio_5y_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("5"),
		tipText: "",
		accessor: "price_today_vs_year_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("6"),
		tipText: "",
		accessor: "profit_growth_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("Total"),
		// tipText: "END SCORE",
		accessor: "end_score",
		Cell: (row) => {
			if (row.value >= 4)
				return <span className="flag-green">{row.value}</span>;
			else if (row.value === 3)
				return <span className="flag-grey">{row.value}</span>;
			else return <span className="flag-red">{row.value}</span>;
		},
	},
	{
		Header: i18n.t("Interactions"),
		Cell: ({ row }) => {
			if (
				store.getState().table.portfolio_like.includes(row.original.sec_ticker)
			) {
				return (
					<div>
						<button
							className="column-interactions"
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
