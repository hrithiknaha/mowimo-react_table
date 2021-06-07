import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { earnings_column } from "../config/earnings";

function StockEarnings() {
	const [earnings, setEarnings] = useState([]);

	const columns = useMemo(() => earnings_column, [earnings_column]);
	const data = useMemo(() => earnings, [earnings]);

	useEffect(() => {
		axios
			.get("http://levermy.herokuapp.com/earnings/DowJones")
			.then(({ data }) => {
				setEarnings(data);
			});
	}, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		);

	return (
		<table {...getTableProps()}>
			{/* Maping any header groups first (Grouped Header). then mapping each
				column inside of grouped header to get each individual columnsa and its
				index. Printing the Header and the tooltip */}
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, index) => (
							<th
								className="tooltip"
								{...column.getHeaderProps(column.getSortByToggleProps())}
							>
								{column.render("Header")}{" "}
								{headerGroup.headers[index].tipText && (
									<span>{headerGroup.headers[index].tipText}</span>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			{/* Mapping page index with default size of 10, and then mapping each row
				inside of each age to get all the rows. */}
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td className="row" {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default StockEarnings;
