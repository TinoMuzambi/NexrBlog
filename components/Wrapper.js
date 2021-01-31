import Preload from "../pages/preload";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wrapper = ({ children }) => {
	return (
		<>
			{/* <Preload /> */}
			<Navbar />
			<>{children}</>
			<Footer />
		</>
	);
};

export default Wrapper;
