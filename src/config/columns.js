import { Link } from "react-router-dom";
import i18n from "../i18n";

//The definations of the columns are set here, Header signifies the Name which will be displayed on the table Header
// accessor is basically the data from which it should map each column from the api returned json,
// Tiptext is the hover over tip value which needs to be displayed
// And cell is in a nutshell t function which can be modified, here i have modified only the Sec_name cell to retuen a Link to the subsequent Ticker page

export const COLUMNS = [
	{
		Header: i18n.t("SEC NAME"),
		accessor: "sec_name",
		Cell: ({ row, value }) => (
			<Link to={`/score/${row.original.sec_ticker}`}>{value}</Link>
		),
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
	},
];
