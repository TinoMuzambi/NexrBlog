import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			{/* Global site tag (gtag.js) - Google Analytics */}

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta name="theme-color" content="#000000" />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="Blog.TinoMuzambi" content="Welcome to my blog" />
			<link rel="apple-touch-icon" href="/logo192.png" />
			<link rel="manifest" href="/manifest.json" />
			<title>{title}</title>

			{/* AOS Library */}
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
				integrity="sha512-1cK78a1o+ht2JcaW6g8OXYwqpev9+6GqOkz9xmBN9iUUhIndKtxwILGWYOSibOKjLsEdjyjZvYDq/cZwNeak0w=="
				crossOrigin="anonymous"
			/>
		</Head>
	);
};

Meta.defaultProps = {
	title: "Blog.TinoMuzambi",
	keywords: "web development, programming",
	description: "Get the latest news in web dev",
};

export default Meta;
