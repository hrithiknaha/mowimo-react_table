import { Link } from "react-router-dom";
import i18n from "../i18n";

//The definations of the columns are set here, Header signifies the Name which will be displayed on the table Header
// accessor is basically the data from which it should map each column from the api returned json,
// Tiptext is the hover over tip value which needs to be displayed
// And cell is in a nutshell t function which can be modified, here i have modified only the Sec_name cell to retuen a Link to the subsequent Ticker page

export const NUM_COLUMNS = [
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
		tipText: i18n.t("ROE VALUE"),
		accessor: "roe_value",
		disableGlobalFilter: true,
	},
	{
		Header: "2",
		tipText: i18n.t("2"),
		accessor: "ebit_margin_value",
		disableGlobalFilter: true,
	},
	{
		Header: "3",
		tipText: i18n.t("3"),
		accessor: "equity_ratio_value",
		disableGlobalFilter: true,
	},
	{
		Header: "4",
		tipText: i18n.t("4"),
		accessor: "pe_ratio_5y_value",
		disableGlobalFilter: true,
	},
	{
		Header: "5",
		tipText: i18n.t("5"),
		accessor: "price_today_vs_year_value",
		disableGlobalFilter: true,
	},
	{
		Header: "6",
		tipText: i18n.t("6"),
		accessor: "profit_growth_value",
		disableGlobalFilter: true,
	},
	{
		Header: i18n.t("Total"),
		// tipText: "END SCORE",
		accessor: "end_score",
	},
];
