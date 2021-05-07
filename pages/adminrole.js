import React from "react";
import NoAccess from "../components/AdminAccess/NoAccess";
import PermissionAccess from "../components/AdminAccess/PermissionAccess";
import useUser from "../components/auth/User";

function adminrole() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;
	return <div>{!userPermission ? <NoAccess /> : <PermissionAccess />}</div>;
}

export default adminrole;
