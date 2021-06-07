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
		Header: "Count",
		// accessor: (row) => {
		// 	const earnings = row.row.original.earnings_reaction;

		// 	let positive = null;
		// 	earnings.map((earning) => {
		// 		if (earning[1] >= 0) positive++;
		// 	});
		// 	// if (positive) return positive;
		// 	// else return 0;
		// 	return 0;
		// },
		// disableGlobalFilter: true,
		defaultCanSort: true,
		Cell: (row) => {
			const earnings = row.row.original.earnings_reaction;

			let positive = null;
			earnings.map((earning) => {
				if (earning[1] >= 0) positive++;
			});
			if (positive) return positive;
			else return 0;
		},
	},
];
