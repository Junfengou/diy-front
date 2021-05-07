import { gql, useQuery } from "@apollo/client";

// Side note: This query only display all the users that have not been assigned with a permission
export const ALL_USER_ROLE_QUERY = gql`
	query ALL_USER_ROLE_QUERY($roleEmpty: Boolean) {
		allUsers(where: { role_is_null: $roleEmpty }) {
			id
			name
			role {
				name
			}
		}
	}
`;

function UserRole() {
	const roleEmpty = true;
	const { data } = useQuery(ALL_USER_ROLE_QUERY, {
		variables: { roleEmpty },
	});
	return data?.allUsers;
}

export default UserRole;
