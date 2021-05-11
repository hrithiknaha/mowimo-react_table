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
import Filter from "./Filter";
import axios from "axios";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import Sidebar from "./Sidebar";

function Table() {
	//State of Table Component, state are basically the data that drives a component.
	const [selected, setSelected] = useState("all");
	const [rows, setRowsData] = useState([]);
	const [weeks, setWeeks] = useState([]);
	const [weekSelected, setWeekSelected] = useState("");
	const [scoreStyle, setScoreStyle] = useState("scores");

	// memoization of column and row data, as prescribed by react-table, memoiazation is important as it reduces unnecessary rendering of the component, the basic idea being the data will be store and will not be called everytime. What is Cache memory to computer useMemo is same for react
	const columns = useMemo(() => {
		if (scoreStyle === "scores") return COLUMNS;
		else return NUM_COLUMNS;
	}, [scoreStyle]);
	const data = useMemo(() => rows, [rows]);
	const defaultSort = useMemo(() => DEFAULT_SORT, []);

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
	}, [weekSelected, scoreStyle]);

	//The Functions for calling backend API, also after getting the result, the data is stored by the setRowsData and SetWeeks in the state, See so state is sort of the memory of the application, but it changes everytime you refresh the page, but as we are calling the backend api everytime the page refreshes, thanks to UseEffect fucntion above, nothing is lost
	async function fetchData() {
		console.log(
			`https://levermy.herokuapp.com/leverman?week=${weekSelected}&style=${scoreStyle}`
		);
		const result = await axios.get(
			`https://levermy.herokuapp.com/leverman?week=${weekSelected}&style=${scoreStyle}`
			// `https://mysql-test-2021.herokuapp.com/levermann_week/all/${weekSelected}`
		);
		setRowsData(result.data[1]);
		setWeeks(result.data[0].weeks_available);
	}

	async function callDowJones() {
		const result = await axios.get(
			`http://levermy.herokuapp.com/leverman?index=DowJones&week=${weekSelected}&style=${scoreStyle}`
		);
		setRowsData(result.data[1]);
		console.log(
			`http://levermy.herokuapp.com/leverman?index=DowJones&week=${weekSelected}&style=${scoreStyle}`
		);
	}

	async function callSP() {
		console.log(
			`https://levermy.herokuapp.com/leverman?index=SP500&week=${weekSelected}&style=${scoreStyle}`
		);
		const result = await axios.get(
			`https://levermy.herokuapp.com/leverman?index=SP500&week=${weekSelected}&style=${scoreStyle}`
		);
		setRowsData(result.data[1]);
	}

	async function callNasdaq() {
		console.log(
			`https://levermy.herokuapp.com/leverman?index=Nasdaq100&week=${weekSelected}&style=${scoreStyle}`
		);
		const result = await axios.get(
			`https://levermy.herokuapp.com/leverman?index=Nasdaq100&week=${weekSelected}&style=${scoreStyle}`
		);
		setRowsData(result.data[1]);
	}

	//These are called hanlders, they are run when ever a button is clicker or the dropdown is changed, they are called basically when there is a DOM Change
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

	const handleScoreChange = (e) => {
		setScoreStyle(e.target.value);
	};

	return (
		<div className="container">
			{/* Sidebar component is called here and the handle functions are passed as
			props */}
			<Sidebar
				handleAll={handleAll}
				handleDowJones={handleDowJones}
				handleSP={handleSP}
				handleNasdaq={handleNasdaq}
				selected={selected}
			/>
			<div className="table">
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
					<div className="score-selector">
						<label>{t("Score Selector")}</label>
						<select onChange={handleScoreChange}>
							<option value="scores">{t("Scores")}</option>
							<option value="numbers">{t("Number")}</option>
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
						{/* Add the number here [10,25,50], you can add any number and then it will be in the list of page size. */}
						{[10, 25, 50].map((pageSize) => {
							return (
								<option key={pageSize} value={pageSize}>
									{t("Show")} {pageSize}
								</option>
							);
						})}
					</select>
					<span>
						{/* All the {t()} functions are basically the translation functions, and
						depending on the browser language it will automatically detect it
						and switch between Englisha and German */}
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
