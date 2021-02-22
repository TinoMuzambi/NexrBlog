import { useEffect } from "react";
import { useRouter } from "next/router";

import Blogs from "../../components/Blogs";
import Meta from "../../components/Meta";
import Sidebar from "../../components/Sidebar";
import Preload from "../../components/Preload";
import { getBlogs, getCategory, getCategories } from "../../utils/fetch";

const Category = ({ category, blogs, categories }) => {
	const router = useRouter();

	useEffect(() => {
		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.
		const timeoutID = setTimeout(function () {
			preload.classList.add("finish");
			clearTimeout(timeoutID);
		}, 7000);

		window.addEventListener("load", () => {
			// Get rid of preloader once everything's loaded
			preload.classList.add("finish");
		});

		return () => {
			window.removeEventListener("load", () => {
				// Get rid of preloader once everything's loaded
				preload.classList.add("finish");
			});
		};
	}, []);

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

						<Blogs
							blogs={blogs.filter((blog) => blog.future !== true)}
							category={category.name}
						/>
					</div>
					<Sidebar
						category={category.name}
						future={false}
						categories={categories}
						blogs={blogs}
					/>
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

Category.defaultProps = {
	category: {},
};

export const getStaticProps = async ({ params }) => {
	const category = await getCategory(params.name);
	const blogs = await getBlogs();
	const categories = await getCategories();

	return {
		props: {
			blogs,
			category,
			categories,
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
