import { useState, useEffect, useContext } from "react";
import { server } from "../config";
import Blogs from "../components/Blogs";
import Sidebar from "../components/Sidebar";
import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
import AOS from "aos";
import { GlobalContext } from "../context/GlobalState";

export default function Home({ item, blogs, categories }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);
	const { updateBlogs, updateCategories, updateItem } = useContext(
		GlobalContext
	);

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

	useEffect(() => {
		updateBlogs(blogs);
		updateCategories(categories);
		updateItem(item);
	}, []);

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

					<Sidebar future={true} side={true} />
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

	const res2 = await fetch(`${server}/api/blogs`);
	const blogs = await res2.json();

	const res3 = await fetch(`${server}/api/categories`);
	const categories = await res3.json();

	return {
		props: {
			item,
			blogs,
			categories,
		},
	};
};
