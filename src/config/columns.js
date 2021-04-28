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
		disableGlobalFilter: true,
	},
	{
		Header: "2",
		tipText: "EBIT MARGIN SCORE",
		accessor: "ebit_margin_score",
		disableGlobalFilter: true,
	},
	{
		Header: "3",
		tipText: "EQUITY RATIO SCORE",
		accessor: "equity_ratio_score",
		disableGlobalFilter: true,
	},
	{
		Header: "4",
		tipText: "PE RATIO 5Y SCORE",
		accessor: "pe_ratio_5y_score",
		disableGlobalFilter: true,
	},
	{
		Header: "5",
		tipText: "PE RATIO CY SCORE",
		accessor: "pe_ratio_cy_score",
		disableGlobalFilter: true,
	},
	{
		Header: "6",
		tipText: "ANALYST OPINIONS SCORE",
		accessor: "analyst_opinions_score",
		disableGlobalFilter: true,
	},
	{
		Header: "7",
		tipText: "REACTION EARNINGS SCORE",
		accessor: "reaction_earnings_score",
		disableGlobalFilter: true,
	},
	{
		Header: "8",
		tipText: "PROFIT REVISION SCORE",
		accessor: "profit_revision_score",
		disableGlobalFilter: true,
	},
	{
		Header: "9",
		tipText: "PRICE TODAY VS 6 MONTHS SCORE",
		accessor: "price_today_vs_6_months_score",
		disableGlobalFilter: true,
	},
	{
		Header: "10",
		tipText: "PRICE TODAY VS YEAR SCORE",
		accessor: "price_today_vs_year_score",
		disableGlobalFilter: true,
	},
	{
		Header: "11",
		tipText: "PRICE MOMENTUM SCORE",
		accessor: "price_momentum_score",
		disableGlobalFilter: true,
	},
	{
		Header: "12",
		tipText: "THREE MONTH REVERSAL SCORE",
		accessor: "three_month_reversal_score",
		disableGlobalFilter: true,
	},
	{
		Header: "13",
		tipText: "PROFIT GROWTH SCORE",
		accessor: "profit_growth_score",
		disableGlobalFilter: true,
	},
	{
		Header: "Total",
		// tipText: "END SCORE",
		accessor: "end_score",
	},
];
