import React from "react";
import styled from "styled-components";
import useUser from "./User";
import { AccessStyles, CardInfoStyles } from "../AdminAccess/RentalListAccess";

function Account() {
	const User = useUser();
	console.log({ User });
	return (
		<AccountStyles>
			{User ? (
				<>
					<div className="header">
						<h2>Welcome back {User?.name}</h2>
					</div>
					<div className="container">
						<div className="wrapper">
							<p>
								<span>Email:</span> {User?.email}
							</p>
							<p>
								<span>Address:</span> {User?.address}
							</p>
							<p>
								<span>City:</span> {User?.city}
							</p>
							<p>
								<span>State:</span> {User?.state}
							</p>
							<p>
								<span>Zipcode:</span> {User?.zipcode}
							</p>
							<p />
						</div>

						<div>
							{User?.rental ? (
								<div className="wrapper">
									<p>
										<span>Rental request:</span>{" "}
									</p>
									{User?.rental?.rental?.map((item, i) => (
										<p>{item?.storageUnitType}</p>
									))}
									<p>
										<span>Status:</span> {User?.rental?.availability}
									</p>
									<p />
								</div>
							) : null}
						</div>
					</div>
				</>
			) : null}
		</AccountStyles>
	);
}

export default Account;

const AccountStyles = styled.div`
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.header {
		margin: 10rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		max-width: 1300px;
		margin: 3rem 0;
		gap: 10rem;

		@media (max-width: 630px) {
			flex-direction: column;
			gap: 3rem;
		}
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		/* padding: 0 2rem; */
		padding-left: 2rem;
		background: var(--offWhite);
		transform: skew(-15deg);
		gap: 2rem;
		width: 100%;
	}

	span {
		color: var(--orange);
	}
`;
