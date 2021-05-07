import React from "react";
import styled from "styled-components";
import { userRental } from "../../lib/RentalState";

function CartButton() {
	const { toggleCart } = userRental();

	return (
		<ButtonStyle type="button" className="uppercase" onClick={toggleCart}>
			<p>Cart</p>
		</ButtonStyle>
	);
}

export default CartButton;

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
