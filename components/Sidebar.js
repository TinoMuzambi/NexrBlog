import Categories from "../components/Categories";
import SideBlog from "./SideBlog";

const Sidebar = ({ category, blogs, future, categories }) => {
	let filteredBlogs = blogs;

	if (category) {
		filteredBlogs = blogs
			.filter((blog) => blog.category !== category)
			.slice(0, 3);
	}

	return (
		<>
			<aside className="sidebar">
				<div className="category">
					<Categories categories={categories} /> {/* Categories section. */}
				</div>
				<div className="other-posts">
					<SideBlog blogs={filteredBlogs} future={future} />
					{/* Sidebar section. */}
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
