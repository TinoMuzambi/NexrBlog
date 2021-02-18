import StoryblokClient from "storyblok-js-client";
import { useRouter } from "next/router";

import { titleCase } from "../../utils/helpers";

const Blog = ({ blog }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <h1>Loading...</h1>;
	}
	return (
		<div>
			<h1>{blog.title}</h1>
		</div>
	);
};

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});
const getBlog = async () => {
	let blog = {};
	await Storyblok.get("cdn/stories/blogs/phone-or-laptop", {})
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

export const getStaticProps = async ({ params }) => {
	const blog = await getBlog();
	return {
		props: { blog },
	};
};

export const getStaticPaths = () => {
	// paths -> slugs which are allowed
	// fallback ->
	return {
		paths: [],
		fallback: true,
	};
};

export default Blog;
