import { useState, useEffect } from "react";
import StoryblokClient from "storyblok-js-client";
import AOS from "aos";

import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
import Blogs from "../components/Blogs";
import Sidebar from "../components/Sidebar";

import { titleCase } from "../utils/helpers";

export default function Home({ blogs, categories, featuredItem }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

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

const getBlogs = async () => {
	let blogs = [];

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	await Storyblok.get("cdn/stories?starts_with=blogs/", {
		sort_by: "content.date:desc",
	})
		.then((response) => {
			const strictlyBlogs = response.data.stories;
			const prettyBlogs = strictlyBlogs.map((blog) => ({
				category: titleCase(blog.content.category.cached_url.substring(11)),
				content: blog.content.content,
				date: blog.content.date,
				disqusIdentifier: blog.content.disqusIdentifier,
				disqusShortname: blog.content.disqusShortname,
				disqusSrc: blog.content.disqusSrc,
				disqusURL: blog.content.disqusURL,
				future: blog.content.future,
				image: blog.content.media.filename,
				alt: blog.content.media.alt,
				readTime: blog.content.readTime,
				title: blog.content.title,
				url: blog.content.url,
				id: blog.content._uid,
			}));
			blogs = prettyBlogs;
		})
		.catch((error) => {
			console.error(error);
		});
	return blogs;
};
const getCategories = async () => {
	let categories = [];

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	await Storyblok.get("cdn/stories?starts_with=categories/", {})
		.then((response) => {
			const strictlyCats = response.data.stories;
			const prettyCats = strictlyCats.map((cat) => ({
				count: cat.content.count,
				alt: cat.content.image.alt,
				image: cat.content.image.filename,
				name: cat.content.name,
				url: cat.content.url,
				id: cat.content._uid,
			}));
			categories = prettyCats;
		})
		.catch((error) => {
			console.error(error);
		});

	return categories;
};

const getFeatured = async () => {
	let featured = {};

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	await Storyblok.get("cdn/stories/featured-item/", {})
		.then((response) => {
			const strictlyFeat = response.data.story.content;
			const prettyFeat = {
				date: strictlyFeat.date,
				description: strictlyFeat.description,
				title: strictlyFeat.title,
				url: strictlyFeat.url,
			};
			featured = prettyFeat;
		})
		.catch((error) => {
			console.error(error);
		});

	return featured;
};

export const getStaticProps = async () => {
	const blogs = await getBlogs();
	const categories = await getCategories();
	const featuredItem = await getFeatured();

	return {
		props: {
			blogs,
			categories,
			featuredItem,
		},
	};
};
