import React from "react";
import { IoSearchOutline } from "react-icons/io5";

//Just setting the filter as value and setFilter passed from parent as prop to onchange
function Filter({ filter, setFilter }) {
	return (
		<div className="filter">
			<IoSearchOutline size={2} className="font" />
			<input
				className="filter-input"
				type="text"
				name="input-text"
				id="input-text"
				required
				spellCheck="false"
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				placeholder="Search"
			/>
		</div>
	);
}

export default Filter;
