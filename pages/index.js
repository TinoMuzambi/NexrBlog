import { server } from "../config";
import Blogs from "./blogs";

export default function Home({ blogs }) {
	return (
		<>
			<section className="container" id="blogs">
				<div className="site-content">
					<section className="blogs">
						<Blogs blogs={blogs} />
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
