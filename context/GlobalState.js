import { createContext, useReducer } from "react";

// Initial state
const initialState = {
	blogs: [],
	categories: [],
	item: {},
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
