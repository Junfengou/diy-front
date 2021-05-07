import React, { useState } from "react";
import { userRental } from "../../lib/RentalState";
import CartStyles from "../styles/CartStyles";
import CloseButton from "../styles/CloseButton";
import UsernameStyles from "../styles/UsernameStyles";
import { BiRightArrow } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUser from "../auth/User";
import CartItem from "./CartItem";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import SickButton from "../styles/SickButton";

const ADD_RENTAL_MUTATION = gql`
	mutation ADD_RENTAL_MUTATION(
		$paymentAmount: Int
		$rental: [StorageUnitTypeWhereUniqueInput]
		$day: String
		$month: String
		$year: String
		$name: String
		$availability: String
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
				availability: $availability
				user: { connect: { id: $id } }
			}
		) {
			paymentAmount
		}
	}
`;

function Cart() {
	const { rental, rentalPrice, unit, cartOpen, toggleCart } = userRental();
	const [startDate, setStartDate] = useState(new Date());
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [year, setYear] = useState("");
	const availability = "IN PROGRESS";
	const thisUser = useUser();
	const router = useRouter();
	const name = thisUser?.name;
	const id = thisUser?.id;
	// const paymentAmount = rentalPrice.reduce((acc, item) => (acc += item), 0); This field is now an arrays of objects
	const paymentAmount =
		!rentalPrice.length == 0
			? rentalPrice?.reduce((accu, item) => {
					return (accu += item.price);
			  }, 0)
			: 0;

	const [createRental, { loading, error }] = useMutation(ADD_RENTAL_MUTATION, {
		variables: {
			paymentAmount,
			rental,
			day,
			month,
			year,
			name,
			availability,
			id,
		},
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
		<CartStyles open={cartOpen}>
			<header>
				<form onSubmit={handleSubmit}>
					<UsernameStyles>{`${name}'s Cart`}</UsernameStyles>
					<div className="date">
						<h4>Move in date:</h4>
						<DatePicker
							className="datePicker"
							selected={startDate}
							onChange={(date) => {
								setStartDate(date);
								const pickedDate = date.toString().split(" ");
								setMonth(pickedDate[1]);
								setDay(pickedDate[2]);
								setYear(pickedDate[3]);
							}}
						/>
						<SickButton type="submit">Request Rental</SickButton>
					</div>
				</form>
			</header>

			<CloseButton onClick={toggleCart}>
				<BiRightArrow onClick={toggleCart} />
			</CloseButton>

			<ul>
				{unit.map((item, i) => (
					<CartItem item={item} key={i} />
				))}
			</ul>
			<footer>
				<p>Total: {`$${paymentAmount / 100}`} </p>
			</footer>
		</CartStyles>
	);
}

export default Cart;
