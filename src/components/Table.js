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
import {
	fetchData,
	setWeekSelected,
	setScoreStyle,
	makePayment,
	makePortfolioPayment,
	closeModal,
} from "../actions/table";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import useCookie from "../hooks/useCookie";
import Loader from "./Loader";

import placeholder from "../assets/placeholder.jpeg";
import placeholderSmall from "../assets/placeholder-smaller.jpeg";

function Table(props) {
	const [top, setTop] = useState("");

	// memoization of column and row data, as prescribed by react-table, memoiazation is important as it reduces unnecessary rendering of the component, the basic idea being the data will be store and will not be called everytime. What is Cache memory to computer useMemo is same for react
	const columns = useMemo(() => {
		if (props.table.scoreStyle === "scores") return COLUMNS;
		else return NUM_COLUMNS;
	}, [props.table.scoreStyle]);
	const data = useMemo(() => props.table.rows, [props.table.rows]);
	const defaultSort = useMemo(() => DEFAULT_SORT, []);

	const [cookie, updateCookie] = useCookie("color", "black");
	const [color, setColor] = useState();

	const [lockToggle, setLockToggle] = useState(false);

	const hanldeColorChange = (e) => {
		setColor(e.target.value);
		props.handleColor(e.target.value);
	};

	// All the props required for the react-table logic, boilerplate code from react table
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
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
	const { globalFilter } = state;

	//Getting the translation function for Internilations
	const { t } = useTranslation();

	//Use effect will be called once after the page renders, and then everytime the weekSelected data state is changed. Depending on which Index is selected the switch case logic will call the subsequent functions.
	useEffect(() => {
		props.fetchData();
		window.addEventListener(
			"scroll",
			() => {
				if (window.scrollY > 335) {
					setTop("top");
				} else setTop("");
			},
			true
		);
	}, [props.table.weekSelected, props.table.scoreStyle]);

	const handleWeekChange = (e) => {
		if (e.target.value === undefined) props.setWeekSelected("");
		else props.setWeekSelected(e.target.value);
	};

	const handleToggleClick = (e) => {
		if (e.target.checked) props.setScoreStyle("numbers");
		else props.setScoreStyle("scores");
	};

	const makePaymentButton = () => {
		props.makePayment(props.table.tickerForPayment);
	};

	const makePortolioPaymentButton = () => {
		console.log("Clicking");
		props.makePortfolioPayment();
	};

	const handleOutsideModal = (e) => {
		props.closeModal();
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

			{props.table.forPayment && (
				<div>
					<div class="modal">
						<div class="modal-content">
							<button className="modal-button-one" onClick={handleOutsideModal}>
								Close
							</button>
							<div className="modal-content-form">
								<p className="modal-p">
									{t("PaymentText")} {props.table.tickerForPayment}
								</p>
								<p className="modal-p">{t("Refresh")}</p>
								<p className="modal-p">{t("PayNow")}</p>
								<button onClick={makePaymentButton}>{t("Accept")}</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{props.table.portfolioPayment && (
				<div>
					<div class="modal">
						<div class="modal-content">
							<button className="modal-button-one" onClick={handleOutsideModal}>
								{t("Close")}
							</button>
							<div className="modal-content-form">
								<p className="modal-p">{t("PortfolioSize")}</p>
								<p className="modal-p">{t("Refresh")}</p>
								<p className="modal-p">{t("PayNow")}</p>
								<button onClick={makePortolioPaymentButton}>
									{t("Accept")}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="container">
				<Navbar
					filter={globalFilter}
					setFilter={setGlobalFilter}
					index={"all"}
				/>
				<div className="table-header_content">
					<img src={placeholderSmall} alt="table header image" />
					<div className="table-header_content-text">
						<p>INDEX</p>
						<h1 className="no-margin">{t("TOP100")}</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Accusantium, maxime.
						</p>
						<p className="no-margin">
							{props.table.rows.length} {t("STOCKS")}
						</p>
					</div>
				</div>
				<div className="table">
					{/* Filter component, passing filter data and setFilter data as props */}
					<div className="table-header">
						<div className="week-selector">
							<label>{t("Calender")}</label>
							<select onChange={handleWeekChange}>
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
								<tr className={top} {...headerGroup.getHeaderGroupProps()}>
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
						{props.table.isLoading ? (
							<tbody>
								<Loader />
							</tbody>
						) : (
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
						)}
					</table>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps, {
	fetchData,
	setWeekSelected,
	setScoreStyle,
	makePayment,
	makePortfolioPayment,
	closeModal,
})(Table);
