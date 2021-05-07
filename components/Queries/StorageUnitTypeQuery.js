import { gql, useQuery } from "@apollo/client";

// All existing storage unit types on the platform
export const ALL_STORAGE_UNIT_TYPES_QUERY = gql`
	query {
		allStorageUnitTypes {
			id
			storageUnitType
			unitType {
				availability
			}
		}
	}
`;

function StorageUnitsTypes() {
	const { data } = useQuery(ALL_STORAGE_UNIT_TYPES_QUERY);
	return data?.allStorageUnitTypes;
}

export default StorageUnitsTypes;
