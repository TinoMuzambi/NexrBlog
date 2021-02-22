import Navbar from "./Navbar";
import Footer from "./Footer";
import Meta from "./Meta";
import Preload from "./Preload";

const Wrapper = ({ children }) => {
	return (
		<>
			<Meta />
			<Preload />
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Wrapper;
