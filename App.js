import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Featured from "./components/Featured";
import Blogs from "./pages/Blogs";
import Sidebar from "./components/Sidebar";
import Preload from "./pages/Preload";
import NotFoundPage from "./pages/NotFoundPage";
import Search from "./components/Search";
import blogs from "./data/blogs";
import { AiOutlineReload } from "react-icons/ai";
import "./css/App.min.css";
import AOS from "aos";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const App = () => {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);

	const about = useRef(null);
	const featured = useRef(null);
	const blogsRef = useRef(null);
	const footer = useRef(null);
	const location = useLocation();

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
	}, [location.pathname]);

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
	const Blog = lazy(() => import("./pages/Blog"));
	const Category = lazy(() => import("./pages/Category"));
	const Footer = lazy(() => import("./components/Footer"));
	return (
		<>
			<ScrollToTop /> {/* Scroll to top on page load. */}
			<Preload /> {/* Preloader for showing before page loads. */}
			<Navbar
				about={about}
				featured={featured}
				blogsRef={blogsRef}
				footer={footer}
			/>
			{/* Navbar - gets ref to this for scrolling to anchors. */}
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => (
						<div>
							<Helmet>
								<title>Blog.TinoMuzambi</title>
								<meta name="description" content="Blog.TinoMuzambi" />

								{/* <!-- Google / Search Engine Tags --> */}
								<meta itemprop="name" content="Blog.TinoMuzambi" />
								<meta itemprop="description" content="Blog.TinoMuzambi" />
								<meta itemprop="image" content="/logo512.png" />

								{/* <!-- Facebook Meta Tags --> */}
								<meta
									property="og:url"
									content="https://blog.tinomuzambi.com"
								/>
								<meta property="og:type" content="website" />
								<meta property="og:title" content="Blog.TinoMuzambi" />
								<meta property="og:description" content="Blog.TinoMuzambi" />
								<meta property="og:image" content="/logo512.png" />

								{/* <!-- Twitter Meta Tags --> */}
								<meta name="twitter:card" content="summary_large_image" />
								<meta name="twitter:title" content="Blog.TinoMuzambi" />
								<meta name="twitter:description" content="Blog.TinoMuzambi" />
								<meta name="twitter:image" content="/logo512.png" />
							</Helmet>
							<section className="about" ref={about}>
								<About /> {/* About section */}
							</section>
							<section className="featured" ref={featured}>
								<Featured /> {/* Featured section */}
							</section>
							<div className="search-wrapper">
								<Search searchBlogs={searchBlogs} /> {/* Search box */}
							</div>
							<section className="container" id="blogs">
								<div className="site-content">
									<section className="blogs" ref={blogsRef}>
										<Blogs
											blogs={homeBlogs}
											category={false}
											blogsRef={blogsRef}
											search={searching}
										/>
										{/* Blogs section - pass list of blogs, false for category
												and ref to this for scrolling to anchors */}
									</section>
									<Sidebar blogs={filteredBlogs} future={true} />
									{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
								</div>
							</section>
						</div>
					)}
				/>
				{/* Lazy loading components that don't need to be rendered immediately. */}
				<Suspense
					fallback={
						<div className="icon-wrapper">
							<AiOutlineReload className="icon" />
						</div>
					}
				>
					<Route path="/blogs/:name" component={Blog} />
					{/* Blog route for displaying blog content. */}
					<Route path="/categories/:name" component={Category} />
					{/* Category route for displaying per category blogs. */}
				</Suspense>
				<Route component={NotFoundPage} />
			</Switch>
			<Suspense
				fallback={
					<div className="icon-wrapper">
						<AiOutlineReload className="icon" />
					</div>
				}
			>
				<section className="footer" ref={footer}>
					<Footer /> {/* Footer section */}
				</section>
			</Suspense>
		</>
	);
};

export default App;
