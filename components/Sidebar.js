import { useContext } from "react";
import Categories from "./Categories";
import SideBlog from "./SideBlog";
import { GlobalContext } from "../context/GlobalState";

const Sidebar = ({ future, side, category, url, home }) => {
	const { blogs } = useContext(GlobalContext);
	const { categories } = useContext(GlobalContext);

	const filteredBlogs = blogs // Getting list that doesn't include current blog nor future blogs for other blogs section.
		.filter((eachItem) => {
			return !eachItem.url.includes(url) && eachItem.future === future;
		})
		.slice(0, 3);

	const sideBlogs = blogs // Getting list that doesn't include current blog for sidebar section.
		.filter((eachItem) => {
			return (
				!eachItem.category.toLowerCase().includes(category.url) &&
				eachItem.future === future
			);
		})

		.slice(0, 3);

	return (
		<aside className="sidebar">
			<div className="category">
				<Categories categories={categories} /> {/* Categories section. */}
			</div>
			<div className="other-posts">
				<SideBlog
					side={side}
					blogs={side ? sideBlogs : filteredBlogs}
					future={future}
					home={home}
				/>{" "}
				{/* Sidebar section. */}
			</div>
		</aside>
	);
};

export default Sidebar;

Sidebar.defaultProps = {
	blogs: [],
	future: false,
	categories: [],
	side: false,
	url: "",
	category: "",
	home: true,
};
