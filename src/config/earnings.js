import moment from "moment";
import i18n from "../i18n";
import store from "../store";

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
				{i18n.t("SEC NAME")}
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
		Header: () => (
			<div>
				{i18n.t("EARNINGS")}
				<div className="earnings-header">
					<div>{i18n.t("1Y")}</div>
					<div>{i18n.t("TODAY")}</div>
				</div>
			</div>
		),
		id: "earnings_reaction",
		accessor: (row) => {
			return row.earnings_reaction[0][0];
		},
		// disableGlobalFilter: true,
		Cell: (row) => {
			const threshold = store.getState().earnings.threshold;
			const earnings = row.row.original.earnings_reaction;
			let markers = [];
			let markerScores = [];
			let daysDiff = [];
			let daysDiffScores = [];
			earnings.map((earning, i, el) => {
				const dateOfEarning = earning[0];
				const date = parseDate(dateOfEarning);
				const timespan = date_diff(date, new Date());
				const relative_marker = relativePosition(timespan);
				markers.push(relative_marker);
				markerScores.push(earning[1]);

				//Days Between Tickers
				if (el[i + 1] != undefined) {
					const days_difference = date_diff(
						date,
						parseDate(earnings[i + 1][0])
					);
					daysDiffScores.push(days_difference);
					let relative_description = relativePosition(
						timespan - days_difference / 2
					);
					daysDiff.push(relative_description);
				}
			});

			const printMarkers = () => {
				let markersArray = [];
				for (let i = 0; i < markers.length; i++) {
					let arrow = null;
					if (markerScores[i] > threshold) arrow = "up";
					else if (markerScores[i] < -threshold) arrow = "down";
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

			const printDaysDiff = () => {
				let daysArray = [];
				for (let i = 0; i < daysDiff.length; i++) {
					daysArray.push(
						<div
							className="line-days"
							style={{
								position: "absolute",
								textAlign: "left",
								left: `${daysDiff[i]}%`,
							}}
						>
							{daysDiffScores[i]}
							{i18n.t("d")}
						</div>
					);
				}

				return daysArray;
			};

			return (
				<div
					style={{
						width: "30rem",
					}}
					className="line"
				>
					<div>{printMarkers()}</div>
					<div>{printDaysDiff()}</div>
				</div>
			);
		},
	},
	{
		Header: i18n.t("LAST REPORTED"),
		accessor: "last_earnings_date",
		// disableGlobalFilter: true,
		Cell: (row) => {
			return moment(row.row.original.last_earnings_date).fromNow();
		},
	},
	{
		Header: i18n.t("LAST REACTION"),
		id: "last_reaction",
		sortType: "basic",
		accessor: (row) => {
			if (row.name === "Williams Companies") console.log(row.earnings_reaction);
			return row.earnings_reaction[row.earnings_reaction.length - 1][1];
		},
	},
	{
		Header: i18n.t("AVERAGE"),
		accessor: "average_reaction",
		// disableGlobalFilter: true,
	},
	{
		Header: `${i18n.t("COUNT")} (+ve)`,
		id: "count",
		accessor: (row) => {
			const threshold = store.getState().earnings.threshold;
			let positive = null;
			const earnings = row.earnings_reaction;

			earnings.map((earning) => {
				if (earning[1] >= threshold) positive++;
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
				{i18n.t("SEC NAME")}
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
		Header: () => (
			<div>
				{i18n.t("EARNINGS")}
				<div className="earnings-header">
					<div>{i18n.t("1Y")}</div>
					<div>{i18n.t("TODAY")}</div>
				</div>
			</div>
		),
		id: "earnings_reaction",
		accessor: (row) => {
			return row.earnings_reaction[0][0];
		},
		// disableGlobalFilter: true,
		Cell: (row) => {
			const threshold = store.getState().earnings.threshold;
			const earnings = row.row.original.earnings_reaction;
			let markers = [];
			let markerScores = [];
			let daysDiff = [];
			let daysDiffScores = [];
			earnings.map((earning, i, el) => {
				const dateOfEarning = earning[0];
				const date = parseDate(dateOfEarning);
				const timespan = date_diff(date, new Date());
				const relative_marker = relativePosition(timespan);
				markers.push(relative_marker);
				markerScores.push(earning[1]);

				//Days Between Tickers
				if (el[i + 1] != undefined) {
					const days_difference = date_diff(
						date,
						parseDate(earnings[i + 1][0])
					);
					daysDiffScores.push(days_difference);
					let relative_description = relativePosition(
						timespan - days_difference / 2
					);
					daysDiff.push(relative_description);
				}
			});

			const printMarkers = () => {
				let markersArray = [];
				for (let i = 0; i < markers.length; i++) {
					let arrow = null;
					if (markerScores[i] > threshold) arrow = "up";
					else if (markerScores[i] < -threshold) arrow = "down";
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

			const printDaysDiff = () => {
				let daysArray = [];
				for (let i = 0; i < daysDiff.length; i++) {
					daysArray.push(
						<div
							className="line-days"
							style={{
								position: "absolute",
								textAlign: "left",
								left: `${daysDiff[i]}%`,
							}}
						>
							{daysDiffScores[i]}
							{i18n.t("d")}
						</div>
					);
				}

				return daysArray;
			};

			return (
				<div
					style={{
						width: "30rem",
					}}
					className="line"
				>
					<div>{printMarkers()}</div>
					<div>{printDaysDiff()}</div>
				</div>
			);
		},
	},
	{
		Header: i18n.t("LAST REPORTED"),
		accessor: "last_earnings_date",
		// disableGlobalFilter: true,
		Cell: (row) => {
			return moment(row.row.original.last_earnings_date).fromNow();
		},
	},
	{
		Header: i18n.t("LAST REACTION"),
		id: "last_reaction",
		sortType: "basic",
		accessor: (row) => {
			console.log(row.earnings_reaction);
			return row.earnings_reaction[row.earnings_reaction.length - 1][1];
		},
	},
	{
		Header: i18n.t("AVERAGE"),
		accessor: "average_reaction",
		// disableGlobalFilter: true,
	},
	{
		Header: `${i18n.t("COUNT")} (-ve)`,
		id: "count",
		accessor: (row) => {
			const threshold = store.getState().earnings.threshold;
			let negative = null;
			const earnings = row.earnings_reaction;

			console.log("TEST");

			earnings.map((earning) => {
				if (earning[1] < -threshold) negative++;
			});
			if (negative) return negative;
			else return 0;
		},
	},
];
