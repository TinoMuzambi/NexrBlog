import { blogs } from "../../../data/blogs";

export default function handler({ query: { url } }, res) {
	const filtered = blogs.filter((blog) => blog.url === url);

	if (filtered.length > 0) {
		res.status(200).json(filtered[0]);
	} else {
		res
			.status(404)
			.json({ message: `Blog with the url of ${url} is not found` });
	}
}
