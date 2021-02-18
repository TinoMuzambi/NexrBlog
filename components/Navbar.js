import Link from "next/link";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./SocialIcons";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();

	const toggleCollapse = () => {
		// Toggle collapse class on navbar.
		const nav = document.querySelector(".nav");
		router.pathname === "/"
			? nav.classList.toggle("collapse")
			: nav.classList.toggle("collapse-sm");
	};

	return (
		<nav className="nav" id="nav">
			<div className="nav-menu">
				<div className="nav-brand">
					<Link href="/" className="text-gray">
						<a>Blog.TinoMuzambi</a>
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
					{router.pathname === "/" ? (
						<li
							className="nav-link"
							onClick={() =>
								document
									.querySelector(".about")
									.scrollIntoView({ behavior: "smooth" })
							}
						>
							Home
						</li>
					) : (
						<Link href="/">
							<a>
								<li className="nav-link">Home</li>
							</a>
						</Link>
					)}
					{/* Conditionally render element based on location */}
					{router.pathname === "/" ? (
						<li
							className="nav-link"
							onClick={() =>
								document
									.querySelector(".featured")
									.scrollIntoView({ behavior: "smooth" })
							}
						>
							Featured
						</li>
					) : (
						""
					)}
					{/* Conditionally render element based on location */}
					{router.pathname === "/" ? (
						<li
							className="nav-link"
							onClick={() =>
								document
									.querySelector(".blogs")
									.scrollIntoView({ behavior: "smooth" })
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
							document
								.querySelector("footer")
								.scrollIntoView({ behavior: "smooth" })
						}
					>
						Socials
					</li>
				</ul>
				<SocialIcons /> {/* Social Icons section */}
			</div>
		</nav>
	);
};

export default Navbar;
