import React from "react";
import StorageUnits from "../Queries/StorageQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";

function ReadStorageUnits() {
	const StorageUnitArr = StorageUnits();
	console.log({ StorageUnitArr });
	return (
		<AccessStyles>
			<div className="InfoList">
				<CardInfoStyles>
					<h3>Storage units</h3>
					{StorageUnitArr?.map((unit, i) => (
						<div className="Container" key={i}>
							<p>
								<span>#{unit.unitNum}</span> - {unit.availability} -{" "}
								<span>${unit.price / 100}</span> - {unit.description}
							</p>
							<p />
						</div>
					))}
				</CardInfoStyles>
			</div>
		</AccessStyles>
	);
}

export default ReadStorageUnits;
