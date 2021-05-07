import React from "react";
import styled from "styled-components";
import Authenticated from "../components/auth/Authenticated";
import SignIn from "../components/auth/SignIn";
import useUser from "../components/auth/User";
import Banner from "../components/Home/Banner";

function signin() {
	const user = useUser();
	return (
		<Loginstyles>
			{!user ? <SignIn /> : <Authenticated user={user} />}
		</Loginstyles>
	);
}

export default signin;

export const Loginstyles = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	background-color: rgba(240, 164, 50, 0.8);

	@media (max-width: 900px) {
		/* height: auto; */
		padding: 8rem;
		flex-direction: column;
	}
`;
