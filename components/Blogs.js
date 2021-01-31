import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import JwPagination from "jw-react-pagination";
import { useRouter } from "next/router";
import Blog from "./Blog";

const Blogs = ({ blogs, category, search, fromCategory, searchTerm }) => {
	const [blogItems] = useState(blogs); // Set state to list of blogs.
	const [displayBlogs, setDisplayBlogs] = useState([]); // Blogs currently being displayed.
	const router = useRouter();
	const [queryText] = useState(searchTerm);

	useEffect(() => {
		if (router.pathname !== "/" || search) {
			setDisplayBlogs(blogs); // Ensure blog content changes when url changes.
		}
	}, [router.pathname, blogs, search]);

	const handlePageChange = (displayBlogs) => {
		// Handing pagination page changes.
		setDisplayBlogs(displayBlogs);
	};

	const customLabels = {
		// Custom labels for pagination.
		previous: <FaChevronLeft />,
		next: <FaChevronRight />,
	};

	const filteredBlogs = blogs // Getting list that doesn't include current category for other blogs section.
		.filter((eachItem) => {
			return eachItem["category"].toLowerCase().includes(category.url);
		})
		.filter((eachItem) => {
			return !eachItem["future"] === true;
		});

	let homeBlogs = blogs.filter((eachItem) => {
		// Only get published blogs for main content.
		return eachItem["future"] === false;
	});

	homeBlogs = homeBlogs.filter((eachItem) => {
		// Only display blogs matching search.
		return (
			eachItem["title"] // Search in title.
				.toLowerCase()
				.includes(queryText.toLowerCase()) ||
			eachItem["category"] // Search in category.
				.toLowerCase()
				.includes(queryText.toLowerCase()) ||
			eachItem["content"] // Search in content.
				.toLowerCase()
				.includes(queryText.toLowerCase())
		);
	});

	fromCategory ? setDisplayBlogs(filteredBlogs) : setDisplayBlogs(homeBlogs);

	return (
		<div className="posts">
			{!category && <h1>Blogs</h1>}
			{/* Conditionally render element. */}
			{/* Only render component if there are blogs to show for category */}
			{displayBlogs ? (
				<>
					{displayBlogs.map((blog, key) => (
						<Blog blog={blog} />
					))}
					<div
						className="page-holder text-center"
						onClick={() =>
							document
								.querySelector(".blogs")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						{/* Pagination element */}
						<JwPagination
							items={blogItems}
							onChangePage={handlePageChange}
							pageSize={4}
							labels={customLabels}
						/>
					</div>
				</>
			) : (
				<h2>Nothing here yet...</h2>
			)}
		</div>
	);
};

export default Blogs;

Blogs.defaultProps = {
	category: false,
	blogs: [],
	search: false,
	fromCategory: false,
	searchTerm: "",
};

export const getStaticProps = async () => {
	const res = await fetch(`${server}/api/blogs`);
	const blogs = await res.json();

	return {
		props: {
			blogs,
		},
	};
};
