import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { connect } from "react-redux";

import { fetchTickerData } from "../actions/table";

import { AiFillLock } from "react-icons/ai";

function Ticker(props) {
	// const [data, setData] = useState({});
	// const [isLoading, setLoading] = useState(true);

	//Getting the paramater from the URL for ex, /score/AGM or /score/AAPL, so ticker will have AGM or AAPLE or any other ticker name depending on which URL it is going
	const { ticker } = useParams();

	//The translation function
	const { t } = useTranslation();

	//Fetching each ticker from api and setting it.
	useEffect(() => {
		props.fetchTickerData(ticker);
	}, []);

	let color = null;
	if (props.table.data.end_score >= 4) color = "green";
	else if (props.table.data.end_score === 3) color = "grey";
	else color = "red";

	return (
		<>
			{!props.table.isLoading && (
				<div className="container ticker">
					<table>
						<thead>
							<tr>
								<th>{t("Sector")}</th>
								<th>{t("ISIN")}</th>
								<th>{t("Industry")}</th>
								<th className="tooltipT">
									1 <span className="tooltiptextT">{t("1")}</span>
								</th>
								<th className="tooltipT">
									2 <span className="tooltiptextT">{t("2")}</span>
								</th>
								<th className="tooltipT">
									3 <span className="tooltiptextT">{t("3")}</span>
								</th>
								<th className="tooltipT">
									4 <span className="tooltiptextT">{t("4")}</span>
								</th>
								<th className="tooltipT">
									5 <span className="tooltiptextT">{t("5")}</span>
								</th>
								<th className="tooltipT">
									6 <span className="tooltiptextT">{t("6")}</span>
								</th>
								<th className="tooltipT">
									7 <span className="tooltiptextT">{t("7")}</span>
								</th>
								<th className="tooltipT">
									8 <span className="tooltiptextT">{t("8")}</span>
								</th>
								<th className="tooltipT">
									9<span className="tooltiptextT">{t("9")}</span>
								</th>
								<th className="tooltipT">
									10 <span className="tooltiptextT">{t("10")}</span>
								</th>
								<th className="tooltipT">
									11 <span className="tooltiptextT">{t("11")}</span>
								</th>
								<th className="tooltipT">
									12 <span className="tooltiptextT">{t("12")}</span>
								</th>
								<th className="tooltipT">
									13 <span className="tooltiptextT">{t("13")}</span>
								</th>
								<th>{t("Total")}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{props.table.data.sector}</td>
								<td>{props.table.data.isin}</td>
								<td>{props.table.data.industry}</td>
								<td>{props.table.data.roe_score}</td>
								<td>{props.table.data.ebit_margin_score}</td>
								<td>{props.table.data.equity_ratio_score}</td>
								<td>{props.table.data.pe_ratio_5y_score}</td>
								<td>{props.table.data.pe_ratio_cy_score}</td>
								<td>{props.table.data.analyst_opinions_score}</td>
								<td>
									{props.table.data.reaction_earnings_score ? (
										props.table.data.reaction_earnings_score
									) : (
										<AiFillLock />
									)}
								</td>
								<td>{props.table.data.profit_revision_score}</td>
								<td>{props.table.data.price_today_vs_6_months_score}</td>
								<td>{props.table.data.price_today_vs_year_score}</td>
								<td>{props.table.data.price_momentum_score}</td>
								<td>{props.table.data.three_month_reversal_score}</td>
								<td>{props.table.data.profit_growth_score}</td>
								<td>
									<span className={`flag-${color}`}>
										{props.table.data.end_score}
									</span>
								</td>
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
