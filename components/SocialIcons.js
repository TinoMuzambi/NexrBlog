import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialIcons = () => (
	<>
		<div className="social text-gray">
			<a
				href="https://bit.ly/TinoFacebook"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="fab fa-facebook-f">
					<FaFacebookF />
				</span>
			</a>
			<a
				href="https://bit.ly/TinoInstagram"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="fab fa-instagram">
					<FaInstagram />
				</span>
			</a>
			<a
				href="https://bit.ly/TinoTwitter"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="fab fa-twitter">
					<FaTwitter />
				</span>
			</a>
			<a
				href="https://bit.ly/TinoYouTube"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="fab fa-youtube">
					<FaYoutube />
				</span>
			</a>
		</div>
	</>
);

export default SocialIcons;
