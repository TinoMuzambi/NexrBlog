import { server } from "../config";
import Blogs from "./blogs";

export default function Home({ blogs }) {
	return (
		<>
			<Blogs blogs={blogs} />
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(`${server}/api/blogs`);
	const blogs = await res.json();

	return {
		props: {
			blogs,
		},
	};
};
