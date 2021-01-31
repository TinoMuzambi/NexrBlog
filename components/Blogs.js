import { useState, useEffect, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import JwPagination from "jw-react-pagination";
import { useRouter } from "next/router";
import Blog from "./Blog";
import { GlobalContext } from "../context/GlobalState";

const Blogs = ({ category, search, fromCategory, searchTerm }) => {
	const { blogs } = useContext(GlobalContext);
	const [blogItems] = useState(blogs); // Set state to list of blogs.
	let displayBlogs = []; // Blogs currently being displayed.
	const router = useRouter();
	const [queryText, setQueryText] = useState(searchTerm);

	useEffect(() => {
		if (router.pathname !== "/" || search) {
			displayBlogs = blogs; // Ensure blog content changes when url changes.
		}
	}, [router.pathname, blogs, search]);

	useEffect(() => {
		displayBlogs = blogs;
	}, []);

	useEffect(() => {
		setQueryText(searchTerm);
	}, [searchTerm]);

	const handlePageChange = (newDisplayBlogs) => {
		// Handing pagination page changes.
		displayBlogs = newDisplayBlogs;
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

	displayBlogs = fromCategory ? filteredBlogs : homeBlogs;

	return (
		<div className="posts">
			{!category && <h1>Blogs</h1>}
			{/* Conditionally render element. */}
			{/* Only render component if there are blogs to show for category */}
			{displayBlogs ? (
				<>
					{displayBlogs.map((blog, key) => (
						<Blog blog={blog} key={key} />
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
