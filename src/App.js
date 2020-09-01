import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Feeds from './organisms/Feeds';
import LineChart from './organisms/LineChart';

import { fetchFeeds } from './actions';

import './scss/style.scss';

const App = (props) => {
	const [isLoading, setLoading] = useState(false);
	const { fetchFeeds } = props;
	useEffect(() => {
		let pageNumber = 0;
		let searchParam = +window.location.search.split("?page=").pop();
		console.log("searchParam", window.location)
		console.log("setLoading", setLoading)

		if(searchParam) {
			pageNumber = searchParam
		}
		console.log("pageNumber",pageNumber)
		console.log("searchParam",searchParam)
		async function loadData() {
			await fetchFeeds(pageNumber);
			setLoading(true);
		}
		loadData();
	}, []);
	if (!isLoading) {
		return <div>Loading...</div>
	}
	return <section className="xt__container">
		<Feeds />
		<LineChart />
	</section>
};

export default connect(null, { fetchFeeds })(App);