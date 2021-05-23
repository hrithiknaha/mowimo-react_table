import { Link } from "react-router-dom";
import i18n from "../i18n";
import { AiFillLock } from "react-icons/ai";

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
];
