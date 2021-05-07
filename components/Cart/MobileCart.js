import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { userRental } from "../../lib/RentalState";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import useUser from "../auth/User";
import SickButton from "../styles/SickButton";
import UsernameStyles from "../styles/UsernameStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CartItem from "./CartItem";

const ADD_RENTAL_MUTATION = gql`
	mutation ADD_RENTAL_MUTATION(
		$paymentAmount: Int
		$rental: [StorageUnitTypeWhereUniqueInput]
		$day: String
		$month: String
		$year: String
		$name: String
		$id: ID!
	) {
		createRental(
			data: {
				paymentAmount: $paymentAmount
				rental: { connect: $rental }
				day: $day
				month: $month
				year: $year
				name: $name
				user: { connect: { id: $id } }
			}
		) {
			paymentAmount
		}
	}
`;

function MobileCart() {
	const { rental, rentalPrice, unit, cartOpen, toggleCart } = userRental();
	const [startDate, setStartDate] = useState(new Date());
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [year, setYear] = useState("");
	const thisUser = useUser();
	const router = useRouter();
	const name = thisUser?.name;
	const id = thisUser?.id;
	const paymentAmount =
		!rentalPrice.length == 0
			? rentalPrice?.reduce((accu, item) => {
					return (accu += item.price);
			  }, 0)
			: 0;
	const [createRental, { loading, error }] = useMutation(ADD_RENTAL_MUTATION, {
		variables: { paymentAmount, rental, day, month, year, name, id },
	});
	if (!thisUser) return null;

	async function handleSubmit(e) {
		e.preventDefault();
		await createRental();

		router.push({
			pathname: "/thankyou",
		});

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}
	return (
		<MobileCartStyles>
			<div className="container">
				<header>
					<form onSubmit={handleSubmit}>
						<div className="username">{`${name}'s Cart`}</div>
						<div className="date">
							<h4>Move in date:</h4>
							<DatePicker
								selected={startDate}
								className="datepicker"
								onChange={(date) => {
									setStartDate(date);
									const pickedDate = date.toString().split(" ");
									setMonth(pickedDate[1]);
									setDay(pickedDate[2]);
									setYear(pickedDate[3]);
								}}
								closeOnScroll={true}
							/>
							<SickButton type="submit">Request Rental</SickButton>
						</div>
					</form>
				</header>
				<ul>
					{unit.map((item, i) => (
						<CartItem item={item} key={i} />
					))}
				</ul>
				<footer>
					<p>Total: {`$${paymentAmount / 100}`} </p>
				</footer>
			</div>
		</MobileCartStyles>
	);
}

export default MobileCart;

const MobileCartStyles = styled.div`
	padding: 0 5rem;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		width: 100%;
		height: 70%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		/* justify-items: center; */
		align-items: center;
	}
	header {
		border-bottom: 5px solid var(--black);
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	footer {
		border-top: 10px double var(--black);
		margin-top: 2rem;
		padding-top: 2rem;
		/* display: grid;
    grid-template-columns: auto auto; */
		align-items: center;
		font-size: 3rem;
		font-weight: 900;
		p {
			margin: 0;
		}
	}

	.date {
		display: flex;
		/* justify-content: center; */
		align-items: center;
		gap: 2rem;
		margin-top: 2rem;
	}

	.username {
		background: var(--orange);
		color: white;
		display: inline-block;
		padding: 6px 8px;
		/* transform: skew(-10deg); */
		margin: 0;
		font-size: 2rem;
	}

	/* .react-datepicker-popper {
		z-index: 1 !important;
	} */
`;
