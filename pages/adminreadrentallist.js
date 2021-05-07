import React from "react";
import NoAccess from "../components/AdminAccess/NoAccess";
import ReadRentalList from "../components/AdminAccess/ReadRentalList";
import useUser from "../components/auth/User";

function adminreadrentallist() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;
	return <div>{!userPermission ? <NoAccess /> : <ReadRentalList />}</div>;
}

export default adminreadrentallist;
