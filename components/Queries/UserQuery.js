import { gql, useQuery } from "@apollo/client";

// All existing users on the platform
export const ALL_USER_QUERY = gql`
	query {
		allUsers {
			id
			name
			email
			role {
				name
			}
		}
	}
`;

function Users() {
	const { data } = useQuery(ALL_USER_QUERY);
	return data?.allUsers;
}

export default Users;
