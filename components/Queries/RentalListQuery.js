import { gql, useQuery } from "@apollo/client";

// All existing rental list on the platform
export const ALL_RENTAL_LIST_QUERY = gql`
	query {
		allRentalLists {
			rentby {
				name
				availability
			}
			employee {
				title
			}
			storageUnit {
				unitNum
			}
			storageType {
				storageUnitType
			}
		}
	}
`;

function RentalList() {
	const { data } = useQuery(ALL_RENTAL_LIST_QUERY);
	return data?.allRentalLists;
}

export default RentalList;
