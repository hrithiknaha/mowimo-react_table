import React from "react";

function GlobalFilter({ filter, setFilter }) {
	return (
		<div class="filter">
			<input
				className="filter-input"
				type="text"
				name="input-text"
				id="input-text"
				required
				spellcheck="false"
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				placeholder="Filter"
			/>
		</div>
	);
}

export default GlobalFilter;
