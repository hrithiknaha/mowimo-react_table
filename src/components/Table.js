import React, { useMemo } from "react";

import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { COLUMNS } from "../config/columns";
import GlobalFilter from "./GlobalFilter";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

function Table({ ROWS }) {
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

	return (
		<div className="container table">
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, index) => (
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
			<div className="table-actions">
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
					Go to page{" "}
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
				<button
					className="button-primary"
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					<BsChevronDoubleLeft />
				</button>
				<button
					className="button-primary"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					<GrFormPreviousLink />
				</button>
				<button
					className="button-primary"
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					<GrFormNextLink />
				</button>
				<button
					className="button-primary"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					<BsChevronDoubleRight />
				</button>
			</div>
		</div>
	);
}

export default Table;
