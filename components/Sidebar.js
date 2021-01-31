import Categories from "./Categories";
import SideBlog from "./SideBlog";

const Sidebar = ({ blogs, future, categories }) => (
	<aside className="sidebar">
		<div className="category">
			<Categories categories={categories} /> {/* Categories section. */}
		</div>
		<div className="other-posts">
			<SideBlog blogs={blogs} future={future} /> {/* Sidebar section. */}
		</div>
	</aside>
);

export default Sidebar;
