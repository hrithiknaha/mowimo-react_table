import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { earnings_column, earnings_column_negative } from "../config/earnings";
import { connect } from "react-redux";
import { countSignToggler, setEarningPage } from "../actions/earnings";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import useCookie from "../hooks/useCookie";

function StockEarnings(props) {
	const [cookie, updateCookie] = useCookie("color", "black");
	const [color, setColor] = useState();

	const hanldeColorChange = (e) => {
		setColor(e.target.value);
		props.handleColor(e.target.value);
	};
	const [earnings, setEarnings] = useState([]);
	const [top, setTop] = useState("");

	const { index } = useParams();

	const columns = useMemo(() => {
		console.log("Run");
		if (props.earnings.isNegative) return earnings_column;
		return earnings_column_negative;
	}, [props.earnings.isNegative, props.earnings.threshold]);
	const data = useMemo(() => earnings, [earnings]);

	useEffect(() => {
		props.setEarningPage(true);
		axios
			.get(`http://levermy.herokuapp.com/earnings/${index}`)
			.then(({ data }) => {
				setEarnings(data);
			});

		window.addEventListener(
			"scroll",
			() => {
				if (window.scrollY > 60) {
					setTop("top");
				} else setTop("");
			},
			true
		);

		return () => props.setEarningPage(false);
	}, [props.earnings.threshold]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy
	);

	const { globalFilter } = state;

	const { t } = useTranslation();

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
			<Navbar filter={globalFilter} setFilter={setGlobalFilter} />
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
		</>
	);
}

const mapStateToProps = (state) => ({
	earnings: state.earnings,
});

export default connect(mapStateToProps, { countSignToggler, setEarningPage })(
	StockEarnings
);
