import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import store from "../store";
import i18n from "../i18n";

import comdirect from "../assets/BrokerLogos/comdirect_logo.png";
import consors from "../assets/BrokerLogos/consors_logo.png";
import dkb from "../assets/BrokerLogos/dkb_logo.png";
import interactive from "../assets/BrokerLogos/interactive_brokers_logo.png";
import onvista from "../assets/BrokerLogos/onvista_logo.png";
import scalable from "../assets/BrokerLogos/scalable_cap_logo.png";
import trade from "../assets/BrokerLogos/trade_rep_logo.png";

let maxCostPerTrade = null;
let costPerTrade = null;
let costPerMonth = null;

export const broker_columns = [
	{
		Header: i18n.t("BROKER"),
		accessor: "name",
		disableSortBy: true,
		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { fragments_trading_available } = row.row.original;

			if (showFragments) {
				if (fragments_trading_available === 1) {
					if (row.row.original.margin_available === 1) {
						if (marginLoad > row.row.original.margin_minimum_loan_amount) {
							row.column.isHidden = true;
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
		Header: i18n.t("TYPE"),
		accessor: "type",
		disableSortBy: true,
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
		Header: i18n.t("FORMULA"),
		accessor: "formula_text_lowest",
		disableSortBy: true,
		width: 300,
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
		Header: i18n.t("MIN"),
		accessor: "minimum_ordercosts_lowest",
		disableSortBy: true,
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
		Header: i18n.t("MAX"),
		id: "max",
		disableSortBy: true,
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
		Header: i18n.t("PER TRADE"),
		id: "per trade",
		disableSortBy: true,
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

					let costPerTradeBeforeExtraCost =
						fixed_ordercosts_lowest +
						fixed_ordercosts_lowest * averageTradeSize;

					costPerTrade = costPerTradeBeforeExtraCost + extraCostPerTrade;

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
							return (
								<div className="value">
									<span className="broker-tooltip">
										{costPerTrade.toFixed(2)} + {extraCostPerTrade.toFixed(2)}{" "}
										foreign charges
									</span>
									{costPerTrade.toFixed(2)}
								</div>
							);
						else return null;
					} else return null;
				} else return null;
			} else {
				let extraCostPerTrade =
					relative_extra_ordercosts_lowest * averageTradeSize;
				if (extraCostPerTrade < minimum_extra_costs_lowest)
					extraCostPerTrade = minimum_extra_costs_lowest;

				let costPerTradeBeforeExtraCost =
					fixed_ordercosts_lowest + fixed_ordercosts_lowest * averageTradeSize;

				costPerTrade = costPerTradeBeforeExtraCost + extraCostPerTrade;

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
						return (
							<div className="value">
								<span className="broker-tooltip">
									{costPerTrade.toFixed(2)} + {extraCostPerTrade.toFixed(2)}{" "}
									foreign charges
								</span>
								{costPerTrade.toFixed(2)}
							</div>
						);
					else return null;
				} else return null;
			}
		},
	},
	{
		Header: i18n.t("PER MONTH"),
		id: "per month",
		disableSortBy: true,
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
		Header: i18n.t("PER YEAR"),
		id: "per year",
		disableSortBy: true,
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
		Header: i18n.t("MARGIN INTEREST RATE"),
		accessor: "margin_interest",
		defaultCanSort: true,
		sortDescFirst: true,
		disableSortBy: true,
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
		Header: i18n.t("INTEREST PER YEAR"),
		id: "interestPerYear",
		disableSortBy: true,
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
		Header: i18n.t("LINK"),
		id: "Link",
		disableSortBy: true,
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
