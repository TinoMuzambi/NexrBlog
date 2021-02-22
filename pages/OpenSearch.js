import { useEffect } from "react";
import { useRouter } from "next/router";

const OpenSearch = ({ setQueryText, blogsRef }) => {
	const router = useRouter();

	useEffect(() => {
		const query = router.pathname.substring(8);
		setQueryText(query);
		router.push({
			pathname: "/",
			state: {
				fromOpenSearch: true,
			},
		});
	}, [router.pathname, setQueryText]);

	return null;
};

export default OpenSearch;
