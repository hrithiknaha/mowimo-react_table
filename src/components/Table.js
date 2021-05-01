import React, { useState, useMemo, useEffect } from "react";
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
import axios from "axios";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import Sidebar from "./Sidebar";

function Table({ ROWS }) {
	const [selected, setSelected] = useState("all");
	const [rows, setRowsData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [weeks, setWeeks] = useState([]);
	const [weekSelected, setWeekSelected] = useState("");
	// memoization of column and row data, as prescribed by react-table
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => rows, [rows]);
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

	const { t } = useTranslation();

	//Calling the api once the page renders, and to avoid showing error, loading boolean has been used, So while the data is being fetched page will be loading
	useEffect(() => {
		switch (selected) {
			case "all":
				fetchData();
				break;
			case "dowjones":
				callDowJones();
				break;
			case "sp":
				callSP();
				break;
			case "nasdaq":
				callNasdaq();
				break;
			default:
				fetchData();
		}
	}, [weekSelected]);

	async function fetchData() {
		console.log(
			`https://mysql-test-2021.herokuapp.com/levermann_week/all/${weekSelected}`
		);
		const result = await axios.get(
			`https://mysql-test-2021.herokuapp.com/levermann_week/all/${weekSelected}`
		);
		setRowsData(result.data[1]);
		setWeeks(result.data[0].weeks_available);
	}

	async function callDowJones() {
		const result = await axios.get(
			`https://mysql-test-2021.herokuapp.com/levermann/DowJones/${weekSelected}`
		);
		setRowsData(result.data);
		console.log(
			`https://mysql-test-2021.herokuapp.com/levermann/DowJones/${weekSelected}`
		);
	}

	async function callSP() {
		console.log(
			`https://mysql-test-2021.herokuapp.com/levermann/SP500/${weekSelected}`
		);
		const result = await axios.get(
			`https://mysql-test-2021.herokuapp.com/levermann/SP500/${weekSelected}`
		);
		setRowsData(result.data);
	}

	async function callNasdaq() {
		console.log(
			`https://mysql-test-2021.herokuapp.com/levermann/Nasdaq100/${weekSelected}`
		);
		const result = await axios.get(
			`https://mysql-test-2021.herokuapp.com/levermann/Nasdaq100/${weekSelected}`
		);
		setRowsData(result.data);
	}

	const handleAll = () => {
		setSelected("all");
		fetchData();
	};

	const handleDowJones = () => {
		setSelected("dowjones");
		callDowJones();
	};

	const handleSP = () => {
		setSelected("sp");
		callSP();
	};

	const handleNasdaq = () => {
		setSelected("nasdaq");
		callNasdaq();
	};

	const handleWeekChange = (e) => {
		if (e.target.value === undefined) setWeekSelected("");
		else setWeekSelected(e.target.value);
	};

	return (
		<div className="container">
			<Sidebar
				handleAll={handleAll}
				handleDowJones={handleDowJones}
				handleSP={handleSP}
				handleNasdaq={handleNasdaq}
				selected={selected}
			/>
			<div className="table">
				{/* <h1>{t("paragraph")}</h1> */}
				{/* Filter component, passing filter data and setFilter data as props */}
				<div className="table-header">
					<Filter filter={globalFilter} setFilter={setGlobalFilter} />
					<div className="week-selector">
						<label>{t("Calender Week")}</label>
						<select onChange={handleWeekChange}>
							<option value="">Default</option>
							{weeks.map((week) => {
								return (
									<option key={week} value={week}>
										{t("Week")} {week}
									</option>
								);
							})}
						</select>
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
									{t("Show")} {pageSize}
								</option>
							);
						})}
					</select>
					<span>
						{t("Page")}{" "}
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
				</div>
			</div>
		</div>
	);
}

export default Table;
