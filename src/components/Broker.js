import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { broker_columns } from "../config/broker";

import { BROKER_SORT } from "../config/defaultSort";

import {
	getBrokerData,
	setTradesPerYear,
	setAverageTradeSize,
	setMarginLoad,
	toggleFragmentsTrade,
	getFragmentsOnly,
	getBrokerOnMargin,
} from "../actions/broker";

function Broker(props) {
	const {
		tradesPerYear,
		averageTradeSize,
		marginLoad,
		showBrokers,
		brokers,
		showFragments,
	} = props.broker;

	const columns = useMemo(
		() => broker_columns,
		[broker_columns, averageTradeSize]
	);
	const data = useMemo(() => {
		if (showFragments) return showBrokers;
		else {
			if (marginLoad == 0) {
				return brokers;
			} else return showBrokers;
		}
	}, [showBrokers, brokers, marginLoad, averageTradeSize]);
	const defaultSort = useMemo(() => BROKER_SORT, []);

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
			initialState: {
				sortBy: [defaultSort],
			},
		},
		useSortBy
		// useGlobalFilter
	);

	// const { globalFilter } = state;

	//As we come here, this particular function is reponsible to trigger anything that is inside it eveytime a page is loaded.
	//So the cycle of fetching cycle comes from here.
	useEffect(() => {
		props.getBrokerData();
	}, [props.getBrokerData]);

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
		if (showFragments) {
			props.setMarginLoad(e.target.value);
		} else {
			props.setMarginLoad(e.target.value);
			props.getBrokerOnMargin();
		}
		// return setGlobalFilter(e.target.value);
	};

	const handleFragmentChecked = (e) => {
		if (e.target.checked) {
			props.toggleFragmentsTrade(true);
			props.getFragmentsOnly();
		} else {
			props.toggleFragmentsTrade(false);
			props.getBrokerOnMargin();
		}
	};

	const { t } = useTranslation();

	return (
		<div className="broker">
			<h1 className="broker-title">{t("Broker")}</h1>
			<div className="broker-text">
				<p>{t("Broker_Text")}</p>
			</div>

			<div className="broker-actions">
				<div className="broker-actions_range">
					<label htmlFor="tradesPerYear">{t("Trades Per Year")}</label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="tradesPerYear"
							name="tradesPerYear"
							min="1"
							max="100"
							defaultValue="48"
							onChange={handleAverageTradesPerYearRange}
							onMouseMove="tradesPerYearOutput.value=value"
						/>
						<span id="tradesPerYearOutput">{tradesPerYear}</span>
					</div>
				</div>

				<div className="broker-actions_range">
					<label htmlFor="averageTradeSize">{t("Average Trade Size")}</label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="averageTradeSize"
							name="averageTradeSize"
							min="100"
							max="100000"
							defaultValue="1000"
							step="100"
							onChange={handleTradeSizeRange}
							onmousemove="averageTradeSizeOutput.value=value"
						/>
						<span id="averageTradeSizeOutput">{averageTradeSize}</span>
					</div>
				</div>

				<div className="broker-actions_range">
					<label htmlFor="marginLoad">{t("Margin Load")}</label>
					<div className="broker-actions_range_wrapper">
						<input
							type="range"
							id="marginLoad"
							name="marginLoad"
							min="0"
							max="100000"
							defaultValue="0"
							step="100"
							onChange={handleMarginLoadRange}
							onmousemove="marginLoadOutput.value=value"
						/>
						<span id="marginLoadOutput">{marginLoad}</span>
					</div>
				</div>
				<div className="broker-actions_fragments">
					<label htmlFor="fragments">{t("EVEN STOCKS BUY")}</label>
					<label className="switch">
						<input onClick={handleFragmentChecked} type="checkbox" />
						<div>
							<span></span>
						</div>
					</label>
				</div>
			</div>

			<div className="broker-table">
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
				<p>{t("Broker_Charge")}</p>
				<p>Euro to USD: {props.broker.euroToUsd}</p>
				<p>{t("Broker_Note")}</p>
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
	getFragmentsOnly,
	getBrokerOnMargin,
})(Broker);
