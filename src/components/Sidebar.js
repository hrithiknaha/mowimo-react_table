import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { connect } from "react-redux";

//The hnadlers are received here and are destructured as a norm of writing clean code.
function Sidebar({
	handleAll,
	handleDowJones,
	handleNasdaq,
	handleSP,
	selected,
	table,
}) {
	const { t } = useTranslation();

	// console.log(table.portfolio);
	return (
		<div className="sidebar">
			<div className="sidebar-logo">
				<Link to="/">
					<AiOutlineStock />
				</Link>
			</div>
			<div className="sidebar-portfolio">
				<a className="sidebar-anchor">Start</a>
				<a className="sidebar-anchor_selected sidebar-anchor">Livermann</a>
			</div>
			<div className="sidebar-wrapper">
				<Link
					to="/"
					className={
						selected === "all" ? "sidebar-index_selected" : "sidebar-anchor"
					}
					// The function are called everytime the anchor tag is clicked, similar for all the below anchor tags
					onClick={handleAll}
				>
					{t("All")}
				</Link>
				<Link
					to="/dowjones"
					className={
						selected === "dowjones"
							? "sidebar-index_selected"
							: "sidebar-anchor"
					}
					onClick={handleDowJones}
				>
					Dow Jones
				</Link>
				<Link
					to="/nasdaq"
					className={
						selected === "nasdaq" ? "sidebar-index_selected" : "sidebar-anchor"
					}
					onClick={handleNasdaq}
				>
					Nasdaq
				</Link>
				<Link
					to="/sp500"
					className={
						selected === "sp" ? "sidebar-index_selected" : "sidebar-anchor"
					}
					onClick={handleSP}
				>
					S&P500
				</Link>
			</div>
			<div className="sidebar-portfolio">
				<a className="sidebar-anchor">Portfolio</a>
				{/* <table className="sidebar-portfolio-table">
					<thead>
						<tr>
							<th>Stock</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{table.hasPortfolio &&
							table.portfolio.map((stock) => {
								return (
									<tr key={stock}>
										<td className="td">{stock.split(",")[0]}</td>
										<td className="td">{stock.split(",")[1]}</td>
									</tr>
								);
							})}
					</tbody>
				</table> */}
			</div>
			<div className="sidebar-links">
				<Link to="/policy">{t("Privacy Policy")}</Link>
				<Link to="/imprint">{t("Imprint")}</Link>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps)(Sidebar);
