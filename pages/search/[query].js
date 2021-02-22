import { useEffect } from "react";
import { useRouter } from "next/router";

import Preload from "../../components/Preload";

const OpenSearch = ({ query }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Preload />;
	}

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
