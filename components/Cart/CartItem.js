import React from "react";
import styled from "styled-components";
import { userRental } from "../../lib/RentalState";

function CartItem({ item }) {
	const { deleteUnit } = userRental();
	return (
		<CartItemStyles>
			<h3>{item.unitType}</h3>
			<p>Unit # {item.unitNum}</p>
			<p>${item.price / 100}</p>
			<button type="button" onClick={() => deleteUnit(item.id)}>
				&times;
			</button>
		</CartItemStyles>
	);
}

export default CartItem;

const CartItemStyles = styled.li`
	border-bottom: solid 1px var(--orange);
	border-width: 60%;
	padding: 1rem 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		background: transparent;
		border: none;
	}
`;
