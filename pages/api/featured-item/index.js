import { item } from "../../../data/featured-item";

export default function handler(req, res) {
	res.status(200).json(item);
}
