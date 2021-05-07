import { gql, useQuery } from "@apollo/client";

// All existing rentals on the platform
export const ALL_RENTALS_QUERY = gql`
	query {
		allRentals {
			id
			name
			paymentAmount
			day
			month
			year
			availability
			rental {
				id
				storageUnitType
			}
			user {
				id
			}
		}
	}
`;

function Rentals() {
	const { data } = useQuery(ALL_RENTALS_QUERY);
	return data?.allRentals;
}

export default Rentals;
