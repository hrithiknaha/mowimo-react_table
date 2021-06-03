import React, { useState, useMemo, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { useTranslation } from "react-i18next";
import { COLUMNS } from "../config/columns";
import { NUM_COLUMNS } from "../config/numbers-column";
import { DEFAULT_SORT } from "../config/defaultSort";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { callNasdaq, setWeekSelected, setScoreStyle } from "../actions/table";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

import useCookie from "../hooks/useCookie";

function Nasdaq(props) {
	// memoization of column and row data, as prescribed by react-table, memoiazation is important as it reduces unnecessary rendering of the component, the basic idea being the data will be store and will not be called everytime. What is Cache memory to computer useMemo is same for react
	const columns = useMemo(() => {
		if (props.table.scoreStyle === "scores") return COLUMNS;
		else return NUM_COLUMNS;
	}, [props.table.scoreStyle]);
	const data = useMemo(() => props.table.rows, [props.table.rows]);
	const defaultSort = useMemo(() => DEFAULT_SORT, []);

	const [cookie, updateCookie] = useCookie("color", "black");
	const [color, setColor] = useState();

	const hanldeColorChange = (e) => {
		setColor(e.target.value);
		props.handleColor(e.target.value);
	};

	// All the props required for the react-table logic, boilerplate code from react table
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
		rows,
	} = useTable(
		{
			columns,
			data,

			// Setting default state of sort from the object declared in /config/defaultSort
			initialState: {
				sortBy: [defaultSort],
			},
		},

		// Using Filter, Sort and Pagination logic, for them to work we need to add these three in here, they are initialized here.
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	//Destructuring filter data, page index data and page size from react-table state.
	const { globalFilter, pageIndex, pageSize } = state;

	//Getting the translation function for Internilations
	const { t } = useTranslation();

	//Use effect will be called once after the page renders, and then everytime the weekSelected data state is changed. Depending on which Index is selected the switch case logic will call the subsequent functions.
	useEffect(() => {
		props.callNasdaq();
	}, [props.table.weekSelected, props.table.scoreStyle]);

	const handleWeekChange = (e) => {
		if (e.target.value === undefined) props.setWeekSelected("");
		else props.setWeekSelected(e.target.value);
	};

	const handleToggleClick = (e) => {
		if (e.target.checked) props.setScoreStyle("numbers");
		else props.setScoreStyle("scores");
	};

	return (
		<>
			{!document.cookie && (
				<div>
					<div class="modal">
						<div class="modal-content">
							<p>{t("cookie")}</p>
							<div className="modal-content-form">
								<input
									type="color"
									onChange={hanldeColorChange}
									value="#151515"
								/>
								<button
									onClick={() => {
										updateCookie(color, 100);
									}}
								>
									{t("Accept")}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="container">
				<Navbar filter={globalFilter} setFilter={setGlobalFilter} />
				<div className="table">
					{/* Filter component, passing filter data and setFilter data as props */}
					<div className="table-header">
						<div className="week-selector">
							<label>{t("Calender")}</label>
							<select onChange={handleWeekChange}>
								<option value="">Default</option>
								{props.table.weeks.map((week) => {
									return (
										<option key={week} value={week}>
											{week}
										</option>
									);
								})}
							</select>
						</div>
						<div className="score-selector ">
							<div className="togglers">
								<label>{t("Scores")}</label>
								<label className="switch">
									<input
										onClick={handleToggleClick}
										type="checkbox"
										defaultChecked={
											props.table.scoreStyle === "scores" ? false : true
										}
									/>
									<div>
										<span></span>
									</div>
								</label>
								<label>{t("Number")}</label>
							</div>
						</div>
					</div>

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
							{rows.map((row) => {
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
					{/* <div className="table-actions">
						<select
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
						> */}
					{/* Add the number here [10,25,50], you can add any number and then it will be in the list of page size. */}
					{/* {[10, 25, 50].map((pageSize) => {
								return (
									<option key={pageSize} value={pageSize}>
										{t("Show")} {pageSize}
									</option>
								);
							})}
						</select>
						<span> */}
					{/* All the {t()} functions are basically the translation functions, and
						depending on the browser language it will automatically detect it
						and switch between Englisha and German */}
					{/* {t("Page")}{" "}
							<strong>
								{pageIndex + 1} {t("of")} {pageOptions.length}{" "}
							</strong>
						</span>
						<span>
							{t("Go to Page")}{" "}
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
					</div> */}
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps, {
	callNasdaq,
	setWeekSelected,
	setScoreStyle,
})(Nasdaq);
