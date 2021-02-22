import StoryblokClient from "storyblok-js-client";

import { titleCase } from "./helpers";

// const BASE_URL = "https://api.storyblok.com/v1/cdn";
const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});
let version;
const getSpaceVersion = async () => {
	await Storyblok.get("cdn/spaces/me")
		.then((response) => {
			version = response.data.space.version;
		})
		.catch((error) => console.error(error));
};

export const getBlogs = async () => {
	await getSpaceVersion();
	let prettyBlogs = [];

	await Storyblok.get("cdn/stories?starts_with=blogs/", {
		sort_by: "content.date:desc",
		cv: version,
	})
		.then((response) => {
			const strictlyBlogs = response.data.stories;
			prettyBlogs = strictlyBlogs.map((blog) => ({
				category: titleCase(blog.content.category.cached_url.substring(11)),
				content: blog.content.content || null,
				date: blog.content.date || null,
				disqusIdentifier: blog.content.disqusIdentifier || null,
				disqusShortname: blog.content.disqusShortname || null,
				disqusSrc: blog.content.disqusSrc || null,
				disqusURL: blog.content.disqusURL || null,
				future: blog.content.future,
				image: blog.content.media.filename,
				alt: blog.content.media.alt,
				readTime: blog.content.readTime || null,
				title: blog.content.title,
				url: blog.content.url || null,
				id: blog.content._uid,
			}));
		})
		.catch((error) => {
			console.error(error);
		});

	return prettyBlogs;
};
export const getCategories = async () => {
	await getSpaceVersion();
	let prettyCats = [];

	await Storyblok.get("cdn/stories?starts_with=categories/", { cv: version })
		.then((response) => {
			const strictlyCats = response.data.stories;
			prettyCats = strictlyCats.map((cat) => ({
				count: cat.content.count,
				alt: cat.content.image.alt,
				image: cat.content.image.filename,
				name: cat.content.name,
				url: cat.content.url,
				id: cat.content._uid,
			}));
		})
		.catch((error) => {
			console.err0r(error);
		});

	return prettyCats;
};
export const getFeatured = async () => {
	await getSpaceVersion();
	let prettyFeat = {};

	await Storyblok.get("cdn/stories/featured-item/", { cv: version })
		.then((response) => {
			const strictlyFeat = response.data.story.content;
			prettyFeat = {
				date: strictlyFeat.date,
				description: strictlyFeat.description,
				title: strictlyFeat.title,
				url: strictlyFeat.url,
			};
		})
		.catch((error) => {
			console.error(error);
		});

	return prettyFeat;
};

export const getCategory = async (query) => {
	let category = {};
	await getSpaceVersion();

	await Storyblok.get(`cdn/stories/categories/${query}`, { cv: version })
		.then((response) => {
			const strictlyCat = response.data.story.content;
			const prettyCats = {
				count: strictlyCat.count,
				alt: strictlyCat.image.alt,
				image: strictlyCat.image.filename,
				name: strictlyCat.name,
				url: strictlyCat.url,
				id: strictlyCat._uid,
			};
			category = prettyCats;
		})
		.catch((error) => {
			console.error(error);
		});

	return category;
};

export const getBlog = async (query) => {
	let blog = {};

	await Storyblok.get(`cdn/stories/blogs/${query}`, {})
		.then((response) => {
			const strictlyBlog = response.data.story.content;
			const prettyBlogs = {
				category: titleCase(strictlyBlog.category.cached_url.substring(11)),
				content: strictlyBlog.content,
				date: strictlyBlog.date,
				disqusIdentifier: strictlyBlog.disqusIdentifier,
				disqusShortname: strictlyBlog.disqusShortname,
				disqusSrc: strictlyBlog.disqusSrc,
				disqusURL: strictlyBlog.disqusURL,
				future: strictlyBlog.future,
				image: strictlyBlog.media.filename,
				alt: strictlyBlog.media.alt,
				readTime: strictlyBlog.readTime,
				title: strictlyBlog.title,
				url: strictlyBlog.url,
				id: strictlyBlog._uid,
			};
			blog = prettyBlogs;
		})
		.catch((error) => {
			console.error(error);
		});

	return blog;
};
