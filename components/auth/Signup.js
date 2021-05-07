import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$username: String!
		$email: String!
		$password: String!
		$name: String!
		$address: String!
		$city: String!
		$state: String!
		$zipcode: Int!
		$country: String!
		$phone: String! # $drlic: String!
	) {
		createUser(
			data: {
				username: $username
				email: $email
				password: $password
				name: $name
				address: $address
				city: $city
				state: $state
				zipcode: $zipcode
				country: $country
				phone: $phone
				# drlic: $drlic
			}
		) {
			username
			email
		}
	}
`;

function Signup() {
	const [currentState, setCurrentState] = useState({});
	const [createUser, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
		variables: currentState,
	});

	return (
		<SignUpStyles>
			<header className="baseFormHeader">
				<h1 className="baseFormHeading">Sign up form</h1>
				{data?.createUser && (
					<p>
						Signed up with {data.createUser.email} - Please go ahead and sign
						in!
					</p>
				)}
			</header>
			<Formik
				initialValues={{
					email: "",
					password: "",
					username: "",
					name: "",
					address: "",
					city: "",
					state: "",
					zipcode: 0,
					country: "",
					phone: "",
					drlic: "",
				}}
				validate={(values) => {
					const errors = {};
					const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
					const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
					const addressRegex = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)?/;
					const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
					const zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
					const driverLicRegex = /H[0-9]{8}/gi;

					if (!values.email) {
						errors.email = `Email required* `;
					} else if (!emailRegex.test(values.email)) {
						errors.email = "Invalid email address";
					}

					if (!values.password) {
						errors.password = "Password required*";
					} else if (values.password.length < 8) {
						errors.password = "Password must be 8 characters long";
					} else if (!passwordRegex.test(values.password)) {
						errors.password =
							"Invalid password. Must contain one number, one lower case, and one uppercase, and one symbol.";
					}

					if (!values.username) {
						errors.username = `Username required*`;
					}

					if (!values.name) {
						errors.name = `Name required*`;
					}

					if (!values.address) {
						errors.address = `Address required*`;
					} else if (!addressRegex.test(values.address)) {
						errors.address = "Invalid address";
					}

					if (!values.city) {
						errors.city = `City required*`;
					}

					if (!values.state) {
						errors.state = `State required*`;
					}

					if (!values.zipcode) {
						errors.zipcode = `Zipcode required*`;
					} else if (!zipcodeRegex.test(values.zipcode)) {
						errors.zipcode = `Invalid zipcode*`;
					}

					if (!values.country) {
						errors.country = `Country required*`;
					}

					if (!values.phone) {
						errors.phone = `Phone number required*`;
					} else if (!phoneRegex.test(values.phone)) {
						errors.phone = `Invalid phone number`;
					}

					// if (!values.drlic) {
					// 	errors.drlic = `Driver License required*`;
					// } else if (values.drlic.length < 9 || values.drlic.length > 9) {
					// 	errors.drlic = `Driver license # must be 9 digits`;
					// } else if (!driverLicRegex.test(values.drlic)) {
					// 	errors.drlic = `Invalid Driver license # `;
					// }

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					setCurrentState(values);
					createUser();
					console.log(values);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="baseForm">
						<div className="formFieldWrap">
							<label>Email</label>
							<div className="formFieldWrapInner">
								<Field type="email" name="email" className="field" />
							</div>
							<ErrorMessage name="email" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Password</label>
							<div className="formFieldWrapInner">
								<Field type="password" name="password" className="field" />
							</div>
							<span>
								Password must contain one number, one lower case, one uppercase,
								and one symbol
							</span>
							<ErrorMessage name="password" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Username</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="username" className="field" />
							</div>
							<ErrorMessage name="username" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Name</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="name" className="field" />
							</div>
							<span>Please enter first and last name</span>
							<ErrorMessage name="name" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Address</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="address" className="field" />
							</div>
							<ErrorMessage name="address" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>City</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="city" className="field" />
							</div>
							<ErrorMessage name="city" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>State</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="state" className="field" />
							</div>
							<ErrorMessage name="state" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Zipcode</label>
							<div className="formFieldWrapInner">
								<Field type="number" name="zipcode" className="field" />
							</div>
							<span>Zip code must be no longer than 6 digits</span>
							<ErrorMessage name="zipcode" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Country</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="country" className="field" />
							</div>
							<ErrorMessage name="country" component="div" className="error" />
						</div>

						{/* ----------------- */}

						<div className="formFieldWrap">
							<label>Phone</label>
							<div className="formFieldWrapInner">
								<Field type="text" name="phone" className="field" />
							</div>
							<span>Enter the phone number without - in between</span>
							<ErrorMessage name="phone" component="div" className="error" />
						</div>

						{/* ----------------- */}

						{/* <div className="formFieldWrap">
							<label>Driver license</label>
							<div className="formFieldWrapInner">
								<Field
									type="text"
									name="drlic"
									className="field"
									placeholder="HXXXXXXXX"
								/>
							</div>
							<ErrorMessage name="drlic" component="div" className="error" />
						</div> */}

						<div className="btnCollection">
							<button type="submit" disabled={isSubmitting}>
								Sign up
							</button>

							<div className="btn">
								<Link href="/signin">Log in</Link>
							</div>
						</div>

						<h4 className="baseFormHeading">
							{data?.createUser && (
								<p>
									Signed up with {data.createUser.email} - Please go ahead and
									sign in!
								</p>
							)}
						</h4>
					</Form>
				)}
			</Formik>
		</SignUpStyles>
	);
}

export default Signup;

const SignUpStyles = styled.div`
	/* padding: 30px 20px; */
	margin: 4rem;
	padding: 3rem 4rem;
	background-color: white;
	box-shadow: 0 0 1.5rem rgba(105, 105, 105, 0.5);
	border-radius: 4px;
	/* width: 50vw; */
	min-width: 50vw;

	.baseFormHeading {
		text-transform: capitalize;
	}

	.baseForm {
		display: grid;
		row-gap: 2rem;
	}

	.formFieldWrap {
		display: grid;
		grid-template-rows: max-content 1fr max-content max-content;

		.formFieldWrapInner {
			grid-column: 1/-1;
			background-color: white;
			border-radius: 2%;
			font-size: 1rem;
			height: 4rem;
			display: flex;
			transition: background-color 240ms, box-shadow 240ms;

			.field {
				width: 80%;
			}
		}

		.error {
			color: red;
		}
	}

	.btnCollection {
		display: flex;
		gap: 2rem;
	}

	button {
		height: 5rem;
		width: 10rem;
		background: var(--orange);
		border-radius: 3%;
		border: none;
		outline: none;
	}
	span {
		font-size: 1rem;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 1rem;
		height: 5rem;
		width: 10rem;
		background: var(--orange);

		a {
			text-decoration: none;
			font-weight: normal;
		}
	}

	@media (max-width: 850px) {
		width: 90vw;

		.baseFormHeader {
			h1 {
				font-size: 1.9rem;
			}
		}
	}
`;
