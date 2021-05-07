import { gql, useQuery } from "@apollo/client";

// All existing roles on the platform
export const ALL_ROLES_QUERY = gql`
	query {
		allRoles {
			id
			name
		}
	}
`;

function Permission() {
	const { data } = useQuery(ALL_ROLES_QUERY);
	return data?.allRoles;
}

export default Permission;
