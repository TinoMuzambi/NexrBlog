import Blogs from "../../../components/Blogs";
import { server } from "../../../config";
import Meta from "../../../components/Meta";
import Sidebar from "../../../components/Sidebar";

const category = ({ category, blogs }) => {
	const filteredBlogs = blogs // Getting list that doesn't include current category for other blogs section.
		.filter((eachItem) => {
			return eachItem["category"].toLowerCase().includes(category.url);
		})
		.filter((eachItem) => {
			return !eachItem["future"] === true;
		});

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
						{/* Only render component if there are blogs to show for category */}
						{filteredBlogs.length > 0 ? (
							<Blogs blogs={filteredBlogs} category={true} search={false} />
						) : (
							<h2>Nothing here yet...</h2>
						)}
					</div>
					<Sidebar side={true} future={false} />
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

export default category;

category.defaultProps = {
	category: {},
	blogs: [],
	categories: [],
};

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/categories/${context.params.url}/`);
	const category = await res.json();

	const res2 = await fetch(`${server}/api/blogs`);
	const blogs = await res2.json();

	return {
		props: {
			category,
			blogs,
		},
	};
};

export const getStaticPaths = async () => {
	const res = await fetch(`${server}/api/categories`);

	const categories = await res.json();

	const urls = categories.map((category) => category.url);
	const paths = urls.map((url) => ({ params: { url: url.toString() } }));

	return {
		paths,
		fallback: false,
	};
};
