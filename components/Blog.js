import { useContext } from "react";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";
import ReactHtmlParser from "react-html-parser";

const Blog = ({ blog, key, side, home }) => {
	const { blogs } = useContext(GlobalContext);

	return (
		<div className="post-content" data-aos="zoom-in" data-aos-delay="200">
			<div className="post-image">
				<div>
					{!side ? (
						<Link href={`/blogs/${blog.url}`}>
							<a>
								<img src={blog.image} className="img" alt={blog.title} />
							</a>
						</Link>
					) : home ? (
						<img src={blog.image} className="img" alt={blog.title} />
					) : (
						<Link href={`/blogs/${blog.url}`}>
							<a>
								<img src={blog.image} className="img" alt={blog.title} />
							</a>
						</Link>
					)}
				</div>
				<div className="post-info flex-row">
					{!side && (
						<span>
							<i className="fas fa-user text-gray">
								<FaUser />
							</i>
							&nbsp;&nbsp;Me
						</span>
					)}
					<span>
						{!side ? (
							<>
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
								</i>
								&nbsp;&nbsp;
								<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
							</>
						) : home ? (
							<>
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
									&nbsp;&nbsp;TBA
								</i>
							</>
						) : (
							<>
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
								</i>
								&nbsp;&nbsp;
								<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
							</>
						)}
					</span>
				</div>
			</div>
			<div className="post-title">
				{side ? (
					home ? (
						<a>{blog.title}</a>
					) : (
						<Link href={`/blogs/${blog.url}`}>
							<a>
								<a>{blog.title}</a>
							</a>
						</Link>
					)
				) : (
					<Link href={`/blogs/${blog.url}`}>
						<a>
							<a>{blog.title}</a>
							{ReactHtmlParser(
								blog.content.slice(0, blog.content.indexOf("<br>")) + "</p>"
							)}
							{/* Parse first paragraph of HTML blog content. */}
							<button className="btn post-btn">
								Read More &nbsp;{" "}
								<i className="fas fa-arrow-right">
									<FaArrowRight />
								</i>
							</button>
						</a>
					</Link>
				)}
			</div>
			{!side && (
				<hr className={`${key === blogs.length - 1 ? "is-hidden" : ""}`}></hr>
			)}
			{/* Conditionally render element */}
		</div>
	);
};

export default Blog;

Blog.defaultProps = {
	blog: {},
	side: false,
	key: 0,
};
