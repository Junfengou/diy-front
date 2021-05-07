import React from "react";
import styled from "styled-components";

function Authenticated({ user }) {
	return (
		<AuthenticatedStyles>
			<h1>Welcome back {user.username}!</h1>
		</AuthenticatedStyles>
	);
}

export default Authenticated;

const AuthenticatedStyles = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
