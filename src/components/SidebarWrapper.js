import React from "react";
import {
	fetchData,
	callDowJones,
	callNasdaq,
	callSP,
	setWeekSelected,
	setScoreStyle,
	callLevermann,
	callStart,
	callLike,
} from "../actions/table";
import Sidebar from "./Sidebar";

import { connect } from "react-redux";

function SidebarWrapper(props) {
	//These are called hanlders, they are run when ever a button is clicker or the dropdown is changed, they are called basically when there is a DOM Change
	const handleAll = () => {
		props.fetchData();
	};

	const handleDowJones = () => {
		props.callDowJones();
	};

	const handleSP = () => {
		props.callSP();
	};

	const handleNasdaq = () => {
		props.callNasdaq();
	};

	const handleLevermann = () => {
		props.callLevermann();
	};

	const handleStart = () => {
		props.callStart();
	};

	const handleLike = () => {
		props.callLike();
	};

	return (
		<div>
			{/* Sidebar component is called here and the handle functions are passed as
			props */}
			<Sidebar
				handleAll={handleAll}
				handleDowJones={handleDowJones}
				handleSP={handleSP}
				handleNasdaq={handleNasdaq}
				selected={props.table.selected}
				handleLevermann={handleLevermann}
				handleStart={handleStart}
				handleLike={handleLike}
				type={props.table.type}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps, {
	fetchData,
	callDowJones,
	callNasdaq,
	callSP,
	setWeekSelected,
	setScoreStyle,
	callLevermann,
	callStart,
	callLike,
})(SidebarWrapper);
