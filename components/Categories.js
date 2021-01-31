import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";

const Categories = () => (
	<>
		<h2>Categories</h2>
		<ul className="category-list">
			{categories.map((category, key) => (
				<Link to={`/categories/${category.name.toLowerCase()}`} key={key}>
					<li className="list-items" data-aos="fade-left" data-aos-delay="200">
						{category.name}
						<span>({category.count})</span>
					</li>
				</Link>
			))}
		</ul>
	</>
);

export default Categories;
