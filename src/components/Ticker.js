import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { fetchTickerData } from "../actions/table";
import { AiFillLock } from "react-icons/ai";
import RowOne from "./modals/RowOne";
import RowTwo from "./modals/RowTwo";
import RowThree from "./modals/RowThree";
import Row4 from "./modals/RowFour";
import RowFour from "./modals/RowFour";
import RowFive from "./modals/RowFive";
import RowSix from "./modals/RowSix";
import RowSeven from "./modals/RowSeven";
import RowEight from "./modals/RowEight";
import RowNine from "./modals/RowNine";
import RowTen from "./modals/RowTen";
import RowEleven from "./modals/RowEleven";
import RowTwelve from "./modals/RowTwelve";
import RowThirteen from "./modals/RowThirteen";

function Ticker(props) {
	//Getting the paramater from the URL for ex, /score/AGM or /score/AAPL, so ticker will have AGM or AAPLE or any other ticker name depending on which URL it is going
	const { ticker } = useParams();

	//The translation function
	const { t } = useTranslation();

	const [isOpen1, setIsOpen1] = useState(true);
	const [isOpen2, setIsOpen2] = useState(true);
	const [isOpen3, setIsOpen3] = useState(true);
	const [isOpen4, setIsOpen4] = useState(true);
	const [isOpen5, setIsOpen5] = useState(true);
	const [isOpen6, setIsOpen6] = useState(true);
	const [isOpen7, setIsOpen7] = useState(true);
	const [isOpen8, setIsOpen8] = useState(true);
	const [isOpen9, setIsOpen9] = useState(true);
	const [isOpen10, setIsOpen10] = useState(true);
	const [isOpen11, setIsOpen11] = useState(true);
	const [isOpen12, setIsOpen12] = useState(true);
	const [isOpen13, setIsOpen13] = useState(true);

	const hanldeRow1 = () => {
		setIsOpen1(!isOpen1);
	};

	const hanldeRow2 = () => {
		setIsOpen2(!isOpen2);
	};

	const hanldeRow3 = () => {
		setIsOpen3(!isOpen3);
	};

	const hanldeRow4 = () => {
		setIsOpen4(!isOpen4);
	};

	const hanldeRow5 = () => {
		setIsOpen5(!isOpen5);
	};

	const hanldeRow6 = () => {
		setIsOpen6(!isOpen6);
	};

	const hanldeRow7 = () => {
		setIsOpen7(!isOpen7);
	};

	const hanldeRow8 = () => {
		setIsOpen8(!isOpen8);
	};

	const hanldeRow9 = () => {
		setIsOpen9(!isOpen9);
	};

	const hanldeRow10 = () => {
		setIsOpen10(!isOpen10);
	};

	const hanldeRow11 = () => {
		setIsOpen11(!isOpen11);
	};

	const hanldeRow12 = () => {
		setIsOpen12(!isOpen12);
	};

	const hanldeRow13 = () => {
		setIsOpen13(!isOpen13);
	};

	const onClose1 = () => {
		setIsOpen1(true);
	};

	const onClose2 = () => {
		setIsOpen2(true);
	};

	const onClose3 = () => {
		setIsOpen3(true);
	};

	const onClose4 = () => {
		setIsOpen4(true);
	};

	const onClose5 = () => {
		setIsOpen5(true);
	};

	const onClose6 = () => {
		setIsOpen6(true);
	};

	const onClose7 = () => {
		setIsOpen7(true);
	};

	const onClose8 = () => {
		setIsOpen8(true);
	};

	const onClose9 = () => {
		setIsOpen9(true);
	};

	const onClose10 = () => {
		setIsOpen10(true);
	};

	const onClose11 = () => {
		setIsOpen11(true);
	};

	const onClose12 = () => {
		setIsOpen12(true);
	};

	const onClose13 = () => {
		setIsOpen13(true);
	};

	//Fetching each ticker from api and setting it.
	useEffect(() => {
		props.fetchTickerData(ticker);
	}, []);

	// let color = null;
	// if (props.table.data.end_score >= 4) color = "green";
	// else if (props.table.data.end_score === 3) color = "grey";
	// else color = "red";

	return (
		<>
			{!props.table.isLoading && (
				<div className="container ticker">
					<RowOne show={isOpen1} onClose={onClose1} />
					<RowTwo show={isOpen2} onClose={onClose2} />
					<RowThree show={isOpen3} onClose={onClose3} />
					<RowFour show={isOpen4} onClose={onClose4} />
					<RowFive show={isOpen5} onClose={onClose5} />
					<RowSix show={isOpen6} onClose={onClose6} />
					<RowSeven show={isOpen7} onClose={onClose7} />
					<RowEight show={isOpen8} onClose={onClose8} />
					<RowNine show={isOpen9} onClose={onClose9} />
					<RowTen show={isOpen10} onClose={onClose10} />
					<RowEleven show={isOpen11} onClose={onClose11} />
					<RowTwelve show={isOpen12} onClose={onClose12} />
					<RowThirteen show={isOpen13} onClose={onClose13} />
					<div className="ticket-content">
						<h1 className="ticker-content-name">{props.table.data.sec_name}</h1>
						<div className="ticker-content-meta">
							<div className="ticker-content-meta_row-one">
								<p className="ticker-content-meta_data">
									ISIN <span>{props.table.data.isin}</span>
								</p>
								<p className="ticker-content-meta_data">
									Symbol <span>{props.table.data.sec_ticker}</span>
								</p>
								<p className="ticker-content-meta_data">
									Market Cap <span>{props.table.data.market_cap}</span>
								</p>
								<p className="ticker-content-meta_data">MK</p>
							</div>
							<div className="ticker-content-meta_row-two">
								<p className="ticker-content-meta_data">
									Index <span>{props.table.data.indexgroup}</span>
								</p>
								<p className="ticker-content-meta_data">
									Sector <span>{props.table.data.sector}</span>
								</p>
								<p className="ticker-content-meta_data">
									Industry <span>{props.table.data.industry}</span>
								</p>
								<p className="ticker-content-meta_data">
									Share On <span>{props.table.data.shareon}</span>
								</p>
							</div>
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th className="text-align">CRITERIA</th>
								<th>VALUE</th>
								<th>POINT</th>
							</tr>
						</thead>
						<tbody>
							<tr onClick={hanldeRow1}>
								<td className="text-align">{t("1")}</td>
								<td>{props.table.data.roe_value}</td>
								<td>{props.table.data.roe_score}</td>
							</tr>
							<tr onClick={hanldeRow2}>
								<td className="text-align">{t("2")}</td>
								<td>{props.table.data.ebit_margin_value}</td>
								<td>{props.table.data.ebit_margin_score}</td>
							</tr>
							<tr onClick={hanldeRow3}>
								<td className="text-align">{t("3")}</td>
								<td>{props.table.data.equity_ratio_value}</td>
								<td>{props.table.data.equity_ratio_score}</td>
							</tr>
							<tr onClick={hanldeRow4}>
								<td className="text-align">{t("4")}</td>
								<td>{props.table.data.pe_ratio_5y_value}</td>
								<td>{props.table.data.pe_ratio_5y_score}</td>
							</tr>
							<tr onClick={hanldeRow5}>
								<td className="text-align">{t("5")}</td>
								<td>{props.table.data.pe_ratio_cy_value}</td>
								<td>{props.table.data.pe_ratio_cy_score}</td>
							</tr>
							<tr onClick={hanldeRow6}>
								<td className="text-align">{t("6")}</td>
								<td>{props.table.data.analyst_opinions_value}</td>
								<td>{props.table.data.analyst_opinions_score}</td>
							</tr>
							<tr onClick={hanldeRow7}>
								<td className="text-align">{t("7")}</td>
								<td>{props.table.data.reaction_earnings_value}</td>
								<td>{props.table.data.reaction_earnings_score}</td>
							</tr>
							<tr onClick={hanldeRow8}>
								<td className="text-align">{t("8")}</td>
								<td>{props.table.data.profit_revision_value}</td>
								<td>{props.table.data.profit_revision_score}</td>
							</tr>
							<tr onClick={hanldeRow9}>
								<td className="text-align">{t("9")}</td>
								<td>{props.table.data.price_today_vs_6_months_value}</td>
								<td>{props.table.data.price_today_vs_6_months_score}</td>
							</tr>
							<tr onClick={hanldeRow10}>
								<td className="text-align">{t("10")}</td>
								<td>{props.table.data.price_today_vs_year_value}</td>
								<td>{props.table.data.price_today_vs_year_score}</td>
							</tr>
							<tr onClick={hanldeRow11}>
								<td className="text-align">{t("11")}</td>
								<td>{props.table.data.price_momentum_value}</td>
								<td>{props.table.data.price_momentum_score}</td>
							</tr>
							<tr onClick={hanldeRow12}>
								<td className="text-align">{t("12")}</td>
								<td>{props.table.data.three_month_reversal_value}</td>
								<td>{props.table.data.three_month_reversal_score}</td>
							</tr>
							<tr onClick={hanldeRow13}>
								<td className="text-align">{t("13")}</td>
								<td>{props.table.data.profit_growth_value}</td>
								<td>{props.table.data.profit_growth_score}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});
export default connect(mapStateToProps, { fetchTickerData })(Ticker);
