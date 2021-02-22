import { useState, useEffect } from "react";
import {
	FaUser,
	FaCalendar,
	FaArrowRight,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";
import Pagination from "../components/Pagination";

const Blogs = ({ blogs, category, blogsRef }) => {
	const [blogItems, setBlogItems] = useState(blogs); // Set state to list of blogs.
	const [displayBlogs, setDisplayBlogs] = useState(blogs); // Blogs currently being displayed.

	useEffect(() => {
		if (!category) {
			setBlogItems(blogs);
			setDisplayBlogs(blogs);
		}
	}, [blogs]);

	useEffect(() => {
		if (category) {
			setDisplayBlogs(blogs.filter((blog) => blog.category === category));
			setBlogItems(blogs.filter((blog) => blog.category === category));
		}
	}, [category]);

	const handlePageChange = (paginatedBlogs) => {
		// Handing pagination page changes.
		setDisplayBlogs(paginatedBlogs);
	};

	const customLabels = {
		// Custom labels for pagination.
		previous: <FaChevronLeft />,
		next: <FaChevronRight />,
	};

	return (
		<>
			<div className="posts">
				<>
					{category ? "" : <h1>Blogs</h1>}
					{/* Conditionally render element. */}
					{displayBlogs.length > 0 ? (
						<>
							{displayBlogs.map((blog, key) => (
								<div
									className="post-content"
									data-aos="zoom-in"
									data-aos-delay="200"
									key={key}
								>
									<div className="post-image">
										<div>
											<Link href={`/blogs/${blog.url}`}>
												<a>
													<img src={blog.image} className="img" alt="shower" />
												</a>
											</Link>
										</div>
										<div className="post-info flex-row">
											<span>
												<i className="fas fa-user text-gray">
													<FaUser />
												</i>
												&nbsp;&nbsp;Me
											</span>
											<span>
												<i className="fas fa-calendar-alt text-gray">
													<FaCalendar />
												</i>
												&nbsp;&nbsp;
												<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
											</span>
										</div>
									</div>
									<div className="post-title">
										<Link href={`/blogs/${blog.url}`}>
											<a>
												{blog.title}
												{ReactHtmlParser(
													blog.content.slice(0, blog.content.indexOf("<br>")) +
														"</p>"
												)}{" "}
												{/* Parse first paragraph of HTML blog content. */}
												<button className="btn post-btn">
													Read More &nbsp;{" "}
													<i className="fas fa-arrow-right">
														<FaArrowRight />
													</i>
												</button>
											</a>
										</Link>
									</div>
									<hr
										className={`${key === blogs.length - 1 ? "is-hidden" : ""}`}
									></hr>
									{/* Conditionally render element */}
								</div>
							))}
							<div className="page-holder text-center">
								{/* Pagination element */}
								<Pagination
									items={blogItems}
									onChangePage={handlePageChange}
									pageSize={4}
									customLabels={customLabels}
									customRef={blogsRef}
								/>
							</div>
						</>
					) : (
						<h1>No blogs matching search</h1>
					)}
				</>
			</div>
		</>
	);
};

export default Blogs;

Blogs.defaultProps = {
	category: false,
	blogs: [],
};
