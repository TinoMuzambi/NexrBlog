import Blogs from "../../../components/Blogs";
import { server } from "../../../config";
import Meta from "../../../components/Meta";
import Sidebar from "../../../components/Sidebar";

const category = ({ category }) => {
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

						<Blogs category={category} search={false} fromCategory={true} />
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
};

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/categories/${context.params.url}/`);
	const category = await res.json();

	return {
		props: {
			category,
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
