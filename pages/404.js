import Link from "next/link";
import Meta from "../components/Meta";

const Custom404 = () => (
	<>
		<Meta
			title="Not Found | Blog.TinoMuzambi"
			description="404 - Page not found"
		/>
		<div className="not-found-page">
			<h1 className="title">Looks like you got lost.</h1>
			<Link href="/">
				<a>
					<h2 className="subtitle">Let's get you back home.</h2>
				</a>
			</Link>
		</div>
	</>
);

export default Custom404;
