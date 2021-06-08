import moment from "moment";

const parseDate = (str) => {
	let bits = str.split("-");
	let mon = bits[1];
	let day = bits[2];
	let year = bits[0];
	let st_day = year + "-" + mon + "-" + day + "T00:00:00Z";
	return new Date(st_day);
};

// Calculate days between two dates
const date_diff = (first, second) => {
	return Math.round((second - first) / (1000 * 60 * 60 * 24));
};
// Calculate relative position on 500 day timeline
const relativePosition = (number) => {
	return Math.round(((365 - number) / 365) * 1000000) / 10000;
};

export const earnings_column = [
	{
		Header: () => (
			<div
				style={{
					textAlign: "left",
				}}
			>
				Name
			</div>
		),
		accessor: "name",
		align: "left",
		Cell: (props) => {
			return (
				<div
					style={{
						display: "block",
						width: "100%",
						textAlign: props.cell.column.align,
					}}
				>
					{props.cell.value}
				</div>
			);
		},
		// disableGlobalFilter: true,
	},
	{
		Header: "Earnings",
		// accessor: "roe_value",
		// disableGlobalFilter: true,
		Cell: (row) => {
			const earnings = row.row.original.earnings_reaction;
			let markers = [];
			let markerScores = [];
			earnings.map((earning) => {
				const dateOfEarning = earning[0];
				const date = parseDate(dateOfEarning);
				const timespan = date_diff(date, new Date());
				const relative_marker = relativePosition(timespan);
				markers.push(relative_marker);
				markerScores.push(earning[1]);
			});
			console.log(markers);
			console.log(markerScores);

			const printMarkers = () => {
				let markersArray = [];
				for (let i = 0; i < markers.length; i++) {
					let arrow = null;
					if (markerScores[i] > 1) arrow = "up";
					else if (markerScores[i] < -1) arrow = "down";
					else arrow = "dot";

					markersArray.push(
						<div
							className={`arrow ${arrow}`}
							style={{
								position: "absolute",
								textAlign: "left",
								left: `${markers[i]}%`,
							}}
						></div>
					);
				}

				return markersArray;
			};

			return (
				<div
					style={{
						width: "30rem",
					}}
					className="line"
				>
					<div>{printMarkers()}</div>
				</div>
			);
		},
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
		Header: () => (
			<div
				style={{
					textAlign: "left",
				}}
			>
				Name
			</div>
		),
		accessor: "name",
		// disableGlobalFilter: true,
	},
	{
		Header: "Earnings",
		// accessor: "last_earnings_date",
		// disableGlobalFilter: true,

		Cell: (row) => {
			return (
				<div
					style={{
						display: "block",
						width: "30rem",
						// textAlign: props.cell.column.align,
					}}
					className="line"
				></div>
			);
		},
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
