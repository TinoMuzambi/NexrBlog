import { useEffect } from "react";
import { useRouter } from "next/router";

const OpenSearch = () => {
	const router = useRouter();

	useEffect(() => {
		const query = router.pathname.substring(8);
		router.push({
			pathname: "/",
			state: {
				fromOpenSearch: true,
				query: query,
			},
		});
	}, [router.pathname]);

	return null;
};

export default OpenSearch;
