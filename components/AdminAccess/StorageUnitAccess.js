import React, { useState } from "react";
import StorageUnits from "../Queries/StorageQuery";
import styled from "styled-components";
import StorageUnitsTypes from "../Queries/StorageUnitTypeQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";
import SickButton from "../styles/SickButton";
import CreateStorageUnit from "./StorageUnitRelated/CreateStorageUnit";
import CreateStorageUnitTypes from "./StorageUnitRelated/CreateStorageUnitTypes";
import { StorageUnitStyles } from "../Storages/StorageUnitz";
import { CopyToClipboard } from "react-copy-to-clipboard";

function StorageUnitAccess() {
	const StorageUnitArr = StorageUnits();
	const StorageUnitsTypesArr = StorageUnitsTypes();
	const [storageInfo, setStorageInfo] = useState("");
	const [storageInfoType, setStorageInfoType] = useState("");
	const [isCopied, setIsCopied] = useState(false);

	const onCopyText = () => {
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	return (
		<AccessStyles>
			<div className="InfoList">
				<CardInfoStyles>
					<h3>Storage units</h3>
					{StorageUnitArr?.map((unit, i) => (
						<div className="Container" key={i}>
							<p>
								#{unit.unitNum} - {unit.availability}
							</p>
							<SickButton onClick={() => setStorageInfo(unit)}>
								details
							</SickButton>
						</div>
					))}
				</CardInfoStyles>

				<CardInfoStyles>
					<h3>Storage unit type</h3>
					{StorageUnitsTypesArr?.map((unitType, i) => (
						<div className="Container" key={i}>
							<p>{unitType.storageUnitType}</p>
							<p>{unitType.unitType?.availability}</p>
							<SickButton onClick={() => setStorageInfoType(unitType)}>
								details
							</SickButton>
						</div>
					))}
				</CardInfoStyles>
			</div>

			<InfoContainer>
				{storageInfo ? (
					<StorageUnitStyles>
						<div className="tagHeader">
							<h4>Stoage unit info</h4>
							<h4>#{storageInfo.unitNum}</h4>
						</div>
						<div className="tagBody">
							<h4>ID: {storageInfo.id}</h4>
						</div>
						<div className="tagFooter">
							<h4>${storageInfo.price / 100}</h4>
							<CopyToClipboard text={storageInfo.id} onCopy={onCopyText}>
								<SickButton>Copy unit ID</SickButton>
							</CopyToClipboard>
							<span>{isCopied ? " Copied " : ""}</span>
						</div>
					</StorageUnitStyles>
				) : null}

				{storageInfoType ? (
					<StorageUnitStyles>
						<div className="tagHeader">
							<h4>Stoage unit type info</h4>
						</div>
						<div className="tagBody">
							<h4>ID: {storageInfoType.id}</h4>
						</div>
						<div className="tagFooter">
							<h4>unit: {storageInfoType.storageUnitType}</h4>
						</div>
					</StorageUnitStyles>
				) : null}
			</InfoContainer>

			<div className="DataDisplay">
				<div className="forms">
					<CreateStorageUnit />
					<CreateStorageUnitTypes />
				</div>
			</div>
		</AccessStyles>
	);
}

export default StorageUnitAccess;

const InfoContainer = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;
