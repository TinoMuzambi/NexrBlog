import Preload from "./Preload";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Meta from "./Meta";

const Wrapper = ({ children }) => {
	return (
		<>
			<Meta />
			<Preload />
			<Navbar />
			<>{children}</>
			<Footer />
		</>
	);
};

export default Wrapper;
