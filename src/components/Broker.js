import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import { useTable, useGlobalFilter } from "react-table";
import { broker_columns } from "../config/broker";

import {
	getBrokerData,
	setTradesPerYear,
	setAverageTradeSize,
	setMarginLoad,
	toggleFragmentsTrade,
} from "../actions/broker";

function Broker(props) {
	const { tradesPerYear, averageTradeSize, marginLoad, brokers } = props.broker;

	const columns = useMemo(() => broker_columns, [broker_columns]);
	const data = useMemo(() => brokers, [brokers]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		// state,
		// setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		}
		// useGlobalFilter
	);

	// const { globalFilter } = state;

	useEffect(() => {
		props.getBrokerData();
	}, []);

	const handleAverageTradesPerYearRange = (e) => {
		// console.log("Trades Per Year", e.target.value);
		props.setTradesPerYear(e.target.value);
	};
	const handleTradeSizeRange = (e) => {
		// console.log("Average Trade Size", e.target.value);
		props.setAverageTradeSize(e.target.value);
	};
	const handleMarginLoadRange = (e) => {
		// console.log("Margin Load", e.target.value);
		props.setMarginLoad(e.target.value);
		// return setGlobalFilter(e.target.value);
	};

	const handleFragmentChecked = (e) => {
		if (e.target.checked) props.toggleFragmentsTrade(true);
		else props.toggleFragmentsTrade(false);
	};

	return (
		<div className="broker">
			<h1 className="broker-title">BROKER</h1>
			<div className="broker-text">
				<p>
					Applying the levermann strategy leads to roughly four trades per
					month, assuming you manage a complete Levermann portfolio of circa 10
					positions. Due to this trading activity, it is important to take
					brokerage fees into account. Our comparison helps you find the broker
					of your choice.
				</p>
			</div>

			<div className="broker-actions">
				<div className="broker-actions_range">
					<label htmlFor="tradesPerYear">Trades Per year </label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="tradesPerYear"
							name="tradesPerYear"
							min="1"
							max="100"
							defaultValue="48"
							onChange={handleAverageTradesPerYearRange}
							onmousemove="tradesPerYearOutput.value=value"
						/>
						<span id="tradesPerYearOutput">{tradesPerYear}</span>
					</div>
				</div>

				<div className="broker-actions_range">
					<label htmlFor="averageTradeSize">Average Trade Size </label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="averageTradeSize"
							name="averageTradeSize"
							min="100"
							max="100000"
							defaultValue="1000"
							onChange={handleTradeSizeRange}
							onmousemove="averageTradeSizeOutput.value=value"
						/>
						<span id="averageTradeSizeOutput">{averageTradeSize}</span>
					</div>
				</div>

				<div className="broker-actions_range">
					<label htmlFor="marginLoad">Margin Load</label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="marginLoad"
							name="marginLoad"
							min="100"
							max="100000"
							defaultValue="0"
							onChange={handleMarginLoadRange}
							onmousemove="marginLoadOutput.value=value"
						/>
						<span id="marginLoadOutput">{marginLoad}</span>
					</div>
				</div>
				<div className="broker-actions_fragments">
					<label htmlFor="fragments">Purchase stocks in even amounts</label>
					<input
						type="checkbox"
						name="fragments"
						id="fragments"
						onClick={handleFragmentChecked}
					/>
				</div>
			</div>

			<div className="broker-table">
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="broker-notes">
				<p>* plus foreign charges</p>
				<p>
					Disclaimer: Investing can be financially worthwhile, but it is not
					without risk. You can lose (part of) your deposit
				</p>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	broker: state.broker,
});

export default connect(mapStateToProps, {
	getBrokerData,
	setTradesPerYear,
	setAverageTradeSize,
	setMarginLoad,
	toggleFragmentsTrade,
})(Broker);
