import { blogs } from "../../../data/blogs";

export default function handler({ query: { name } }, res) {
	const filtered = blogs.filter((blog) => blog.name === name);

	if (filtered.length > 0) {
		res.status(200).json(filtered[0]);
	} else {
		res
			.status(404)
			.json({ message: `Blog with the name of ${name} is not found` });
	}
}
