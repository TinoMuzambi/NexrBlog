import "../styles/css/App.min.css";
import Wrapper from "../components/Wrapper";

function MyApp({ Component, pageProps }) {
	return (
		<Wrapper>
			<Component {...pageProps}>hi</Component>
		</Wrapper>
	);
}

export default MyApp;
