import React from "react";
import Rentals from "../Queries/RentalQuery";
import styled from "styled-components";
import Employees from "../Queries/EmployeeQuery";
import StorageUnitsTypes from "../Queries/StorageUnitTypeQuery";
import StorageUnits from "../Queries/StorageQuery";
import { userRental } from "../../lib/RentalState";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import SickButton from "../styles/SickButton";
import UsernameStyles from "../styles/UsernameStyles";

const UPDATE_STORAGE_STATUS_MUTATION = gql`
	mutation UPDATE_STORAGE_STATUS_MUTATION(
		$storageMutation: [StorageUnitsUpdateInput]
	) {
		updateStorageUnits(data: $storageMutation) {
			price
		}
	}
`;

const CREATE_RENTAL_LIST_MUTATION = gql`
	mutation CREATE_RENTAL_LIST_MUTATION(
		$rentalID: ID!
		$employeeID: ID!
		$storageID: [StorageUnitWhereUniqueInput]
		$storageUnitTypeID: [StorageUnitTypeWhereUniqueInput]
	) {
		createRentalList(
			data: {
				rentby: { connect: { id: $rentalID } }
				employee: { connect: { id: $employeeID } }
				storageUnit: { connect: $storageID }
				storageType: { connect: $storageUnitTypeID }
			}
		) {
			rentby {
				name
			}
		}
	}
`;

const CREATE_RENTAL_MUTATION = gql`
	mutation CREATE_RENTAL_MUTATION($rentalID: ID!, $rentalMutation: String) {
		updateRental(id: $rentalID, data: { availability: $rentalMutation }) {
			paymentAmount
		}
	}
`;

function RentalListAccess() {
	const RentalArr = Rentals();
	const EmployeeArr = Employees();
	const StorageUnitArr = StorageUnits();
	const StorageUnitTypesArr = StorageUnitsTypes();
	const {
		rentalID,
		employeeID,
		storageID,
		storageUnitTypeID,
		storageMutation,
		grabRentalID,
		grabEmployeeID,
		grabStorageUnitID,
		grabStorageUnitTypeID,
		displayRental,
		displayEmployee,
		displayStorage,
		displayUnitTypes,
		deleteRentalID,
		deleteEmployeeID,
		deleteStorageUnitType,
		deleteStorageUnit,
		rentalMutation,
	} = userRental();
	// console.log(
	// 	{ rentalID },
	// 	{ employeeID },
	// 	{ storageID },
	// 	{ storageUnitTypeID },
	// 	{ storageMutation }
	// );
	const [updateStorageUnits] = useMutation(UPDATE_STORAGE_STATUS_MUTATION, {
		variables: { storageMutation },
	});

	const [createRentalList, { loading }] = useMutation(
		CREATE_RENTAL_LIST_MUTATION,
		{
			variables: { rentalID, employeeID, storageID, storageUnitTypeID },
		}
	);

	const [updateRental] = useMutation(CREATE_RENTAL_MUTATION, {
		variables: { rentalID, rentalMutation },
	});

	async function createRentaListItems() {
		await updateStorageUnits();
		await createRentalList();
		await updateRental();
		setTimeout(() => {
			window.location.reload();
		}, 500);
	}
	return (
		<AccessStyles>
			<div className="InfoList">
				{/* Renal display */}
				<CardInfoStyles>
					<h3>Rental requests</h3>
					{RentalArr?.map((person, i) => {
						if (person.availability === "IN PROGRESS") {
							return (
								<div className="Container" key={i}>
									<p>{person.name}</p>
									{person.rental.map((item, i) => (
										<p>{item.storageUnitType}</p>
									))}
									<p>{person.availability}</p>
									<SickButton
										onClick={() => grabRentalID(person.id, person.name)}
									>
										add
									</SickButton>
								</div>
							);
						}
					})}
				</CardInfoStyles>

				{/* Employee display */}
				<CardInfoStyles>
					<h3>Employees</h3>
					{EmployeeArr?.map((employee, i) => (
						<div className="Container" key={i}>
							<p>{employee.title}</p>
							<SickButton
								onClick={() => grabEmployeeID(employee.id, employee.title)}
							>
								add
							</SickButton>
						</div>
					))}
				</CardInfoStyles>

				{/* Storage units display */}
				<CardInfoStyles>
					<h3>Storage units</h3>
					{StorageUnitArr?.map((unit, i) => (
						<div className="Container" key={i}>
							<p>
								#{unit.unitNum} - {unit.availability}
							</p>
							<SickButton
								onClick={() =>
									grabStorageUnitID(
										unit.id,
										unit.price,
										unit.description,
										unit.availability,
										unit.unitNum,
										unit.unit.storageUnitType
									)
								}
							>
								add
							</SickButton>
						</div>
					))}
				</CardInfoStyles>

				{/* Storage units types display */}
				<CardInfoStyles>
					<h3>Storage unit type</h3>
					{StorageUnitTypesArr?.map((unitType, i) => (
						<div className="Container" key={i}>
							<p>{unitType.storageUnitType}</p>
							<p>{unitType.unitType?.availability}</p>
							<SickButton
								onClick={() =>
									grabStorageUnitTypeID(unitType.id, unitType.storageUnitType)
								}
							>
								add
							</SickButton>
						</div>
					))}
				</CardInfoStyles>
			</div>
			<div className="DataDisplay">
				<div className="wrapper">
					<h3>Username</h3>
					<div className="content">
						{displayRental && (
							<SickButton onClick={() => deleteRentalID()}>
								{displayRental}
							</SickButton>
						)}
					</div>
				</div>
				<div className="wrapper">
					<h3>Employee</h3>
					<div className="content">
						{displayEmployee && (
							<SickButton onClick={() => deleteEmployeeID()}>
								{displayEmployee}
							</SickButton>
						)}
					</div>
				</div>
				<div className="wrapper">
					<h3>Storage units</h3>
					<div className="content">
						{displayStorage.map((item) => (
							<SickButton onClick={() => deleteStorageUnit(item.id)}>
								{item.unitType}
							</SickButton>
						))}
					</div>
				</div>
				<div className="wrapper">
					<h3>Storage types</h3>
					<div className="content">
						{displayUnitTypes.map((item) => (
							<SickButton onClick={() => deleteStorageUnitType(item.id)}>
								{item.unitType}
							</SickButton>
						))}
					</div>
				</div>
				<SickButton disabled={loading} onClick={createRentaListItems}>
					Create rental list
				</SickButton>
			</div>
		</AccessStyles>
	);
}

export default RentalListAccess;

export const AccessStyles = styled.div`
	min-height: 100vh;
	display: grid;
	gap: 2rem;
	grid-template-rows: repeat(auto, 1fr);
	justify-items: center;
	align-items: center;
	margin: 5rem;

	.InfoList {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		/* @media (max-width: 1150px) {
			flex-direction: column;
			width: 85%;
		} */
	}

	.DataDisplay {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5rem;

		.wrapper {
			display: grid;
			grid-template-rows: auto;
		}

		.content {
			display: flex;
			gap: 2rem;
		}
	}
`;

export const CardInfoStyles = styled.div`
	/* height: 10rem; */
	/* width: 8rem; */
	/* background-color: var(--grey); */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 2rem;
	margin: 2rem;
	padding: 2rem;

	.Container {
		display: flex;
		justify-content: space-between;
		/* padding: 0 2rem; */
		padding-left: 2rem;
		background: var(--offWhite);
		transform: skew(-15deg);
		gap: 2rem;
		/* border: solid red; */
		width: 100%;
	}

	span {
		color: var(--orange);
	}
`;

/*
	1. Find the correct rental by it's ID
	2. map through the unitTypes within the RentalArr and throw each item in the component that handles storage mutation
	3. write a mutation to modify the storage to "RESERVED" status
	4. 
*/
