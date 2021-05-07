import React from "react";
import SignIn from "../components/auth/SignIn";
import useUser from "../components/auth/User";
import MobileCart from "../components/Cart/MobileCart";
import { Loginstyles } from "./signin";

function cart() {
	const user = useUser();
	return (
		<div>
			{user ? (
				<MobileCart />
			) : (
				<Loginstyles>
					<SignIn />
				</Loginstyles>
			)}
		</div>
	);
}

export default cart;
