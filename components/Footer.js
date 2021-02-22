import React from "react";
import SocialIcons from "./SocialIcons";
import { FaArrowCircleUp, FaCopyright } from "react-icons/fa";

const Footer = () => {
	const scrollTop = () => {
		// Scroll to top handler.
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<footer className="footer" id="contact-me">
				<div className="container">
					<div className="about-us" data-aos="fade-right" data-aos-delay="200">
						<h2>About me</h2>
						<p>
							I'm Tino. An avid techie and software developer turned blogger
							based in Cape Town, South Africa.
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
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/d0eb9d71f7/watch.JPG"
									alt="A close up of my watch"
								/>
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/8bb3fc4a9b/closed_rose.jpg"
									alt="Closed rose"
								/>
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/340d25855e/sutherland.jpg"
									alt="The Southern African Large Telescope"
								/>
							</div>
							<div className="flex-row">
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/c7964641c1/me_sutherland.jpg"
									alt="Me standing on a mountain"
								/>
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/f4b4ba9864/me_selfie.jpg"
									alt="Selfie of me"
								/>
								<img
									src="https://a.storyblok.com/f/105639/1000x1000/bf6bf66298/me_sprinting.JPG"
									alt="Me sprinting"
								/>
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
		</>
	);
};

export default Footer;
