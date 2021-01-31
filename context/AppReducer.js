export default (state, action) => {
	switch (action.type) {
		case "UPDATE_BLOGS":
			return {
				...state,
				blogs: action.payload,
			};
		case "UPDATE_CATEGORIES":
			return {
				...state,
				categories: action.payload,
			};
		case "UPDATE_ITEM":
			return {
				...state,
				item: action.payload,
			};
		default:
			return state;
	}
};
