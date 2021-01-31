import { useRef, useState } from "react";
import { server } from "../config";
import Blogs from "./blogs";

export default function Home({ blogs }) {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);

	const about = useRef(null);
	const featured = useRef(null);
	const blogsRef = useRef(null);
	const footer = useRef(null);

	return (
		<>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs" ref={blogsRef}>
						<Blogs
							blogs={blogs}
							category={false}
							blogsRef={blogsRef}
							search={searching}
						/>
					</section>
				</div>
			</section>
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(`${server}/api/blogs`);
	const blogs = await res.json();

	return {
		props: {
			blogs,
		},
	};
};
