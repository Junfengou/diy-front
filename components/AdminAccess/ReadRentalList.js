import React from "react";
import styled from "styled-components";
import RentalList from "../Queries/RentalListQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";

function ReadRentalList() {
	const RentalListArr = RentalList();
	console.log({ RentalListArr });
	return (
		<RentalListStyles>
			<h2>Rental list</h2>
			{RentalListArr?.map((item, i) => (
				<div className="container" key={i}>
					<h3>
						<span>Customer: </span>
						{item?.rentby?.name}
					</h3>
					<h3>
						<span>Employee: </span>
						{item?.employee?.title}
					</h3>
					<div className="unit">
						<h4>
							<span>Storage unit #</span>
						</h4>
						{item?.storageUnit?.map((unit) => (
							<p>{unit?.unitNum}</p>
						))}
					</div>

					<div className="unitType">
						<h4>
							<span>Unit type</span>
						</h4>
						{item?.storageType?.map((unitType) => (
							<p>{unitType?.storageUnitType}</p>
						))}
					</div>
					<h4>
						<span>{item?.rentby?.availability}</span>
					</h4>
				</div>
			))}
		</RentalListStyles>
	);
}

export default ReadRentalList;

const RentalListStyles = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3rem;

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5rem;
		padding: 3rem;
		transform: skew(-15deg);
		background: var(--offWhite);
	}

	.unit {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.unitType {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	span {
		color: var(--orange);
	}
`;
