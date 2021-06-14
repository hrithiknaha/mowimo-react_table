import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { connect } from "react-redux";

import HomeUnselected from "../assets/symbol/home_unselected_grey.png";
import HomeSelected from "../assets/symbol/home_selected.png";
import Home from "../assets/symbol/home.png";
import LevermannSelected from "../assets/symbol/levermann_selected.png";
import Levermann from "../assets/symbol/levermann.png";
import Heart from "../assets/symbol/heart.png";

import { setThreshold, countSignToggler } from "../actions/earnings";
import { addPortfolioSize } from "../actions/table";

//The hnadlers are received here and are destructured as a norm of writing clean code.
function Sidebar({
	handleAll,
	handleDowJones,
	handleNasdaq,
	handleSP,
	selected,
	handleStart,
	handleLevermann,
	handleLike,
	type,
	table,
	earnings,
	setThreshold,
	countSignToggler,
	addPortfolioSize,
}) {
	const { t } = useTranslation();

	const handleRangeChange = (e) => {
		setThreshold(e.target.value);
	};

	const handleToggleClick = (e) => {
		if (e.target.checked) countSignToggler(true);
		else countSignToggler(false);
	};

	const makePortfolioPayment = () => {
		addPortfolioSize();
	};

	return (
		<div className="sidebar">
			<div className="sidebar-flex">
				<div className="sidebar-flex-1">
					<div className="sidebar-logo">
						<Link to="/">
							<AiOutlineStock />
						</Link>
					</div>
					<div className="sidebar-portfolio">
						{type === "start" ? (
							<Link className="sidebar-anchor_selected" onClick={handleStart}>
								<img src={HomeSelected} alt="Home selected image" />
								<span>Start</span>
							</Link>
						) : (
							<Link className="sidebar-anchor" onClick={handleStart}>
								<img src={HomeUnselected} alt="Home image" />
								<span>Start</span>
							</Link>
						)}

						{type === "levermann" ? (
							<Link
								className="sidebar-anchor_selected"
								onClick={handleLevermann}
							>
								<img src={LevermannSelected} alt="Levermann selected l image" />
								<span>Levermann</span>
							</Link>
						) : (
							<Link className="sidebar-anchor" onClick={handleLevermann}>
								<img src={Levermann} alt="Levermann l image" />
								<span>Levermann</span>
							</Link>
						)}
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
								selected === "nasdaq"
									? "sidebar-index_selected"
									: "sidebar-anchor"
							}
							onClick={handleNasdaq}
						>
							Nasdaq 100
						</Link>
						<Link
							to="/sp500"
							className={
								selected === "sp" ? "sidebar-index_selected" : "sidebar-anchor"
							}
							onClick={handleSP}
						>
							S&P 500
						</Link>
					</div>
					{!earnings.onEarning ? (
						<div className="sidebar-portfolio">
							<div className="sidebar-wrapper_add">
								<Link className="sidebar-anchor" to="/portfolio">
									<img src={Heart} alt="Liked Portfolio Image" />
									<span>Portfolio</span>
								</Link>
								<button
									className="sidebar-wrapper_add-button"
									onClick={makePortfolioPayment}
								>
									+
								</button>
							</div>

							<table className="sidebar-portfolio-table">
								<thead>
									<tr>
										<th>STOCK</th>
										<th>SCORE</th>
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
							</table>
						</div>
					) : (
						<div>
							<div className="sidebar-range">
								<input
									type="range"
									id="volume"
									name="volume"
									min="1"
									max="10"
									defaultValue="1"
									onChange={handleRangeChange}
									onmousemove="rangevalue1.value=value"
								/>
								<output id="rangevalue1">{earnings.threshold}%</output>
							</div>
							<div className="sidebar-toggle">
								<label>{t("Positive")}</label>
								<label className="switch">
									<input
										onClick={handleToggleClick}
										type="checkbox"
										defaultChecked={
											earnings.isNegative === false ? true : false
										}
									/>
									<div>
										<span></span>
									</div>
								</label>
								<label>{t("Negative")}</label>
							</div>
						</div>
					)}
				</div>
				<div className="sidebar-links">
					<Link to="/policy">{t("Privacy Policy")}</Link>
					<Link to="/imprint">{t("Imprint")}</Link>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
	earnings: state.earnings,
});

export default connect(mapStateToProps, {
	setThreshold,
	countSignToggler,
	addPortfolioSize,
})(Sidebar);
