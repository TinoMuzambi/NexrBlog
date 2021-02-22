import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import { withRouter } from "next/router";

import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
import Blogs from "../components/Blogs";
import Sidebar from "../components/Sidebar";
import Preload from "../components/Preload";
import { getBlogs, getCategories, getFeatured } from "../utils/fetch";
import { executeScroll } from "../utils/helpers";

function Home({ blogs, categories, featuredItem, router }) {
	const [queryText, setQueryText] = useState("");
	const blogsRef = useRef(null);

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

	useEffect(() => {
		const fromOpenSearch = router.query?.fromOpenSearch;
		if (fromOpenSearch) {
			setQueryText(router.query?.queryText);
			executeScroll(blogsRef);
		}
	}, [router.query]);

	const searchBlogs = (querySearch) => {
		// Search by updating queryText state.
		setQueryText(querySearch);
	};

	if (!blogs.length || !categories.length || !featuredItem) return <Preload />;

	const filteredBlogs = blogs.filter((eachItem) => {
		// Only get future blogs for sidebar.
		return eachItem["future"] === true;
	});

	let homeBlogs = blogs.filter((eachItem) => {
		// Only get published blogs for main content.
		return eachItem["future"] === false;
	});

	homeBlogs = homeBlogs.filter((eachItem) => {
		// Only display blogs matching search.
		return (
			eachItem["title"] // Search in title.
				.toLowerCase()
				.includes(queryText.toLowerCase()) ||
			eachItem["category"] // Search in category.
				.toLowerCase()
				.includes(queryText.toLowerCase()) ||
			eachItem["content"] // Search in content.
				.toLowerCase()
				.includes(queryText.toLowerCase())
		);
	});

	return (
		<>
			<section className="about">
				<About /> {/* About section */}
			</section>
			<section className="featured">
				<Featured item={featuredItem} /> {/* Featured section */}
			</section>
			<div className="search-wrapper">
				<Search query={queryText} searchBlogs={searchBlogs} />{" "}
				{/* Search box */}
			</div>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs" ref={blogsRef}>
						<Blogs blogs={homeBlogs} category={false} blogsRef={blogsRef} />
					</section>

					<Sidebar
						blogs={filteredBlogs}
						categories={categories}
						future={true}
					/>
					{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
				</div>
			</section>
		</>
	);
}

export const getStaticProps = async () => {
	let blogs, categories, featuredItem;
	const getData = async () => {
		blogs = await getBlogs();
		categories = await getCategories();
		featuredItem = await getFeatured();
	};
	await getData();

	return {
		props: {
			blogs,
			categories,
			featuredItem,
		},
	};
};

export default withRouter(Home);
