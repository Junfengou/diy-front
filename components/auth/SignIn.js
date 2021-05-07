import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

function SignIn() {
	const [currentState, setCurrentState] = useState({});
	const [authenticateUserWithPassword, { loading, data }] = useMutation(
		SIGNIN_MUTATION,
		{
			variables: currentState,
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
		}
	);

	const error =
		data?.authenticateUserWithPassword.__typename ===
		"UserAuthenticationWithPasswordFailure"
			? data?.authenticateUserWithPassword
			: undefined;

	async function handleSubmit(e) {
		e.preventDefault();

		await authenticateUserWithPassword();
		resetForm();
	}

	return (
		<FormStyles>
			<header className="baseFormHeader">
				<h1 className="baseFormHeading">Sign in</h1>
			</header>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					const errors = {};
					const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
					const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;

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

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					setCurrentState(values);
					authenticateUserWithPassword();
					console.log(values);
					// console.log(currentState);
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
							<span>Enter the email you used to sign up</span>
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

						<div className="btnCollection">
							<button type="submit" disabled={isSubmitting}>
								Sign In
							</button>

							<div className="btn">
								<Link href="/signup">SignUp</Link>
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
		</FormStyles>
	);
}

export default SignIn;

export const FormStyles = styled.div`
	margin: 4rem;
	padding: 3rem 4rem;
	background-color: white;
	box-shadow: 0 0 1.5rem rgba(105, 105, 105, 0.5);
	border-radius: 4px;
	/* width: 50vw; */
	min-width: 40vw;

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

	span {
		font-size: 1rem;
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
