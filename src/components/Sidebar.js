import React from "react";

function Sidebar({ handleAll, handleDowJones, handleNasdaq, handleSP }) {
	return (
		<div className="sidebar">
			<div className="sidebar-wrapper">
				<a className="sidebar-selected" onClick={handleAll}>
					All
				</a>
				<a onClick={handleDowJones}>Dow Jones</a>
				<a onClick={handleNasdaq}>Nasdaq</a>
				<a onClick={handleSP}>S&P500</a>
			</div>
		</div>
	);
}

export default Sidebar;
