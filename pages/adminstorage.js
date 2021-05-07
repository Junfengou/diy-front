import React from "react";
import NoAccess from "../components/AdminAccess/NoAccess";
import StorageUnitAccess from "../components/AdminAccess/StorageUnitAccess";
import useUser from "../components/auth/User";

function adminstorage() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;
	return <div>{!userPermission ? <NoAccess /> : <StorageUnitAccess />}</div>;
}

export default adminstorage;
