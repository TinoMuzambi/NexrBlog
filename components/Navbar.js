import React from "react";
import { Link, useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./SocialIcons";

const Navbar = ({ about, featured, blogsRef, footer }) => {
	const location = useLocation();

	const toggleCollapse = () => {
		// Toggle collapse class on navbar.
		const nav = document.querySelector(".nav");
		location.pathname === "/"
			? nav.classList.toggle("collapse")
			: nav.classList.toggle("collapse-sm");
	};

	return (
		<>
			<nav className="nav" id="nav">
				<div className="nav-menu">
					<div className="nav-brand">
						<Link to="/" className="text-gray">
							Blog.TinoMuzambi
						</Link>
					</div>
					<div className="toggle-collapse">
						<div className="toggle-icons">
							<span className="fas fa-bars" onClick={toggleCollapse}>
								<FaBars />
							</span>
						</div>
					</div>
					<ul className="nav-items">
						{/* Either scroll or go home depending on location. */}
						{location.pathname === "/" ? (
							<li
								className="nav-link"
								onClick={() =>
									about.current.scrollIntoView({ behavior: "smooth" })
								}
							>
								Home
							</li>
						) : (
							<Link to="/">
								<li className="nav-link">Home</li>
							</Link>
						)}
						{/* Conditionally render element based on location */}
						{location.pathname === "/" ? (
							<li
								className="nav-link"
								onClick={() =>
									featured.current.scrollIntoView({ behavior: "smooth" })
								}
							>
								Featured
							</li>
						) : (
							""
						)}
						{/* Conditionally render element based on location */}
						{location.pathname === "/" ? (
							<li
								className="nav-link"
								onClick={() =>
									blogsRef.current.scrollIntoView({ behavior: "smooth" })
								}
							>
								Blogs
							</li>
						) : (
							""
						)}
						<li
							className="nav-link"
							onClick={() =>
								footer.current.scrollIntoView({ behavior: "smooth" })
							}
						>
							Socials
						</li>
					</ul>
					<SocialIcons /> {/* Social Icons section */}
				</div>
			</nav>
		</>
	);
};

export default withRouter(Navbar);
