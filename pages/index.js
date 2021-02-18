import { useState, useEffect } from "react";
import AOS from "aos";

export default function Home() {
	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.

		const preload = document.querySelector(".preload");
		window.addEventListener("load", () => {
			// Get rid of preloader once everything's loaded
			preload.classList.add("finish");
		});

		return () => {
			window.removeEventListener("load", () => {
				// Get rid of preloader once everything's loaded
				preload.classList.add("finish");
			});
		};
	}, []);

	return (
		<div className="site-content">
			<h1>Hello :)</h1>
		</div>
	);
}
