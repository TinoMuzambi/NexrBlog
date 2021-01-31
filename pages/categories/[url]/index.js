import React from "react";

const category = ({ categories, blogs }) => {
	return (
		<div className="container" ref={ref}>
			<div className="site-content">
				<div className="posts">
					<h1>{category.name}</h1>
					{/* Only render component if there are blogs to show for category */}
					{filteredBlogs.length > 0 ? (
						<Blogs blogs={filteredBlogs} category={true} root={ref} />
					) : (
						<h2>Nothing here yet...</h2>
					)}
				</div>
				<Sidebar blogs={sideBlogs} future={false} />
				{/* Sidebar section populated with links to other blogs. */}
			</div>
		</div>
	);
};

export default category;

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/categories/${context.params.url}/`);
	const categories = await res.json();

	return {
		props: {
			categories,
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
