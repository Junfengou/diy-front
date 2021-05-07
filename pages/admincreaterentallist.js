import React from "react";
import NoAccess from "../components/AdminAccess/NoAccess";
import RentalListAccess from "../components/AdminAccess/RentalListAccess";
import useUser from "../components/auth/User";

function adminrentallist() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;
	return <div>{!userPermission ? <NoAccess /> : <RentalListAccess />}</div>;
}

export default adminrentallist;
