import StoryblokClient from "storyblok-js-client";
import { useRouter } from "next/router";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

import { titleCase } from "../../utils/helpers";
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

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});
const getBlog = async (query) => {
	let blog = {};
	await Storyblok.get(`cdn/stories/blogs/${query}`, {})
		.then((response) => {
			const strictlyBlog = response.data.story.content;
			const prettyBlogs = {
				category: titleCase(strictlyBlog.category.cached_url.substring(11)),
				content: strictlyBlog.content,
				date: strictlyBlog.date,
				disqusIdentifier: strictlyBlog.disqusIdentifier,
				disqusShortname: strictlyBlog.disqusShortname,
				disqusSrc: strictlyBlog.disqusSrc,
				disqusURL: strictlyBlog.disqusURL,
				future: strictlyBlog.future,
				image: strictlyBlog.media.filename,
				alt: strictlyBlog.media.alt,
				readTime: strictlyBlog.readTime,
				title: strictlyBlog.title,
				url: strictlyBlog.url,
				id: strictlyBlog._uid,
			};
			blog = prettyBlogs;
		})
		.catch((error) => {
			console.error(error);
		});

	return blog;
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
