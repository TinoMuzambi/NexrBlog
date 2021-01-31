import React from "react";
import { server } from "../../../config";

const blog = ({ blog }) => {
	return (
		<div>
			<h1>{blog.title}</h1>
		</div>
	);
};

export default blog;

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/blogs/${context.params.url}`);

	const blog = await res.json();

	return {
		props: {
			blog,
		},
	};
};

export const getStaticPaths = async () => {
	const res = await fetch(`${server}/api/blogs`);

	const blogs = await res.json();

	const urls = blogs.map((blog) => blog.url);
	const paths = urls.map((url) => ({ params: { url: url.toString() } }));

	return {
		paths,
		fallback: false,
	};
};
