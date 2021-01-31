import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { blogs } from "../data/blogs";
import { categories } from "../data/categories";
import { item } from "../data/featured-item";

// Initial state
const initialState = {
	blogs: blogs,
	categories: categories,
	item: item,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<GlobalContext.Provider
			value={{
				blogs: state.blogs,
				categories: state.categories,
				item: state.item,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
