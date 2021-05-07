import React from "react";
import Banner from "../components/Home/Banner";
import Accordion from "../components/FAQ/Accordion";
import Discount from "../components/FAQ/Discount";

function faq() {
	return (
		<div>
			<Banner />
			<Discount />
			<Accordion />
		</div>
	);
}

export default faq;
