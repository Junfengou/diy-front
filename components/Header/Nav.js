import React from "react";
import Link from "next/link";
import styled from "styled-components";
import useUser from "../auth/User";

function Nav() {
	const user = useUser();
	return (
		<NavStyles>
			{user && !user?.role?.canAccessAdminFunctionClient && (
				<>
					<Link href="/about">About</Link>
					<Link href="/faq">FAQ</Link>
					<Link href="/storages">Storages</Link>
					<Link href="/account">Account</Link>
				</>
			)}
			{user && user?.role?.canAccessAdminFunctionClient && (
				<>
					<Link href="/about">About</Link>
					<Link href="/faq">FAQ</Link>
					<Link href="/storages">Storages</Link>
					<Link href="/account">Account</Link>
					<Link href="/admindashboard">Admin</Link>
				</>
			)}

			{!user && (
				<>
					<Link href="/about">About</Link>
					<Link href="/faq">FAQ</Link>
				</>
			)}
		</NavStyles>
	);
}

export default Nav;

const NavStyles = styled.div`
	/* border: solid blue; */
	color: white;
	display: flex;
	justify-content: space-around;
	width: 30%;
	max-width: 500px;
	min-width: 300px;

	@media (max-width: 1000px) {
		/* display: none; */
		a {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 670px) {
		a {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 630px) {
		display: none;
	}
`;
