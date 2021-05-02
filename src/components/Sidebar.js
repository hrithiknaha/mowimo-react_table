import React from "react";
import { useTranslation } from "react-i18next";

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
			<div className="sidebar-wrapper">
				<a
					className={selected === "all" ? "sidebar-selected" : ""}
					// The function are called everytime the anchor tag is clicked, similar for all the below anchor tags
					onClick={handleAll}
				>
					{t("All")}
				</a>
				<a
					className={selected === "dowjones" ? "sidebar-selected" : ""}
					onClick={handleDowJones}
				>
					Dow Jones
				</a>
				<a
					className={selected === "nasdaq" ? "sidebar-selected" : ""}
					onClick={handleNasdaq}
				>
					Nasdaq
				</a>
				<a
					className={selected === "sp" ? "sidebar-selected" : ""}
					onClick={handleSP}
				>
					S&P500
				</a>
			</div>
		</div>
	);
}

export default Sidebar;
