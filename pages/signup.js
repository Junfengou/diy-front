import React from "react";
import styled from "styled-components";
import SignUp from "../components/auth/Signup";

function signup() {
	return (
		<SigninPagestyles>
			<SignUp />
		</SigninPagestyles>
	);
}

export default signup;

const SigninPagestyles = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(240, 164, 50, 0.8);

	@media (max-width: 900px) {
		height: auto;
		padding: 8rem;
		flex-direction: column;
	}
`;
