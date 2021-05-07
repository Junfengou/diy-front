import React, { useState } from "react";
import { FormStyles } from "../../auth/SignIn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const CREATE_STORAGE_UNIT_MUTATION = gql`
	mutation CREATE_STORAGE_UNIT_MUTATION(
		$price: Int
		$description: String
		$availability: String
		$unitNum: Int
	) {
		createStorageUnit(
			data: {
				price: $price
				description: $description
				availability: $availability
				unitNum: $unitNum
			}
		) {
			price
		}
	}
`;

function CreateStorageUnit() {
	const [currentState, setCurrentState] = useState({});
	const status = "AVAILABLE";
	const [createStorageUnit, { data, error }] = useMutation(
		CREATE_STORAGE_UNIT_MUTATION,
		{
			variables: currentState,
		}
	);
	return (
		<FormStyles>
			<FormStyles>
				<header className="baseFormHeader">
					<h1 className="baseFormHeading">Create a new Storage Unit</h1>
				</header>
				<Formik
					initialValues={{
						description: "",
						availability: status,
					}}
					validate={(values) => {
						const errors = {};
						const status = /AVAILABLE|UNAVAILABLE/g;

						if (!values.unitNum) {
							errors.unitNum = `Unit number required* `;
						}

						if (!values.description) {
							errors.description = `Description required* `;
						}

						if (!values.price) {
							errors.price = "Price required*";
						}

						if (!values.availability) {
							errors.availability = "Status required*";
						} else if (!status.test(values.availability)) {
							errors.availability =
								"Storage can either be AVAILABLE or UNAVAILABLE";
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
								<label>Storage unit number</label>
								<div className="formFieldWrapInner">
									<Field type="number" name="unitNum" className="field" />
								</div>
								<span>Storage unit number: 51</span>
								<ErrorMessage
									name="unitNum"
									component="div"
									className="error"
								/>
							</div>

							{/* ----------------- */}

							<div className="formFieldWrap">
								<label>Description</label>
								<div className="formFieldWrapInner">
									<Field type="text" name="description" className="field" />
								</div>
								<ErrorMessage
									name="description"
									component="div"
									className="error"
								/>
							</div>

							{/* ----------------- */}

							<div className="formFieldWrap">
								<label>Price</label>
								<div className="formFieldWrapInner">
									<Field type="number" name="price" className="field" />
								</div>
								<span>price in cents</span>
								<ErrorMessage name="price" component="div" className="error" />
							</div>

							{/* ----------------- */}

							<div className="formFieldWrap">
								<label>Availability</label>
								<div className="formFieldWrapInner">
									<Field type="text" name="availability" className="field" />
								</div>
								<ErrorMessage
									name="availability"
									component="div"
									className="error"
								/>
							</div>

							<div className="btnCollection">
								<button type="submit" disabled={isSubmitting}>
									Create a storage unit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</FormStyles>
		</FormStyles>
	);
}

export default CreateStorageUnit;
