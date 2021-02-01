import { FaCalendar } from "react-icons/fa";
import Link from "next/link";
import Blog from "./Blog";
import Moment from "react-moment";

const SideBlog = ({ blogs, future, page }) => {
	return (
		<>
			<h2>{future ? "Future" : "Other"} Blogs</h2>
			{/* Either show future or other. */}
			{blogs.map((blog, key) => (
				<Blog blog={blog} key={key} page={page} />
			))}
		</>
	);
};

export default SideBlog;

SideBlog.defaultProps = {
	blogs: [],
	future: false,
	page: "home",
};
