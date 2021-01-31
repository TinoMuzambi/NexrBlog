import { server } from "../../../config";
import Sidebar from "../../../components/Sidebar";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import Disqus from "../../../components/Disqus";
import ReactHtmlParser from "react-html-parser";
import Meta from "../../../components/Meta";

const blog = ({ blog }) => {
	return (
		<>
			<Meta
				title={`${blog.title} | Blog.TinoMuzambi`}
				description={ReactHtmlParser(
					blog.content.slice(0, blog.content.indexOf("<br>")) + "</p>"
				)}
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
						side={true}
						future={blog.future}
						title={blog.title}
						category={blog.category}
					/>
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

export default blog;

blog.defaultProps = {
	blog: {},
	blogs: [],
	categories: [],
};

export const getStaticProps = async (context) => {
	const res = await fetch(`${server}/api/blogs/${context.params.url}`);
	const blog = await res.json();

	return {
		props: {
			blog,
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
