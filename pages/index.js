import { useState, useEffect } from "react";
import AOS from "aos";

import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
import Blogs from "../components/Blogs";
import Sidebar from "../components/Sidebar";
import Preload from "../components/Preload";
import { getBlogs, getCategories, getFeatured } from "../utils/fetch";

export default function Home({ blogs, categories, featuredItem }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);
	// const [fetching, setFetching] = useState(true);

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

	if (!blogs) return <Preload />;

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
				<Search searchBlogs={searchBlogs} /> {/* Search box */}
			</div>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs">
						<Blogs blogs={homeBlogs} category={false} />
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
