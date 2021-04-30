import { render } from "@testing-library/react";
import React from "react";

function Sidebar({
	handleAll,
	handleDowJones,
	handleNasdaq,
	handleSP,
	selected,
}) {
	return (
		<div className="sidebar">
			<div className="sidebar-wrapper">
				<a
					className={selected === "all" ? "sidebar-selected" : ""}
					onClick={handleAll}
				>
					All
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
