import { useEffect } from "react";
import { useRouter } from "next/router";

import Preload from "../../components/Preload";

const OpenSearch = ({ query }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Preload />;
	}

	useEffect(() => {
		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.
		const timeoutID = setTimeout(function () {
			preload.classList.add("finish");
			clearTimeout(timeoutID);
		}, 7000);

		window.addEventListener("load", () => {
			// Get rid of preloader once everything's loaded
			preload.classList.add("finish");
		});

		return () => {
			window.removeEventListener("load", () => {
				// Get rid of preloader once everything's loaded
				preload.classList.add("finish");
			});
		};
	}, []);

	useEffect(() => {
		router.push({
			pathname: "/",
			query: {
				fromOpenSearch: true,
				queryText: query.query,
			},
		});
	}, [router.pathname]);

	return null;
};

export const getStaticProps = async ({ params }) => {
	const query = {
		query: params.query || "",
	};

	return {
		props: {
			query,
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default OpenSearch;
