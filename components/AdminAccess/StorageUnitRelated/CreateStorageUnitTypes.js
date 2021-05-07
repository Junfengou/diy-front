import React, { useState } from "react";
import { FormStyles } from "../../auth/SignIn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const CREATE_STORAGE_UNIT_TYPE_MUTATION = gql`
	mutation CREATE_STORAGE_UNIT_MUTATION($storageUnitType: String, $id: ID!) {
		createStorageUnitType(
			data: {
				storageUnitType: $storageUnitType
				unitType: { connect: { id: $id } }
			}
		) {
			storageUnitType
		}
	}
`;

function CreateStorageUnitTypes() {
	const [currentState, setCurrentState] = useState({});

	const [createStorageUnit, { data, error }] = useMutation(
		CREATE_STORAGE_UNIT_TYPE_MUTATION,
		{
			variables: currentState,
		}
	);
	return (
		<FormStyles>
			<FormStyles>
				<header className="baseFormHeader">
					<h1 className="baseFormHeading">Create a new Storage Unit Type</h1>
				</header>
				<Formik
					initialValues={{
						storageUnitType: "",
						id: "",
					}}
					validate={(values) => {
						const errors = {};

						if (!values.storageUnitType) {
							errors.storageUnitType = `Storage unit type info required* `;
						}

						if (!values.id) {
							errors.id = `Storage unit ID relationship required* `;
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						setCurrentState(values);
						createStorageUnit();
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
								<label>Storage unit type</label>
								<div className="formFieldWrapInner">
									<Field type="text" name="storageUnitType" className="field" />
								</div>
								<span>Storage size follow by unit number: 10 x 40 [#51]</span>
								<ErrorMessage
									name="storageUnitType"
									component="div"
									className="error"
								/>
							</div>

							{/* ----------------- */}

							<div className="formFieldWrap">
								<label>Link to Storage unit ID</label>
								<div className="formFieldWrapInner">
									<Field type="text" name="id" className="field" />
								</div>
								<span>Must match the newly created storage unit ID</span>
								<ErrorMessage name="id" component="div" className="error" />
							</div>

							<div className="btnCollection">
								<button type="submit" disabled={isSubmitting}>
									Create a unit type
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</FormStyles>
		</FormStyles>
	);
}

export default CreateStorageUnitTypes;
