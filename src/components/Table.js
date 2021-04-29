import React, { useMemo } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { useTranslation } from "react-i18next";
import { COLUMNS } from "../config/columns";
import { DEFAULT_SORT } from "../config/defaultSort";
import Filter from "./Filter";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

function Table(props) {
	// memoization of column and row data, as prescribed by react-table
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => props.ROWS, [props.ROWS]);
	const defaultSort = useMemo(() => DEFAULT_SORT, []);

	// All the props required for the react-table logic
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
			initialState: {
				sortBy: [defaultSort],
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	//Destructuring filter data, page index data and page size from react-table state.
	const { globalFilter, pageIndex, pageSize } = state;

	// i18n.changeLanguage("gr");

	console.log(props);

	const { t } = useTranslation();

	return (
		<div className="container table">
			{/* <h1>{t("paragraph")}</h1> */}
			{/* Filter component, passing filter data and setFilter data as props */}
			<Filter filter={globalFilter} setFilter={setGlobalFilter} />
			{/* All table props being spread out */}
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
			{/* //React Table Actions for Changing page size, going to a custom page
			number and pagination */}
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
