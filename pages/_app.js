import { useRouter } from "next/router";
import { useEffect } from "react";

import Wrapper from "../components/Wrapper";
import "../sass/App.scss";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
		nav.classList.remove("collapse");
		nav.classList.remove("collapse-sm");
	}, [router.pathname]);

	return (
		<Wrapper>
			<Component {...pageProps} />
		</Wrapper>
	);
}

export default MyApp;
