import { useState, useEffect } from "react";
import AOS from "aos";

export default function Home() {
	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	return (
		<div className="site-content">
			<h1>Hello :)</h1>
		</div>
	);
}
