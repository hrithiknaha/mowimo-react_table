import React, { useMemo } from "react";

import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { COLUMNS } from "../config/columns";
import "./BasicTable.css";
import GlobalFilter from "./GlobalFilter";

function BasicTable({ ROWS, onRowClick }) {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => ROWS, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	onRowClick = (state, rowInfo, column, instance) => {
		return {
			onClick: (e) => {
				console.log("A Td Element was clicked!");
				console.log("it produced this event:", e);
				console.log("It was in this column:", column);
				console.log("It was in this row:", rowInfo);
				console.log("It was in this table instance:", instance);
			},
		};
	};

	return (
		<>
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}{" "}
									<span>
										{column.isSorted ? (column.isSortedDesc ? "⬇️" : "⬆️") : ""}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div>
				<select
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[10, 25, 50].map((pageSize) => {
						return (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						);
					})}
				</select>
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}{" "}
					</strong>
				</span>
				<span>
					| Go to page{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageNumber = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(pageNumber);
						}}
						style={{ width: "50px" }}
					/>
				</span>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous
				</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					Next
				</button>
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>
			</div>
		</>
	);
}

export default BasicTable;
