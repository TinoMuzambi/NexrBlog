import StoryblokClient from "storyblok-js-client";
import { useRouter } from "next/router";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

import Preload from "../../components/Preload";
import Disqus from "../../components/Disqus";
import Meta from "../../components/Meta";

const Blog = ({ blog }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Preload />;
	}

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
				</div>
			</div>
		</>
	);
};

export const getStaticProps = async ({ params }) => {
	const query = params.url.split("_").join("-");
	const blog = await getBlog(query);
	return {
		props: { blog },
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default Blog;
