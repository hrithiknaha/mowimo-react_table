import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { earnings_column } from "../config/earnings";

function StockEarnings() {
	const [earnings, setEarnings] = useState([]);

	const columns = useMemo(() => earnings_column, []);
	const data = useMemo(() => earnings, []);

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
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render("Header")}
								<span>
									{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default StockEarnings;
