import React from "react";
import styled from "styled-components";
import EmployeeListAccess from "../components/AdminAccess/EmployeeListAccess";
import useUser from "../components/auth/User";
import NoAccess from "../components/AdminAccess/NoAccess";

function adminemployee() {
	const user = useUser();
	const userPermission = user?.role?.canAccessAdminFunctionClient;
	return <div>{!userPermission ? <NoAccess /> : <EmployeeListAccess />}</div>;
}

export default adminemployee;
