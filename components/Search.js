const Search = ({ searchBlogs }) => (
	<div className="search-field">
		<input
			type="text"
			id="searchBlogs"
			placeholder="Search Blogs"
			className="search-input"
			onChange={(e) => searchBlogs(e.target.value)}
		/>
	</div>
);

export default Search;
