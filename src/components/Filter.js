import React from "react";

//Just setting the filter as value and setFilter passed from parent as prop to onchange
function Filter({ filter, setFilter }) {
	return (
		<div className="filter">
			<input
				className="filter-input"
				type="text"
				name="input-text"
				id="input-text"
				required
				spellCheck="false"
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				placeholder="Filter"
			/>
		</div>
	);
}

export default Filter;
