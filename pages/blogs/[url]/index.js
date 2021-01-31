import { useState } from "react";
import { server } from "../../../config";
import Sidebar from "../../../components/Sidebar";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import Disqus from "../../../components/Disqus";
import ReactHtmlParser from "react-html-parser";

const blog = ({ blog, blogs, categories }) => {
	const [name, setName] = useState(blog.url);

	const title = name; // Finding relevant blog.
	const currBlog = blog;
	const filteredBlogs = blogs // Getting list that doesn't include current blog nor future blogs for other blogs section.
		.filter((eachItem) => {
			return (
				!eachItem["url"].toLowerCase().includes(title.toLowerCase()) &&
				!eachItem["future"] === true
			);
		})
		.slice(0, 3);
	return (
		<div className="container" id="blogs">
			<div className="site-content">
				<div className="posts">
					<div className="post-content" data-aos="zoom-in" data-aos-delay="200">
						<div className="post-title">
							<h1>{currBlog.title}</h1>
							<h3>
								<i className="fas fa-user text-gray">
									<FaUser />
								</i>
								&nbsp;Me&nbsp;&nbsp;
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
								</i>
								&nbsp;<Moment format="MMM DD, YYYY">{currBlog.date}</Moment>
							</h3>
							<div className="post-image">
								<div>
									<img
										src={currBlog.image}
										className="img"
										alt={currBlog.alt}
									/>
								</div>
							</div>
						</div>
						<div className="blog-html">{ReactHtmlParser(currBlog.content)}</div>
						{/* Parsing HTML blog content */}
					</div>

					{/* <!---------------------------------  Disqus Comments Plugin  -------------------------------------- --> */}

					<Disqus
						title={currBlog.title}
						url={currBlog.disqusURL}
						identifier={currBlog.disqusIdentifier}
						src={currBlog.disqusSrc}
					/>

					{/* <!--------------X------------------  Disqus Comments Plugin  ------------------------X------------- --> */}
				</div>
				<Sidebar
					blogs={filteredBlogs}
					future={currBlog.future}
					categories={categories}
				/>
				{/* Sidebar section populated with links to other blogs. */}
			</div>
		</div>
	);
};

export default blog;

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/blogs/${context.params.url}`);
	const blog = await res.json();

	const res2 = await fetch(`${server}/api/blogs`);
	const blogs = await res2.json();

	const res3 = await fetch(`${server}/api/categories`);
	const categories = await res3.json();

	return {
		props: {
			blog,
			blogs,
			categories,
		},
	};
};

export const getStaticPaths = async () => {
	const res = await fetch(`${server}/api/blogs`);

	const blogs = await res.json();

	const urls = blogs.map((blog) => blog.url);
	const paths = urls.map((url) => ({ params: { url: url.toString() } }));

	return {
		paths,
		fallback: false,
	};
};
