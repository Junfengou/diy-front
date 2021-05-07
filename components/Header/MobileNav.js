import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { userRental } from "../../lib/RentalState";
import SignOut from "../auth/Signout";
import useUser from "../auth/User";

function MobileNav() {
	const { click, closeMobileMenu } = userRental();
	const user = useUser();
	return (
		<MobileMenuStyles open={click}>
			{user && (
				<div className="container">
					<Link href="/about">
						<div onClick={closeMobileMenu}>About</div>
					</Link>
					<Link href="/faq">
						<div onClick={closeMobileMenu}>FAQ</div>
					</Link>
					<Link href="/storages">
						<div onClick={closeMobileMenu}>Storages</div>
					</Link>
					<div className="btnCollection">
						<div className="btn">
							<SignOut />
						</div>

						<div className="btn" onClick={closeMobileMenu}>
							<Link href="/cart">
								<div>Cart</div>
							</Link>
						</div>
					</div>
				</div>
			)}
			{!user && (
				<div className="container">
					<Link href="/about">
						<div onClick={closeMobileMenu}>About</div>
					</Link>
					<Link href="/faq">
						<div onClick={closeMobileMenu}>FAQ</div>
					</Link>

					<div className="btnCollection">
						<div className="btn">
							<Link href="/signin">
								<div onClick={closeMobileMenu}>SIGNIN</div>
							</Link>
						</div>
					</div>
				</div>
			)}
		</MobileMenuStyles>
	);
}

export default MobileNav;

const MobileMenuStyles = styled.div`
	align-items: center;
	padding: 20px;
	position: relative;
	background: white;
	position: fixed;
	height: 100%;
	top: 0;
	left: 0;
	width: 80%;
	/* min-width: 430px; */
	bottom: 0;
	transform: translateX(-100%);
	transition: all 1s;
	box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
	display: grid;
	justify-items: center;
	align-items: center;
	grid-template-rows: auto;
	overflow-x: hidden;
	overflow-y: hidden;
	${(props) => props.open && `transform: translateX(0);`};
	z-index: 10000 !important;

	.container {
		width: 60%;
		height: 50%;
		display: grid;
		grid-template-rows: auto;
		justify-items: center;
		align-items: center;
		position: fixed;
	}

	.btnCollection {
		display: flex;
		gap: 2rem;
		justify-content: center;
		align-items: center;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 1rem;
		height: 4rem;
		width: 10rem;
		background: var(--orange);

		a {
			text-decoration: none;
			font-weight: normal;
		}
	}
`;
