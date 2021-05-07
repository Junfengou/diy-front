import React from "react";
import styled from "styled-components";
import ButtonStyles from "../styles/ButtonStyles";
import Nav from "./Nav";
import Link from "next/link";
import useUser from "../auth/User";
import SignOut from "../auth/Signout";
import CartButton from "../Cart/CartButtom";
import Cart from "../Cart/Cart";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCrossedBones } from "react-icons/gi";
import { userRental } from "../../lib/RentalState";
import MobileNav from "./MobileNav";

function Header() {
	const user = useUser();
	const { click, openMobileMenu, closeMobileMenu } = userRental();
	return (
		<NavStyles>
			<HeaderStyles>
				<LogoStyles>
					<Link href="/">
						<h1>
							<span>DIY</span> Storage
						</h1>
					</Link>
				</LogoStyles>
				<Nav />
				{user && (
					<div className="btns">
						<ButtonStyles>
							<CartButton />
						</ButtonStyles>
						<ButtonStyles>
							<SignOut />
						</ButtonStyles>
						<Cart />
						<MobileNav />
						<div onClick={openMobileMenu}>
							{click ? (
								<GiCrossedBones className="HamburgerMenu" />
							) : (
								<GiHamburgerMenu className="HamburgerMenu" />
							)}
						</div>
					</div>
				)}
				{!user && (
					<div>
						<MobileNav />
						<div onClick={openMobileMenu}>
							{click ? (
								<GiCrossedBones className="HamburgerMenu" />
							) : (
								<GiHamburgerMenu className="HamburgerMenu" />
							)}
						</div>
						<Link href="/signin">
							<ButtonStyles>SIGNIN</ButtonStyles>
						</Link>
					</div>
				)}
			</HeaderStyles>
		</NavStyles>
	);
}

export default Header;

const HeaderStyles = styled.div`
	height: 8rem;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	background: var(--gray);
	overflow: hidden;
	/* position: fixed; */
	/* border: solid red; */

	.btns {
		display: flex;
	}

	.HamburgerMenu {
		font-size: 3rem;
		margin-top: 1rem;
		margin-right: 3rem;
		color: white;
		@media (min-width: 630px) {
			display: none;
		}
	}
`;

const LogoStyles = styled.h1`
	color: white;
	padding: 2rem;
	margin-left: 3rem;
	cursor: pointer;
	font-family: "post_no_bill";

	h1 {
		font-size: 3.5rem;
		@media (max-width: 850px) {
			font-size: 2.2rem;
		}
	}

	span {
		color: var(--orange);
	}
`;

const NavStyles = styled.nav`
	position: relative;
`;
