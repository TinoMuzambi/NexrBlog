import SocialIcons from "./SocialIcons";
import { FaArrowCircleUp, FaCopyright } from "react-icons/fa";

const Footer = () => {
	const scrollTop = () => {
		// Scroll to top handler.
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="footer" id="contact-me">
			<div className="container">
				<div className="about-us" data-aos="fade-right" data-aos-delay="200">
					<h2>About me</h2>
					<p>
						I'm Tino. An avid techie and software developer turned blogger based
						in Cape Town, South Africa.
					</p>
				</div>
				<div className="instagram" data-aos="fade-left" data-aos-delay="200">
					<h2>Instagram</h2>
					<a
						href="https://bit.ly/TinoInstagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="flex-row">
							<img src={"/assets/instagram/watch.JPG"} alt="insta1" />
							<img src={"/assets/instagram/closed_rose.jpg"} alt="insta2" />
							<img src={"/assets/instagram/sutherland.jpg"} alt="insta3" />
						</div>
						<div className="flex-row">
							<img src={"/assets/instagram/me_sutherland.jpg"} alt="insta4" />
							<img src={"/assets/instagram/me_selfie.jpg"} alt="insta5" />
							<img src={"/assets/instagram/me_sprinting.JPG"} alt="insta6" />
						</div>
					</a>
				</div>
				<div className="follow" data-aos="fade-left" data-aos-delay="200">
					<h2>Follow me</h2>
					<p>Find Me Here</p>
					<SocialIcons /> {/* Social Icons section */}
				</div>
			</div>
			<div className="rights flex-row text-center">
				<h4 className="text-gray">
					Made with HTML, CSS & JS.
					<i className="fas fa-copyright">
						<FaCopyright />
					</i>
					Copyright Tino Muzambi 2020 - 2021
				</h4>
			</div>
			<div className="move-up">
				<span onClick={scrollTop}>
					<i className="fas fa-arrow-circle-up fa-2x">
						<FaArrowCircleUp />
					</i>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
