import { useState, useEffect } from "react";
import StoryblokClient from "storyblok-js-client";
import AOS from "aos";

import About from "../components/About";
import Featured from "../components/Featured";
import Search from "../components/Search";
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
		</>
	);
}

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

const getBlogs = () => {
	let blogs = [];

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	Storyblok.get("cdn/stories?starts_with=blogs/", {
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
			console.log(error);
		});
	return blogs;
};
const getCategories = () => {
	let categories = [];

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	Storyblok.get("cdn/stories?starts_with=categories/", {})
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
			console.log(error);
		});

	return categories;
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
