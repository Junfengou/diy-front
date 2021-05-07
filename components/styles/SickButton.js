import styled from "styled-components";

const SickButton = styled.button`
	background: var(--orange);
	color: black;
	font-weight: 500;
	border: 0;
	border-radius: 0;
	text-transform: uppercase;
	font-size: 1rem;
	/* padding: 0.8rem 1.5rem; */
	padding: 0.5rem 1rem;
	/* transform: skew(-2deg); */
	display: inline-block;

	/* transition: all 0.5s; */
	/* outline: none; */
	&[disabled] {
		opacity: 0.5;
	}
`;

export default SickButton;
