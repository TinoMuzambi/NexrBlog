import { server } from "../config";

export default function Home() {
	return "";
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
