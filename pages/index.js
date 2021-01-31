import { useState, useEffect } from "react";
import { server } from "../config";
import Blogs from "../components/Blogs";
import Sidebar from "../components/Sidebar";
import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
import AOS from "aos";

export default function Home({ item }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.

		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.
		const timeoutID = setTimeout(function () {
			preload.classList.add("finish");
			clearTimeout(timeoutID);
		}, 7000);

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
		<>
			<section className="about">
				<About /> {/* About section */}
			</section>
			<section className="featured">
				<Featured /> {/* Featured section */}
			</section>
			<div className="search-wrapper">
				<Search searchBlogs={searchBlogs} /> {/* Search box */}
			</div>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs">
						<Blogs searchTerm={queryText} category={false} search={searching} />
					</section>

					<Sidebar future={true} />
					{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
				</div>
			</section>
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(`${server}/api/featured-item`);
	const item = await res.json();

	return {
		props: {
			item,
		},
	};
};
