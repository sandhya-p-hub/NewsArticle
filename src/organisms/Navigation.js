import React, { useState } from 'react';

import { connect } from 'react-redux';

import { fetchFeeds } from '../actions';

const Navigation = (props) => {
	const { fetchFeeds } = props;
	const [currentPageNumber, setcurrentPageNumber] = useState(0);
	console.log("currentPageNumber",currentPageNumber)
	function _handlerNextPage() {
		let pageNumber = currentPageNumber+1;
		setcurrentPageNumber(pageNumber);
		fetchFeeds(pageNumber);
		window.history.pushState({}, "", `?page=${pageNumber}`);
	}
	function _handlerPreviousPage() {
		let pageNumber = currentPageNumber-1;
		setcurrentPageNumber(pageNumber);
		fetchFeeds(pageNumber);
		window.history.pushState({}, "", `?page=${pageNumber}`);
	}
	return <div className="xt__navigation xt__flex">
		<button className="xt__navigation__button" disabled={currentPageNumber === 0} onClick={() => _handlerPreviousPage()}>Previous</button>
			|
			<button className="xt__navigation__button" onClick={() => _handlerNextPage()}>Next</button>
	</div>
}

export default connect(null, {fetchFeeds})(Navigation);