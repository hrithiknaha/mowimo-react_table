import { Link } from "react-router-dom";

export const COLUMNS = [
	{
		Header: "SEC TICKER",
		accessor: "sec_ticker",
		Cell: (e) => <Link to={`/score/${e.value}`}> {e.value} </Link>,
	},
	{
		Header: "SEC NAME",
		accessor: "sec_name",
	},
	{
		Header: "1",
		tipText: "ROE SCORE",
		accessor: "roe_score",
	},
	{
		Header: "2",
		tipText: "EBIT MARGIN SCORE",
		accessor: "ebit_margin_score",
	},
	{
		Header: "3",
		tipText: "EQUITY RATIO SCORE",
		accessor: "equity_ratio_score",
	},
	{
		Header: "4",
		tipText: "PE RATIO 5Y SCORE",
		accessor: "pe_ratio_5y_score",
	},
	{
		Header: "5",
		tipText: "PE RATIO CY SCORE",
		accessor: "pe_ratio_cy_score",
	},
	{
		Header: "6",
		tipText: "ANALYST OPINIONS SCORE",
		accessor: "analyst_opinions_score",
	},
	{
		Header: "7",
		tipText: "REACTION EARNINGS SCORE",
		accessor: "reaction_earnings_score",
	},
	{
		Header: "8",
		tipText: "PROFIT REVISION SCORE",
		accessor: "profit_revision_score",
	},
	{
		Header: "9",
		tipText: "PRICE TODAY VS 6 MONTHS SCORE",
		accessor: "price_today_vs_6_months_score",
	},
	{
		Header: "10",
		tipText: "PRICE TODAY VS YEAR SCORE",
		accessor: "price_today_vs_year_score",
	},
	{
		Header: "11",
		tipText: "PRICE MOMENTUM SCORE",
		accessor: "price_momentum_score",
	},
	{
		Header: "12",
		tipText: "THREE MONTH REVERSAL SCORE",
		accessor: "three_month_reversal_score",
	},
	{
		Header: "13",
		tipText: "PROFIT GROWTH SCORE",
		accessor: "profit_growth_score",
	},
	{
		Header: "14",
		tipText: "END SCORE",
		accessor: "end_score",
	},
];
