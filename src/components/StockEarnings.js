import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { earnings_column, earnings_column_negative } from "../config/earnings";
import { connect } from "react-redux";
import { countSignToggler } from "../actions/earnings";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function StockEarnings(props) {
	const [earnings, setEarnings] = useState([]);

	const { index } = useParams();

	const columns = useMemo(() => {
		if (props.earnings.isNegative) return earnings_column;
		return earnings_column_negative;
	}, [earnings_column, props.earnings.isNegative]);
	const data = useMemo(() => earnings, [earnings]);

	useEffect(() => {
		axios
			.get(`http://levermy.herokuapp.com/earnings/${index}`)
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

	const handleToggleClick = (e) => {
		if (e.target.checked) props.countSignToggler(true);
		else props.countSignToggler(false);
	};

	const { t } = useTranslation();

	return (
		<>
			<div className="sign">
				<label>{t("Negative")}</label>
				<label className="switch">
					<input
						onClick={handleToggleClick}
						type="checkbox"
						defaultChecked={props.earnings.isNegative === false ? false : true}
					/>
					<div>
						<span></span>
					</div>
				</label>
				<label>{t("Positive")}</label>
			</div>
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
		</>
	);
}

const mapStateToProps = (state) => ({
	earnings: state.earnings,
});

export default connect(mapStateToProps, { countSignToggler })(StockEarnings);
