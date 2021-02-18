import StoryblokClient from "storyblok-js-client";
import { useRouter } from "next/router";

import Blogs from "../../components/Blogs";
import Meta from "../../components/Meta";
// import Sidebar from "../../components/Sidebar";
import Preload from "../../components/Preload";

const Category = ({ category }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Preload />;
	}

	return (
		<>
			<Meta
				title={`${category.name} | Blog.TinoMuzambi`}
				description={category.name}
				url={`https://blog.tinomuzambi.com/${category.url}`}
			/>
			<div className="container">
				<div className="site-content">
					<div className="posts">
						<h1>{category.name}</h1>

						<Blogs blogs={[]} category={category.name} />
					</div>
					{/* <Sidebar future={false} category={category} page="categories" /> */}
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

Category.defaultProps = {
	category: {},
};

const getCategory = async (query) => {
	let category = {};

	const Storyblok = new StoryblokClient({
		accessToken: process.env.REACT_APP_STORYBLOK_KEY,
		cache: {
			clear: "auto",
			type: "memory",
		},
	});
	await Storyblok.get(`cdn/stories/categories/${query}`, {})
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

export const getStaticProps = async ({ params }) => {
	const category = await getCategory(params.name);

	return {
		props: {
			category,
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default Category;
