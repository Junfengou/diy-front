import React from "react";
import styled from "styled-components";
import { userRental } from "../../lib/RentalState";
import SickButton from "../styles/SickButton";

function StorageUnitz({ item }) {
	const { storageUnitType, unitType, id } = item;
	const { grabUnit, setLocalStorageItems, rental } = userRental();
	return (
		<StorageUnitStyles>
			<div className="tagHeader">
				<h3>{storageUnitType}</h3>
				<h4>${unitType.price / 100}</h4>
			</div>
			<div className="tagBody">
				<h4>{unitType.description}</h4>
			</div>
			<div className="tagFooter">
				{/* <h4>Unit #{unitType.unitNum}</h4> */}
				<h4>{unitType.availability}</h4>
				<button
					onClick={() =>
						grabUnit(id, unitType.price, storageUnitType, unitType.unitNum)
					}
				>
					Reserve
				</button>
			</div>
		</StorageUnitStyles>
	);
}

export default StorageUnitz;

export const StorageUnitStyles = styled.div`
	border: solid 2px var(--orange);
	display: grid;
	grid-template-rows: 5rem max-content 4rem;
	grid-template-columns: 1fr;
	background: var(--lightGrey);
	.tagHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 2rem;
	}

	.tagBody {
		margin: 0 2rem;
	}

	.tagFooter {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	button {
		background: var(--orange);
		color: black;
		font-weight: 500;
		border: 0;
		border-radius: 0;
		text-transform: uppercase;
		font-size: 1rem;
		padding: 0.8rem 1rem;
		/* transform: skew(-2deg); */
	}
`;
