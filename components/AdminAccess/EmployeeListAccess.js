import React, { useState } from "react";
import Employees from "../Queries/EmployeeQuery";
import Users from "../Queries/UserQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";
import { userRental } from "../../lib/RentalState";
import { FormStyles } from "../auth/SignIn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SickButton from "../styles/SickButton";

const CREATE_EMPLOYEE_MUTATION = gql`
	mutation CREATE_EMPLOYEE_MUTATION(
		$employeee: ID!
		$title: String
		$payStatus: String
	) {
		createEmployee(
			data: {
				employeee: { connect: { id: $employeee } }
				title: $title
				payStatus: $payStatus
			}
		) {
			title
		}
	}
`;

function EmployeeListAccess() {
	const UserArr = Users();
	const EmployeeArr = Employees();
	const [isCopied, setIsCopied] = useState(false);

	const [currentState, setCurrentState] = useState({});

	const onCopyText = () => {
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const [createEmployee, { loading, data }] = useMutation(
		CREATE_EMPLOYEE_MUTATION,
		{
			variables: currentState,
		}
	);

	return (
		<AccessStyles>
			<div className="InfoList">
				<CardInfoStyles>
					<h3>Users</h3>
					<span>{isCopied ? "Copied" : ""}</span>
					{UserArr?.map((user, i) => (
						<div className="Container" key={i}>
							<p>{user.name}</p>
							<CopyToClipboard text={user.id} onCopy={onCopyText}>
								<SickButton>Copy User ID</SickButton>
							</CopyToClipboard>
						</div>
					))}
				</CardInfoStyles>

				<CustomStyles>
					<h3>Employees</h3>
					{EmployeeArr?.map((person, i) => (
						<div className="Container" key={i}>
							<p>{person.title}</p>
						</div>
					))}
				</CustomStyles>
			</div>
			<div className="DataDisplay">
				<FormStyles>
					<header className="baseFormHeader">
						<h1 className="baseFormHeading">Create a new employee</h1>
					</header>
					<Formik
						initialValues={{ employeee: "", title: "", payStatus: "" }}
						validate={(values) => {
							const errors = {};
							const payRegex = /SALARY|HOURLY/g;

							if (!values.employeee) {
								errors.employeee = `User ID required* `;
							}

							if (!values.title) {
								errors.title = `Employee title required* `;
							}

							if (!values.payStatus) {
								errors.payStatus = "Pay status required*";
							} else if (!payRegex.test(values.payStatus)) {
								errors.payStatus = "Employee can either be SALARY or HOURLY";
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(true);
							setCurrentState(values);
							createEmployee();
							// console.log(values);
							setSubmitting(false);
							setTimeout(() => {
								window.location.reload();
							}, 1000);
						}}
					>
						{({ isSubmitting }) => (
							<Form className="baseForm">
								<div className="formFieldWrap">
									<label>User ID</label>
									<div className="formFieldWrapInner">
										<Field type="text" name="employeee" className="field" />
									</div>
									<span>Copy a user ID from above</span>
									<ErrorMessage
										name="employeee"
										component="div"
										className="error"
									/>
								</div>

								{/* ----------------- */}

								<div className="formFieldWrap">
									<label>Title</label>
									<div className="formFieldWrapInner">
										<Field type="text" name="title" className="field" />
									</div>
									<span>Format: Employee - John</span>
									<ErrorMessage
										name="title"
										component="div"
										className="error"
									/>
								</div>

								{/* ----------------- */}

								<div className="formFieldWrap">
									<label>Pay Status</label>
									<div className="formFieldWrapInner">
										<Field type="text" name="payStatus" className="field" />
									</div>
									<span>HOURLY OR SALARY</span>
									<ErrorMessage
										name="payStatus"
										component="div"
										className="error"
									/>
								</div>

								<div className="btnCollection">
									<button type="submit" disabled={isSubmitting}>
										Add an employee
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</FormStyles>
			</div>
		</AccessStyles>
	);
}

export default EmployeeListAccess;

const CustomStyles = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 2rem;

	margin: 2rem;
	padding: 2rem;

	.Container {
		display: flex;
		justify-content: space-between;
		padding: 0 2rem;
		/* padding-left: 2rem; */
		background: var(--offWhite);
		transform: skew(-15deg);
		gap: 2rem;
		/* border: solid red; */
		width: 100%;
	}
`;
