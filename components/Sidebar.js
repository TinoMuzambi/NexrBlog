import React from "react";
import Categories from "../components/Categories";
import SideBlog from "./SideBlog";

const Sidebar = ({ blogs, future }) => (
	<>
		<aside className="sidebar">
			<div className="category">
				<Categories /> {/* Categories section. */}
			</div>
			<div className="other-posts">
				<SideBlog blogs={blogs} future={future} /> {/* Sidebar section. */}
			</div>
		</aside>
	</>
);

export default Sidebar;
