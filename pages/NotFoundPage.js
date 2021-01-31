import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundPage = () => (
	<>
		<Helmet>
			<title>Not Found | Blog.TinoMuzambi</title>
			<meta name="description" content="404 - Page not found" />
			<meta itemprop="image" content="/logo512.png" />
		</Helmet>
		<div className="not-found-page">
			<h1 className="title">Looks like you got lost.</h1>
			<Link to="/">
				<h2 className="subtitle">Let's get you back home.</h2>
			</Link>
		</div>
	</>
);

export default NotFoundPage;
