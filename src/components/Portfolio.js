import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";

function Portfolio({ table }) {
	const [tickers, setTickers] = useState([]);
	const { t } = useTranslation();

	useEffect(() => {
		let portfolio = [];
		const fetchTicker = () => {
			table.portfolio.map((stock) => {
				const ticker = stock.split(",")[0];
				axios
					.get(`https://levermy.herokuapp.com/levermann/stock/${ticker}`)
					.then(({ data }) => {
						portfolio.push(data[1][0]);
						setTickers((prevArray) => [...prevArray, data[1][0]]);
					});
			});
		};

		fetchTicker();
		console.log(tickers);
	}, []);

	return (
		<div className="portfolio">
			<table className="sidebar-portfolio-table">
				<thead>
					<tr>
						<th>{t("SEC NAME")}</th>
						<th>{t("SEC TICKER")}</th>
						<th className="tooltipT">
							1 <span class="tooltiptextT">{t("1")}</span>
						</th>
						<th className="tooltipT">
							2 <span class="tooltiptextT">{t("2")}</span>
						</th>
						<th className="tooltipT">
							3 <span class="tooltiptextT">{t("3")}</span>
						</th>
						<th className="tooltipT">
							4 <span class="tooltiptextT">{t("4")}</span>
						</th>
						<th className="tooltipT">
							5 <span class="tooltiptextT">{t("5")}</span>
						</th>
						<th className="tooltipT">
							6 <span class="tooltiptextT">{t("6")}</span>
						</th>
						<th className="tooltipT">
							7 <span class="tooltiptextT">{t("7")}</span>
						</th>
						<th className="tooltipT">
							8 <span class="tooltiptextT">{t("8")}</span>
						</th>
						<th className="tooltipT">
							9<span class="tooltiptextT">{t("9")}</span>
						</th>
						<th className="tooltipT">
							10 <span class="tooltiptextT">{t("10")}</span>
						</th>
						<th className="tooltipT">
							11 <span class="tooltiptextT">{t("11")}</span>
						</th>
						<th className="tooltipT">
							12 <span class="tooltiptextT">{t("12")}</span>
						</th>
						<th className="tooltipT">
							13 <span class="tooltiptextT">{t("13")}</span>
						</th>
						<th>{t("Total")}</th>
					</tr>
				</thead>
				<tbody>
					{table.hasPortfolio &&
						tickers.map((ticker) => {
							return (
								<tr key={ticker.sec_ticker}>
									<td className="td">{ticker.sec_name}</td>
									<td className="td">{ticker.sec_ticker}</td>
									<td className="td">{ticker.roe_score}</td>
									<td className="td">{ticker.ebit_margin_score}</td>
									<td className="td">{ticker.equity_ratio_score}</td>
									<td className="td">{ticker.pe_ratio_5y_score}</td>
									<td className="td">{ticker.pe_ratio_cy_score}</td>
									<td className="td">{ticker.analyst_opinions_score}</td>
									<td className="td">{ticker.reaction_earnings_score}</td>
									<td className="td">{ticker.profit_revision_score}</td>
									<td className="td">{ticker.price_today_vs_6_months_score}</td>
									<td className="td">{ticker.price_today_vs_year_score}</td>
									<td className="td">{ticker.price_momentum_score}</td>
									<td className="td">{ticker.three_month_reversal_score}</td>
									<td className="td">{ticker.profit_growth_score}</td>
									<td className="td">{ticker.end_score}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps)(Portfolio);
