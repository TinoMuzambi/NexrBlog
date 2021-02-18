import { useState, useEffect } from "react";
import StoryblokClient from "storyblok-js-client";
import AOS from "aos";

import About from "../components/About";
import Featured from "../components/Featured";

export default function Home({ featuredItem }) {
	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	return (
		<>
			<section className="about">
				<About /> {/* About section */}
			</section>
			<section className="featured">
				<Featured item={featuredItem} /> {/* Featured section */}
			</section>
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

export const getStaticProps = async () => {
	const featuredItem = await getFeatured();

	return {
		props: {
			featuredItem,
		},
	};
};
