import Link from "next/link";

const Categories = ({ categories }) => (
	<>
		<h2>Categories</h2>
		<ul className="category-list">
			{categories.map((category, key) => (
				<Link href={`/categories/${category.name.toLowerCase()}`} key={key}>
					<a>
						<li
							className="list-items"
							data-aos="fade-left"
							data-aos-delay="200"
						>
							{category.name}
							<span>({category.count})</span>
						</li>
					</a>
				</Link>
			))}
		</ul>
	</>
);

export default Categories;
