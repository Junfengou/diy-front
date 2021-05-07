import React from "react";
import StorageUnitsTypes from "../Queries/StorageUnitTypeQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";

function ReadStorageType() {
	const StorageUnitTypeArr = StorageUnitsTypes();

	return (
		<AccessStyles>
			<div className="InfoList">
				<CardInfoStyles>
					<h3>Storage units types</h3>

					{StorageUnitTypeArr?.map((unit, i) => (
						<div className="Container" key={i}>
							<p>
								<span>{unit.storageUnitType}</span> -{" "}
								{unit.unitType.availability}
							</p>
							<p />
						</div>
					))}
				</CardInfoStyles>
			</div>
		</AccessStyles>
	);
}

export default ReadStorageType;
