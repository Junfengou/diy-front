import React, { useState } from "react";
import Employees from "../Queries/EmployeeQuery";
import Permission from "../Queries/RolesQuery";
import UserRole from "../Queries/UserRoleQuery";
import { AccessStyles, CardInfoStyles } from "./RentalListAccess";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SickButton from "../styles/SickButton";
import { FormStyles } from "../auth/SignIn";
import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

const CREATE_ROLE_MUTATION = gql`
	mutation CREATE_ROLE_MUTATION($userID: ID!, $roleID: ID!) {
		updateUser(id: $userID, data: { role: { connect: { id: $roleID } } }) {
			username
		}
	}
`;

function PermissionAccess() {
	const EmployeeArr = Employees();
	const PermissionArr = Permission();
	const UserPermission = UserRole();

	const [currentState, setCurrentState] = useState({});
	const [isCopied, setIsCopied] = useState(false);

	const onCopyText = () => {
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const [updateUser, { loading, data }] = useMutation(CREATE_ROLE_MUTATION, {
		variables: currentState,
	});

	return (
		<AccessStyles>
			<div className="InfoList">
				<CardInfoStyles>
					<h3>Users</h3>
					{UserPermission?.map((user, i) => (
						<div className="Container" key={i}>
							{!user?.role && (
								<>
									<p>
										{user.name} - {user.id}
									</p>
									<CopyToClipboard text={user.id} onCopy={onCopyText}>
										<SickButton>Copy User ID</SickButton>
									</CopyToClipboard>
								</>
							)}
						</div>
					))}
				</CardInfoStyles>

				<CardInfoStyles>
					<h3>Roles</h3>
					{PermissionArr?.map((permission, i) => (
						<div className="Container" key={i}>
							<>
								<p>
									{permission.name} - {permission.id}
								</p>

								<CopyToClipboard text={permission.id} onCopy={onCopyText}>
									<SickButton>Copy Role ID</SickButton>
								</CopyToClipboard>
							</>
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
						<h1 className="baseFormHeading">Assign a role to user</h1>
					</header>
					<Formik
						initialValues={{ userID: "", roleID: "" }}
						validate={(values) => {
							const errors = {};

							if (!values.userID) {
								errors.userID = `User ID required* `;
							}

							if (!values.roleID) {
								errors.roleID = `Role ID required* `;
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(true);
							setCurrentState(values);
							updateUser();
							console.log(values);
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
										<Field type="text" name="userID" className="field" />
									</div>
									<span>Copy a user ID above</span>
									<ErrorMessage
										name="userID"
										component="div"
										className="error"
									/>
								</div>

								{/* ----------------- */}

								<div className="formFieldWrap">
									<label>Role ID</label>
									<div className="formFieldWrapInner">
										<Field type="text" name="roleID" className="field" />
									</div>
									<span>Copy a role ID above</span>
									<ErrorMessage
										name="roleID"
										component="div"
										className="error"
									/>
								</div>

								<div className="btnCollection">
									<button type="submit" disabled={isSubmitting}>
										Add a role to user
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

export default PermissionAccess;

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
