import { useRef, useState, useEffect } from "react";
import { server } from "../config";
import Blogs from "./blogs";
import Sidebar from "../components/Sidebar";
import About from "../components/About";
import AOS from "aos";
import { useRouter } from "next/router";

export default function Home({ blogs, categories }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);

	const about = useRef(null);
	const featured = useRef(null);
	const blogsRef = useRef(null);
	const footer = useRef(null);
	const router = useRouter();

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.

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

	useEffect(() => {
		const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
		nav.classList.remove("collapse");
		nav.classList.remove("collapse-sm");
	}, [router.pathname]);

	const filteredBlogs = blogs.filter((eachItem) => {
		// Only get future blogs for sidebar.
		return eachItem["future"] === true;
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

	return (
		<>
			<section className="about" ref={about}>
				<About /> {/* About section */}
			</section>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs" ref={blogsRef}>
						<Blogs
							blogs={homeBlogs}
							category={false}
							blogsRef={blogsRef}
							search={searching}
						/>
					</section>

					<Sidebar
						blogs={filteredBlogs}
						future={true}
						categories={categories}
					/>
					{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
				</div>
			</section>
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(`${server}/api/blogs`);
	const blogs = await res.json();

	const res2 = await fetch(`${server}/api/categories`);
	const categories = await res2.json();

	return {
		props: {
			blogs,
			categories,
		},
	};
};
