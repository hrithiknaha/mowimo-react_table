import moment from "moment";
export const earnings_column = [
	{
		Header: "Name",
		accessor: "name",
		// disableGlobalFilter: true,
	},
	{
		Header: "Earnings",
		// accessor: "roe_value",
		// disableGlobalFilter: true,
	},
	{
		Header: "Last Reported",
		accessor: "last_earnings_date",
		// disableGlobalFilter: true,
		Cell: (row) => {
			return moment(row.row.original.last_earnings_date).fromNow();
		},
	},
	{
		Header: "Last Reaction",
		id: "last_reaction",
		accessor: (row) => {
			return row.earnings_reaction[3][1];
		},
	},
	{
		Header: "Average",
		accessor: "average_reaction",
		// disableGlobalFilter: true,
	},
	{
		Header: "Count (+ve)",
		id: "count",
		accessor: (row) => {
			let positive = null;
			const earnings = row.earnings_reaction;

			earnings.map((earning) => {
				if (earning[1] >= 0) positive++;
			});
			if (positive) return positive;
			else return 0;
		},
	},
];

export const earnings_column_negative = [
	{
		Header: "Name",
		accessor: "name",
		// disableGlobalFilter: true,
	},
	{
		Header: "Earnings",
		// accessor: "roe_value",
		// disableGlobalFilter: true,
	},
	{
		Header: "Last Reported",
		accessor: "last_earnings_date",
		// disableGlobalFilter: true,
		Cell: (row) => {
			return moment(row.row.original.last_earnings_date).fromNow();
		},
	},
	{
		Header: "Last Reaction",
		id: "last_reaction",
		accessor: (row) => {
			return row.earnings_reaction[3][1];
		},
	},
	{
		Header: "Average",
		accessor: "average_reaction",
		// disableGlobalFilter: true,
	},
	{
		Header: "Count (-ve)",
		id: "count",
		accessor: (row) => {
			let negative = null;
			const earnings = row.earnings_reaction;

			earnings.map((earning) => {
				if (earning[1] <= 0) negative++;
			});
			if (negative) return negative;
			else return 0;
		},
	},
];
