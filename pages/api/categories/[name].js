import { categories } from "../../../data/categories";

export default function handler({ query: { name } }, res) {
	const filtered = categories.filter((category) => category.name === name);

	if (filtered.length > 0) {
		res.status(200).json(filtered[0]);
	} else {
		res
			.status(404)
			.json({ message: `category with the name of ${name} is not found` });
	}
}
