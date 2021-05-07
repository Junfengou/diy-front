import React from "react";
import styled from "styled-components";

function thankyou() {
	return (
		<ThankYouStyles>
			<div className="msg">
				<h3>
					Thank you for your rental request! The owner will contact you shortly
				</h3>
			</div>
		</ThankYouStyles>
	);
}

export default thankyou;

const ThankYouStyles = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.msg {
		padding: 2rem;

		@media (max-width: 1000px) {
			h3 {
				font-size: 1.5rem;
			}
		}

		@media (max-width: 700px) {
			h3 {
				font-size: 1.3rem;
			}
		}
	}
`;
