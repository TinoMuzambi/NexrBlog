import { useEffect } from "react";
import { useRouter } from "next/router";

const OpenSearch = () => {
	const router = useRouter();

	useEffect(() => {
		const queryText = router.pathname.substring(8);
		router.push({
			pathname: "/",
			query: {
				fromOpenSearch: true,
				queryText: queryText,
			},
		});
	}, [router.pathname]);

	return null;
};

export default OpenSearch;
