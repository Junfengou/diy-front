import React from "react";
import styled from "styled-components";

function NoAccess() {
	return (
		<NoAccessStyles>
			<h1>No access granted!</h1>
			<p>You are not allowed to access this page. </p>
			<p>
				If you think this is an error, please contact the owner for access
				permission
			</p>
		</NoAccessStyles>
	);
}

export default NoAccess;

const NoAccessStyles = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		color: red;
	}
`;
