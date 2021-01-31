import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ location }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return null;
};

export default withRouter(ScrollToTop);
