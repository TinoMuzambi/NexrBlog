import { useEffect } from "react";
import { useRouter } from "next/router";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

import Preload from "../../components/Preload";
import Disqus from "../../components/Disqus";
import Meta from "../../components/Meta";
import Sidebar from "../../components/Sidebar";
import { getBlog, getBlogs, getCategories } from "../../utils/fetch";

const Blog = ({ blog, categories, blogs }) => {
	const router = useRouter();

	useEffect(() => {
		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.
		const timeoutID = setTimeout(function () {
			preload.classList.add("finish");
			clearTimeout(timeoutID);
		}, 7000);

		window.addEventListener("load", () => {
			// Get rid of preloader once everything's loaded
			preload.classList.add("finish");
		});

		return () => {
			window.removeEventListener("load", () => {
				// Get rid of preloader once everything's loaded
				preload.classList.add("finish");
			});
		};
	}, []);

	if (router.isFallback) {
		return <Preload />;
	}

	return (
		<>
			<Meta
				title={`${blog.title} | Blog.TinoMuzambi`}
				description={blog.content
					.slice(blog.content.indexOf(">") + 1, blog.content.indexOf("<br>"))
					.trim()}
				image={blog.image}
				url={`https://blog.tinomuzambi.com/${blog.url}`}
			/>
			<div className="container" id="blogs">
				<div className="site-content">
					<div className="posts">
						<div
							className="post-content"
							data-aos="zoom-in"
							data-aos-delay="200"
						>
							<div className="post-title">
								<h1>{blog.title}</h1>
								<h3>
									<i className="fas fa-user text-gray">
										<FaUser />
									</i>
									&nbsp;Me&nbsp;&nbsp;
									<i className="fas fa-calendar-alt text-gray">
										<FaCalendar />
									</i>
									&nbsp;<Moment format="MMM DD, YYYY">{blog.date}</Moment>
								</h3>
								<div className="post-image">
									<div>
										<img src={blog.image} className="img" alt={blog.alt} />
									</div>
								</div>
							</div>
							<div className="blog-html">{ReactHtmlParser(blog.content)}</div>
							{/* Parsing HTML blog content */}
						</div>

						{/* <!---------------------------------  Disqus Comments Plugin  -------------------------------------- --> */}

						<Disqus
							title={blog.title}
							url={blog.disqusURL}
							identifier={blog.disqusIdentifier}
							src={blog.disqusSrc}
						/>

						{/* <!--------------X------------------  Disqus Comments Plugin  ------------------------X------------- --> */}
					</div>
					<Sidebar
						categories={categories}
						blogs={blogs
							.filter(
								(currBlog) =>
									currBlog.title !== blog.title && currBlog.future === false
							)
							.slice(0, 3)}
						future={blog.future}
					/>
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

export const getStaticProps = async ({ params }) => {
	const query = params.url.split("_").join("-");
	const blog = await getBlog(query);
	const blogs = await getBlogs();
	const categories = await getCategories();

	return {
		props: {
			blog,
			blogs,
			categories,
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default Blog;
