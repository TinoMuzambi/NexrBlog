import Head from "next/head";

const Meta = ({ title, keywords, description, image, url }) => {
	return (
		<Head>
			{/* Global site tag (gtag.js) - Google Analytics */}

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta name="theme-color" content="#000000" />

			{/* <!-- Google / Search Engine Tags --> */}
			<meta itemprop="name" content={title} />
			<meta itemprop="description" content={description} />
			<meta itemprop="image" content={image} />

			{/* <!-- Facebook Meta Tags --> */}
			<meta property="og:url" content={url} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			{/* <!-- Twitter Meta Tags --> */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

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
	keywords: "blog, tech, lifestyle, tino, muzambi",
	description: "Welcome to my blog",
	image: "/assets/logo512.png",
	url: "https://blog.tinomuzambi.com",
};

export default Meta;
