import React from "react";
import MainAccess from "../components/AdminAccess/MainAccess";
import NoAccess from "../components/AdminAccess/NoAccess";
import RentalListAccess from "../components/AdminAccess/RentalListAccess";
import useUser from "../components/auth/User";

function adminDashboard() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;

	return (
		<div>
			{!userPermission ? <NoAccess /> : <MainAccess />}
			{/* hmm */}
		</div>
	);
}

export default adminDashboard;
