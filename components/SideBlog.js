import { FaCalendar } from "react-icons/fa";
import Link from "next/link";
import Blog from "./Blog";
import Moment from "react-moment";

const SideBlog = ({ blogs, future, home, side }) => {
	return (
		<>
			<h2>{future ? "Future" : "Other"} Blogs</h2>
			{/* Either show future or other. */}
			{blogs.map((blog, key) => (
				<Blog blog={blog} key={key} side={side} home={home} />
			))}
		</>
	);
};

export default SideBlog;

SideBlog.defaultProps = {
	blogs: [],
	future: false,
	side: true,
	home: false,
};
