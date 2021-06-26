import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import store from "../store";

let maxCostPerTrade = null;
let costPerTrade = null;
let costPerMonth = null;

export const broker_columns = [
	{
		Header: "Broker",
		accessor: "name",
		isHidden: true,
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount) {
							return row.value;
						} else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return row.value;
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Type",
		accessor: "type",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return row.value;
						else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return row.value;
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Formula",
		accessor: "formula_text_lowest",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return row.value;
						else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return row.value;
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Min",
		accessor: "minimum_ordercosts_lowest",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return row.value;
						else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return row.value;
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Max",
		id: "max",
		Cell: (row) => {
			const { marginLoad, averageTradeSize, showFragments } =
				store.getState().broker;
			const {
				maximum_fixed_ordercosts_lowest,
				maximum_relative_ordercosts_lowest,
				fragments_trading_available,
			} = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					maxCostPerTrade =
						maximum_fixed_ordercosts_lowest +
						maximum_relative_ordercosts_lowest * averageTradeSize;

					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return maxCostPerTrade.toFixed(2);
						else return null;
					} else return null;
				} else return null;
			} else {
				maxCostPerTrade =
					maximum_fixed_ordercosts_lowest +
					maximum_relative_ordercosts_lowest * averageTradeSize;

				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return maxCostPerTrade.toFixed(2);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Per Trade",
		id: "per trade",
		Cell: (row) => {
			const {
				marginLoad,
				averageTradeSize,
				averageEuroPrice,
				euroToUsd,
				showFragments,
			} = store.getState().broker;

			const {
				fixed_ordercosts_lowest,
				relative_extra_ordercosts_lowest,
				minimum_extra_costs_lowest,
				minimum_ordercost_lowest,
				relative_ordercosts_lowest,
				fragments_trading_available,
			} = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					let extraCostPerTrade =
						relative_extra_ordercosts_lowest * averageTradeSize;
					if (extraCostPerTrade < minimum_extra_costs_lowest)
						extraCostPerTrade = minimum_extra_costs_lowest;

					costPerTrade =
						fixed_ordercosts_lowest +
						fixed_ordercosts_lowest * averageTradeSize +
						extraCostPerTrade;

					if (costPerTrade < minimum_ordercost_lowest)
						costPerTrade = minimum_ordercost_lowest;
					else if (costPerTrade > maxCostPerTrade)
						costPerTrade = maxCostPerTrade;

					if (row.row.original.name === "Interactive Brokers")
						costPerTrade =
							fixed_ordercosts_lowest +
							(relative_ordercosts_lowest * averageTradeSize) /
								averageEuroPrice /
								euroToUsd;

					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return costPerTrade.toFixed(2);
						else return null;
					} else return null;
				} else return null;
			} else {
				let extraCostPerTrade =
					relative_extra_ordercosts_lowest * averageTradeSize;
				if (extraCostPerTrade < minimum_extra_costs_lowest)
					extraCostPerTrade = minimum_extra_costs_lowest;

				costPerTrade =
					fixed_ordercosts_lowest +
					fixed_ordercosts_lowest * averageTradeSize +
					extraCostPerTrade;

				if (costPerTrade < minimum_ordercost_lowest)
					costPerTrade = minimum_ordercost_lowest;
				else if (costPerTrade > maxCostPerTrade) costPerTrade = maxCostPerTrade;

				if (row.row.original.name === "Interactive Brokers")
					costPerTrade =
						fixed_ordercosts_lowest +
						(relative_ordercosts_lowest * averageTradeSize) /
							averageEuroPrice /
							euroToUsd;

				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return costPerTrade.toFixed(2);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Per Month",
		id: "per month",
		Cell: (row) => {
			const { marginLoad, tradesPerYear, showFragments } =
				store.getState().broker;

			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					costPerMonth = costPerTrade * tradesPerYear;
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return costPerMonth.toFixed(2);
						else return null;
					} else return null;
				} else return null;
			} else {
				costPerMonth = costPerTrade * tradesPerYear;
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return costPerMonth.toFixed(2);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Per Year",
		id: "per year",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					const costPerYear = 12 * costPerMonth;

					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return costPerYear.toFixed(2);
						else return null;
					} else return null;
				} else return null;
			} else {
				const costPerYear = 12 * costPerMonth;

				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return costPerYear.toFixed(2);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Margin Interest Rate",
		accessor: "margin_interest",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return row.value;
						else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return row.value;
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Interest Per Year",
		id: "interestPerYear",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { margin_interest, fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					const interestPerYear = margin_interest * marginLoad;

					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return interestPerYear.toFixed(2);
						else return null;
					} else return null;
				} else return null;
			} else {
				const interestPerYear = margin_interest * marginLoad;

				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return interestPerYear.toFixed(2);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: "Link",
		id: "Link",
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { website_url, fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount)
							return (
								<a href={website_url}>
									<FaExternalLinkAlt />
								</a>
							);
						else return null;
					} else return null;
				} else return null;
			} else {
				if (row.row.original.margin_available === 1) {
					if (marginLoad > row.row.original.margin_minimum_loan_amount)
						return (
							<a href={website_url}>
								<FaExternalLinkAlt />
							</a>
						);
					else return null;
				} else return null;
			}
		},
	},
];
