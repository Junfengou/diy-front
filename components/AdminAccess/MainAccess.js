import React from "react";
import Link from "next/link";
import styled from "styled-components";
import UsernameStyles from "../styles/UsernameStyles";
import SickButton from "../styles/SickButton";

function MainAccess() {
	return (
		<MainAccessMenuStyles>
			<>
				<UsernameStyles>Admin access dashboard</UsernameStyles>
			</>
			<div className="container">
				<div className="wrapper">
					<h3>Rental list access</h3>
					<SickButton>
						<Link href="/admincreaterentallist">Create Rental List</Link>
					</SickButton>

					<SickButton>
						<Link href="/adminreadrentallist">Read Rental List</Link>
					</SickButton>
				</div>

				<div className="wrapper">
					<h3>Employee access</h3>
					<SickButton>
						<Link href="/adminemployee">Create Employee</Link>
					</SickButton>
				</div>

				<div className="wrapper">
					<h3>Storage access</h3>
					<SickButton>
						<Link href="/adminstorage">Create Storage units and types</Link>
					</SickButton>

					<SickButton>
						<Link href="/adminreadstorages">Read Storages units</Link>
					</SickButton>

					<SickButton>
						<Link href="/adminreadstoragetype">Read Storages unit types</Link>
					</SickButton>
				</div>

				<div className="wrapper">
					<h3>Permission access</h3>
					<SickButton>
						<Link href="/adminrole">Assign permission</Link>
					</SickButton>
				</div>
			</div>

			{/* Add another button for read rental list */}
		</MainAccessMenuStyles>
	);
}

export default MainAccess;

const MainAccessMenuStyles = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	justify-content: center;
	align-items: center;

	.container {
		display: flex;
		gap: 5rem;
	}
	.wrapper {
		display: grid;
		grid-template-rows: auto;
		justify-items: center;
		align-items: center;
		gap: 2rem;
		width: 100%;
	}
`;
