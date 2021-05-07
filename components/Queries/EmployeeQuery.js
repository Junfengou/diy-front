import { gql, useQuery } from "@apollo/client";

// All existing employees on the platform
export const ALL_EMPLOYEE_QUERY = gql`
	query {
		allEmployees {
			id
			title
		}
	}
`;

function Employees() {
	const { data } = useQuery(ALL_EMPLOYEE_QUERY);
	return data?.allEmployees;
}

export default Employees;
