import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import { userRental } from "../../lib/RentalState";

const SIGNOUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

function SignOut() {
	const [signout] = useMutation(SIGNOUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	return (
		<ButtonStyle type="button" onClick={signout} className="uppercase">
			<p>Signout</p>
		</ButtonStyle>
	);
}

export default SignOut;

const ButtonStyle = styled.button`
	border: none;
	background: transparent;
	font-size: 1.6rem;
	text-transform: uppercase;

	@media (max-width: 1000px) {
		p {
			font-size: 1.3rem;
		}
	}
`;
