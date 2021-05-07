import React from "react";
import Storages from "../components/Storages/Storages";
import { useRouter } from "next/dist/client/router";
import useUser from "../components/auth/User";
import { Loginstyles } from "./signin";
import SignIn from "../components/auth/SignIn";

function storages() {
	const { query } = useRouter();
	const user = useUser();
	const page = Number(query.page);
	return (
		<div>
			{user ? (
				<Storages page={page} />
			) : (
				<Loginstyles>
					<SignIn />
				</Loginstyles>
			)}
		</div>
	);
}

export default storages;
