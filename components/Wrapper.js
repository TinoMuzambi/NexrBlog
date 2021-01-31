import Preload from "./Preload";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Meta from "./Meta";
import { GlobalProvider } from "../context/GlobalState";

const Wrapper = ({ children }) => {
	return (
		<GlobalProvider>
			<Meta />
			<Preload />
			<Navbar />
			{children}
			<Footer />
		</GlobalProvider>
	);
};

export default Wrapper;
