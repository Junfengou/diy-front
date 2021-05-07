import React from "react";
import { useState, useContext, createContext } from "react";

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

function userRental() {
	const all = useContext(LocalStateContext);
	return all;
}

function RentalStateProvider({ children }) {
	const [rental, setRental] = useState([]);
	const [rentalPrice, setRentalPrice] = useState([]);
	const [unit, setUnit] = useState([]);
	const [cartOpen, setCartOpen] = useState(false);
	const [click, setClick] = useState(false);

	//--------------------------------------
	// Admin access Employee states
	const [userID, setUserID] = useState("");
	const [displayUserName, setDisplayUserName] = useState("");

	//--------------------------------------
	// Admin access Renal List states
	const [rentalID, setRentalID] = useState("");
	const [rentalMutation, setRentalMutation] = useState("");
	const [employeeID, setEmployeeID] = useState("");
	const [storageID, setStorageID] = useState([]);
	const [storageMutation, setStorageMutation] = useState([]);
	const [storageUnitTypeID, setStorageUnitTypeID] = useState([]);

	// ------------
	// display for Rental List states
	const [displayRental, setDisplayRental] = useState("");
	const [displayEmployee, setDisplayEmployee] = useState("");
	const [displayStorage, setDisplayStorage] = useState([]);
	const [displayUnitTypes, setDisplayUnitTypes] = useState([]);

	// ------------
	// functionalities for Rental List actions

	function grabRentalID(id, name) {
		setRentalID(id);
		setDisplayRental(name);
		setRentalMutation("APPROVED");
	}
	function deleteRentalID() {
		setRentalID("");
		setDisplayRental("");
	}

	function grabEmployeeID(id, title) {
		setEmployeeID(id);
		setDisplayEmployee(title);
	}

	function deleteEmployeeID() {
		setEmployeeID("");
		setDisplayEmployee("");
	}

	function grabStorageUnitTypeID(id, unitType) {
		setStorageUnitTypeID([
			...[...storageUnitTypeID, { id }]
				.reduce((map, obj) => map.set(obj.id, obj), new Map())
				.values(),
		]);
		setDisplayUnitTypes([
			...[...displayUnitTypes, { unitType, id }]
				.reduce((map, obj) => map.set(obj.unitType, obj), new Map())
				.values(),
		]);
	}

	function deleteStorageUnitType(id) {
		filterItem(setStorageUnitTypeID, storageUnitTypeID, id);
		filterItem(setDisplayUnitTypes, displayUnitTypes, id);
	}

	function grabStorageUnitID(
		id,
		price,
		description,
		availability,
		unitNum,
		unitType
	) {
		// This one is for Rental list mutation
		setStorageID([
			...[...storageID, { id }]
				.reduce((map, obj) => map.set(obj.id, obj), new Map())
				.values(),
		]);

		// This one is for storage mutation
		setStorageMutation([
			...[
				...storageMutation,
				{ id, data: { price, description, availability: "RESERVED", unitNum } },
			]
				.reduce((map, obj) => map.set(obj.id, obj), new Map())
				.values(),
		]);
		setDisplayStorage([
			...[...displayStorage, { unitType, id }]
				.reduce((map, obj) => map.set(obj.unitType, obj), new Map())
				.values(),
		]);
	}

	function deleteStorageUnit(id) {
		filterItem(setStorageID, storageID, id);
		filterItem(setStorageMutation, storageMutation, id);
		filterItem(setDisplayStorage, displayStorage, id);
	}

	// ------------
	// functionalities for creating a new employee access
	function grabUserID(id, name) {
		setUserID(id);
		setDisplayUserName(name);
	}

	// ------------
	// functionalities for cart menu access

	function openMobileMenu() {
		setClick(!click);
	}

	function closeMobileMenu() {
		setClick(false);
	}

	// This function makes sure that there is no duplicates, verify by id
	function grabUnit(id, price, unitType, unitNum) {
		setRental([
			...[...rental, { id }]
				.reduce((map, obj) => map.set(obj.id, obj), new Map())
				.values(),
		]);
		// setRentalPrice([...rentalPrice, price]);
		setRentalPrice([
			...[...rentalPrice, { id, price }]
				.reduce((map, obj) => map.set(obj.id, obj), new Map())
				.values(),
		]);
		setUnit([
			...[...unit, { id, unitType, unitNum, price }]
				.reduce((map, obj) => map.set(obj.unitNum, obj), new Map())
				.values(),
		]);
		// setLocalStorageItems(id);
	}

	function deleteUnit(id) {
		filterItem(setRental, rental, id);
		filterItem(setRentalPrice, rentalPrice, id);
		filterItem(setUnit, unit, id);
	}

	// Look into this in the future. The array of item are successfully stored in the LocalStorage
	// Problem: The array will reset after refresh, causing the cart to lose all the data.
	// Potential solution: I can create a DB to store all current items...maybe I'll do that
	function setLocalStorageItems(id) {
		var storages = JSON.parse(localStorage.getItem("storages") || "[]");
		storages.push({ id });
		localStorage.setItem("storages", JSON.stringify(storages));
	}

	function filterItem(setLoopyLoop, loopyArr, id) {
		setLoopyLoop(
			loopyArr.filter((item) => {
				return item.id != id;
			})
		);
	}

	function toggleCart() {
		setCartOpen(!cartOpen);
	}

	function closeCart() {
		setCartOpen(false);
	}

	function emptyCart() {
		setRental([]);
	}

	return (
		<LocalStateProvider
			value={{
				rental,
				grabUnit,
				rentalPrice,
				unit,
				emptyCart,
				toggleCart,
				closeCart,
				cartOpen,
				deleteUnit,
				click,
				openMobileMenu,
				closeMobileMenu,
				setLocalStorageItems,
				rentalID,
				grabRentalID,
				employeeID,
				grabEmployeeID,
				storageID,
				storageMutation,
				grabStorageUnitID,
				storageUnitTypeID,
				grabStorageUnitTypeID,
				displayRental,
				displayEmployee,
				displayStorage,
				displayUnitTypes,
				deleteRentalID,
				deleteEmployeeID,
				deleteStorageUnitType,
				deleteStorageUnit,
				displayUserName,
				grabUserID,
				rentalMutation,
			}}
		>
			{children}
		</LocalStateProvider>
	);
}

export { RentalStateProvider, userRental };

/*
grabStorageUnitID(
										unit.id,
										unit.price,
										unit.description,
										unit.availability,
										unit.unitNum
									)
*/
