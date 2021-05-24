import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";

//The hnadlers are received here and are destructured as a norm of writing clean code.
function Sidebar({
	handleAll,
	handleDowJones,
	handleNasdaq,
	handleSP,
	selected,
}) {
	const { t } = useTranslation();
	return (
		<div className="sidebar">
			<div className="sidebar-logo">
				<Link to="/">
					<AiOutlineStock />
				</Link>
			</div>
			<div className="sidebar-wrapper">
				<Link
					to="/"
					className={selected === "all" ? "sidebar-selected" : ""}
					// The function are called everytime the anchor tag is clicked, similar for all the below anchor tags
					onClick={handleAll}
				>
					{t("All")}
				</Link>
				<Link
					to="/dowjones"
					className={selected === "dowjones" ? "sidebar-selected" : ""}
					onClick={handleDowJones}
				>
					Dow Jones
				</Link>
				<Link
					to="/nasdaq"
					className={selected === "nasdaq" ? "sidebar-selected" : ""}
					onClick={handleNasdaq}
				>
					Nasdaq
				</Link>
				<Link
					to="/sp500"
					className={selected === "sp" ? "sidebar-selected" : ""}
					onClick={handleSP}
				>
					S&P500
				</Link>
			</div>
			<div className="sidebar-portfolio">
				<span className="sidebar-portfolio-title">Portfolio</span>
				<table className="sidebar-portfolio-table">
					<tr>
						<th>Stock</th>
						<th>Score</th>
					</tr>
					<tr>
						<td>Jill</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Eve</td>
						<td>94</td>
					</tr>
					<tr>
						<td>Jill</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Eve</td>
						<td>94</td>
					</tr>
					<tr>
						<td>Jill</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Eve</td>
						<td>94</td>
					</tr>
				</table>
			</div>
			<div className="sidebar-links">
				<Link to="/policy">{t("Privacy Policy")}</Link>
				<Link to="/imprint">{t("Imprint")}</Link>
			</div>
		</div>
	);
}

export default Sidebar;
