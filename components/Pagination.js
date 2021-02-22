import React, { useState, useEffect } from "react";

import { executeScroll } from "../utils/helpers";

const Pagination = ({
	pageSize,
	items,
	onChangePage,
	customLabels,
	customRef,
}) => {
	const [currItems, setCurrItems] = useState(items);
	const [currPage, setCurrPage] = useState(0);
	const noPages = Math.ceil(items.length / pageSize);

	useEffect(() => {
		onChangePage(currItems);
	}, [currItems, onChangePage]);

	useEffect(() => {
		setCurrItems(items);
	}, [items]);

	useEffect(() => {
		getCurrItems();
		// eslint-disable-next-line
	}, [currPage]);

	// Switch to next page of items.
	// Check against going past last page.
	const nextPage = () => {
		setCurrPage(currPage + 1);
		if (currPage >= noPages - 1) {
			setCurrPage(noPages - 1);
		}
	};

	// Switch to previous page of items.
	// Check against going before first page.
	const prevPage = () => {
		setCurrPage(currPage - 1);
		if (currPage <= 0) {
			setCurrPage(0);
		}
	};

	// Directly switch to clicked on page.
	const setDirectPage = (page) => {
		setCurrPage(page);
	};

	// Given the length of the items, the number of items per page and the current page,
	// Return the number of items that should be on that page.
	const getNoItemsOnPage = (length, perPage, page) => {
		let globalCount = 1;
		for (let i = 0; i < length; i++) {
			let count = 0;
			for (let j = 0; j < length; j++) {
				count++;
				if ((count === perPage && page === i) || globalCount === length) {
					return count;
				}
				if (globalCount === perPage) {
					globalCount++;
					count = 0;
				} else {
					globalCount++;
				}
			}
		}
		return 0;
	};

	// Get the items to currently display.
	const getCurrItems = () => {
		const noItems = getNoItemsOnPage(items.length, pageSize, currPage);
		setCurrItems(
			items.slice(currPage * pageSize, currPage * pageSize + noItems)
		);

		// Pass the set items to the callback function.
		onChangePage(currItems);
	};

	return (
		<div className="pagination" onClick={() => executeScroll(customRef)}>
			<ul onClick={() => getCurrItems()}>
				<li onClick={prevPage}>{customLabels.previous}</li>
				{Array.from(Array(noPages).keys()).map((i) => (
					<li key={i} onClick={() => setDirectPage(i)}>
						{i + 1}
					</li>
				))}
				<li onClick={nextPage}>{customLabels.next}</li>
			</ul>
		</div>
	);
};

export default Pagination;
