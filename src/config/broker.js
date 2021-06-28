import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import store from "../store";
import i18n from "../i18n";

import comdirect from "../assets/BrokerLogos/comdirect.png";
import consors from "../assets/BrokerLogos/consors.png";
import dkb from "../assets/BrokerLogos/dkb.png";
import ibkr from "../assets/BrokerLogos/ibkr.png";
import onvista from "../assets/BrokerLogos/onvista.png";
import scalablecapital from "../assets/BrokerLogos/scalablecapital.png";
import traderepublic from "../assets/BrokerLogos/traderepublic.png";

let maxCostPerTrade = null;
let costPerTrade = null;
let costPerMonth = null;

export const broker_columns = [
	{
		Header: i18n.t("BROKER"),
		accessor: "name",
		Cell: (row) => {
			const { logo } = row.row.original;

			if (logo === "comdirect.png")
				return (
					<div>
						<img className="broker-image" src={comdirect} />
					</div>
				);
			else if (logo === "consors.png")
				return (
					<div>
						<img className="broker-image" src={consors} />
					</div>
				);
			else if (logo === "dkb.png")
				return (
					<div>
						<img className="broker-image" src={dkb} />
					</div>
				);
			else if (logo === "ibkr.png")
				return (
					<div>
						<img className="broker-image" src={ibkr} />
					</div>
				);
			else if (logo === "onvista.png")
				return (
					<div>
						<img className="broker-image" src={onvista} />
					</div>
				);
			else if (logo === "scalablecapital.png")
				return (
					<div>
						<img className="broker-image" src={scalablecapital} />
					</div>
				);
			else
				return (
					<div>
						<img className="broker-image" src={traderepublic} />
					</div>
				);
		},
	},
	{
		Header: i18n.t("TYPE"),
		accessor: "type",
		// Cell: (row) => {
		// 	const { marginLoad, showFragments } = store.getState().broker;
		// 	const { fragments_trading_available } = row.row.original;

		// 	if (showFragments) {
		// 		if (fragments_trading_available === 1) {
		// 			if (row.row.original.margin_available === 1) {
		// 				if (marginLoad > row.row.original.margin_minimum_loan_amount)
		// 					return row.value;
		// 				else return null;
		// 			} else return null;
		// 		} else return null;
		// 	} else {
		// 		if (row.row.original.margin_available === 1) {
		// 			if (marginLoad > row.row.original.margin_minimum_loan_amount)
		// 				return row.value;
		// 			else return null;
		// 		} else return null;
		// 	}
		// },
	},
	{
		Header: i18n.t("FORMULA"),
		accessor: "formula_text_lowest",

		// width: 300,
		// Cell: (row) => {
		// 	const { marginLoad, showFragments } = store.getState().broker;
		// 	const { fragments_trading_available } = row.row.original;

		// 	if (showFragments) {
		// 		if (fragments_trading_available === 1) {
		// 			if (row.row.original.margin_available === 1) {
		// 				if (marginLoad > row.row.original.margin_minimum_loan_amount)
		// 					return row.value;
		// 				else return null;
		// 			} else return null;
		// 		} else return null;
		// 	} else {
		// 		if (row.row.original.margin_available === 1) {
		// 			if (marginLoad > row.row.original.margin_minimum_loan_amount)
		// 				return row.value;
		// 			else return null;
		// 		} else return null;
		// 	}
		// },
	},
	{
		Header: i18n.t("MIN"),
		accessor: "minimum_ordercosts_lowest",

		Cell: (row) => {
			return row.value.toFixed(2);
		},
	},
	{
		Header: i18n.t("MAX"),
		id: "max",
		Cell: (row) => {
			const { marginLoad, averageTradeSize, showFragments } =
				store.getState().broker;
			const {
				maximum_fixed_ordercosts_lowest,
				maximum_relative_ordercosts_lowest,
				fragments_trading_available,
			} = row.row.original;

			// if (showFragments) {
			// 	if (fragments_trading_available === 1) {
			maxCostPerTrade =
				maximum_fixed_ordercosts_lowest +
				maximum_relative_ordercosts_lowest * averageTradeSize;

			// if (row.row.original.margin_available === 1) {
			// 	if (marginLoad > row.row.original.margin_minimum_loan_amount)
			return maxCostPerTrade.toFixed(2);
			// 		else return null;
			// 	} else return null;
			// } else return null;
			// } else {
			// maxCostPerTrade =
			// 	maximum_fixed_ordercosts_lowest +
			// 	maximum_relative_ordercosts_lowest * averageTradeSize;

			// if (row.row.original.margin_available === 1) {
			// 	if (marginLoad > row.row.original.margin_minimum_loan_amount)
			// 		return maxCostPerTrade.toFixed(2);
			// 	else return null;
			// } else return null;
			// }
		},
	},
	{
		Header: i18n.t("PER TRADE"),
		id: "per_trade",
		sortType: "basic",
		accessor: (row) => {
			const { averageTradeSize, averageEuroPrice, euroToUsd } =
				store.getState().broker;

			const {
				fixed_ordercosts_lowest,
				relative_extra_ordercosts_lowest,
				minimum_extra_ordercosts_lowest,
				minimum_ordercosts_lowest,
				relative_ordercosts_lowest,
				maximum_fixed_ordercosts_lowest,
				maximum_relative_ordercosts_lowest,
			} = row;

			maxCostPerTrade =
				maximum_fixed_ordercosts_lowest +
				maximum_relative_ordercosts_lowest * averageTradeSize;

			let extraCostPerTrade =
				relative_extra_ordercosts_lowest * averageTradeSize;

			if (extraCostPerTrade < minimum_extra_ordercosts_lowest)
				extraCostPerTrade = minimum_extra_ordercosts_lowest;

			let costPerTradeBeforeExtraCost =
				fixed_ordercosts_lowest + relative_ordercosts_lowest * averageTradeSize;

			let costPerTrade = costPerTradeBeforeExtraCost + extraCostPerTrade;

			if (costPerTrade < minimum_ordercosts_lowest)
				costPerTrade = minimum_ordercosts_lowest;
			else if (costPerTrade > maxCostPerTrade) costPerTrade = maxCostPerTrade;

			if (row.name === "Interactive Brokers")
				costPerTrade =
					(fixed_ordercosts_lowest +
						(relative_ordercosts_lowest * averageTradeSize) /
							averageEuroPrice) /
					euroToUsd;

			console.log(row.name, costPerTrade);

			return costPerTrade;
		},
		Cell: (row) => {
			const { averageTradeSize, averageEuroPrice, euroToUsd } =
				store.getState().broker;

			const {
				fixed_ordercosts_lowest,
				relative_extra_ordercosts_lowest,
				minimum_extra_ordercosts_lowest,
				minimum_ordercosts_lowest,
				relative_ordercosts_lowest,
			} = row.row.original;

			let extraCostPerTrade =
				relative_extra_ordercosts_lowest * averageTradeSize;

			if (extraCostPerTrade < minimum_extra_ordercosts_lowest)
				extraCostPerTrade = minimum_extra_ordercosts_lowest;

			let costPerTradeBeforeExtraCost =
				fixed_ordercosts_lowest + relative_ordercosts_lowest * averageTradeSize;

			costPerTrade = costPerTradeBeforeExtraCost + extraCostPerTrade;

			if (costPerTrade < minimum_ordercosts_lowest)
				costPerTrade = minimum_ordercosts_lowest;
			else if (costPerTrade > maxCostPerTrade) costPerTrade = maxCostPerTrade;

			if (row.row.original.name === "Interactive Brokers")
				costPerTrade =
					(fixed_ordercosts_lowest +
						(relative_ordercosts_lowest * averageTradeSize) /
							averageEuroPrice) /
					euroToUsd;

			if (extraCostPerTrade === 0) return costPerTrade.toFixed(2);
			return (
				<div className="value">
					<span className="broker-tooltip">
						{costPerTrade.toFixed(2)} + {extraCostPerTrade.toFixed(2)} foreign
						charges
					</span>
					{costPerTrade.toFixed(2)}
				</div>
			);
		},
	},
	{
		Header: i18n.t("PER MONTH"),
		id: "per month",

		Cell: (row) => {
			const { marginLoad, tradesPerYear, showFragments } =
				store.getState().broker;

			const { fragments_trading_available } = row.row.original;

			// if (showFragments) {
			// 	if (fragments_trading_available === 1) {
			costPerMonth = costPerTrade * (tradesPerYear / 12);
			// 		if (row.row.original.margin_available === 1) {
			// 			if (marginLoad > row.row.original.margin_minimum_loan_amount)
			return costPerMonth.toFixed(2);
			// 		else return null;
			// 	} else return null;
			// } else return null;
			// } else {
			// 	costPerMonth = costPerTrade * tradesPerYear;
			// 	if (row.row.original.margin_available === 1) {
			// 		if (marginLoad > row.row.original.margin_minimum_loan_amount)
			// 			return costPerMonth.toFixed(2);
			// 		else return null;
			// 	} else return null;
			// }
		},
	},
	{
		Header: i18n.t("PER YEAR"),
		id: "per year",

		Cell: (row) => {
			// if (showFragments) {
			// 	if (fragments_trading_available === 1) {
			const costPerYear = 12 * costPerMonth;

			// if (row.row.original.margin_available === 1) {
			// 	if (marginLoad > row.row.original.margin_minimum_loan_amount)
			return costPerYear.toFixed(2);
			// 			else return null;
			// 		} else return null;
			// 	} else return null;
			// } else {
			// 	const costPerYear = 12 * costPerMonth;

			// 	if (row.row.original.margin_available === 1) {
			// 		if (marginLoad > row.row.original.margin_minimum_loan_amount)
			// 			return costPerYear.toFixed(2);
			// 		else return null;
			// 	} else return null;
			// }
		},
	},
	{
		Header: i18n.t("MARGIN INTEREST RATE"),
		accessor: "margin_interest",

		Cell: (row) => {
			const marginInterest = row.value * 100;
			return <div>{marginInterest.toFixed(2)} %</div>;
		},
	},
	{
		Header: i18n.t("INTEREST PER YEAR"),
		id: "interestPerYear",

		Cell: (row) => {
			const { marginLoad } = store.getState().broker;
			const { margin_interest } = row.row.original;

			const interestPerYear = margin_interest * marginLoad;

			return interestPerYear.toFixed(2);
		},
	},
	{
		Header: i18n.t("LINK"),
		id: "Link",

		Cell: (row) => {
			const { marginLoad, showFragments } = store.getState().broker;
			const { website_url, fragments_trading_available } = row.row.original;

			// if (showFragments) {
			// 	if (fragments_trading_available === 1) {
			// 		if (row.row.original.margin_available === 1) {
			// 			if (marginLoad > row.row.original.margin_minimum_loan_amount)
			return (
				<a href={website_url}>
					<FaExternalLinkAlt />
				</a>
			);
			// 				else return null;
			// 			} else return null;
			// 		} else return null;
			// 	} else {
			// 		if (row.row.original.margin_available === 1) {
			// 			if (marginLoad > row.row.original.margin_minimum_loan_amount)
			// 				return (
			// 					<a href={website_url}>
			// 						<FaExternalLinkAlt />
			// 					</a>
			// 				);
			// 			else return null;
			// 		} else return null;
			// 	}
		},
	},
];
