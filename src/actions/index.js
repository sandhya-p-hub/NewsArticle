import { FETCH_FEEDS, CURRENT_PAGE_NUMBER, CHART_DATA, INCREASE_UP_VOTE, REMOVE_SELECTED_HIT } from '../helpers/constants';

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function setLineGraph(data) {
	const chartData = [];
	data.hits.filter(el => {
		chartData.push({ name:el.objectID, value: el.points })
	});
	return {
		type: CHART_DATA,
		chartData
	}
};

export function fetchFeeds(pageNumber) {
	return dispatch => {
		return fetch(`http://hn.algolia.com/api/v1/search?page=${pageNumber}`)
			.then(res => handleResponse(res))
			.then(res => {
				dispatch({ type: FETCH_FEEDS, data: res });
				dispatch({ type:CURRENT_PAGE_NUMBER, pageNumber });
				dispatch(setLineGraph(res));
			})
	}
}


export function setUpVoteCount(id, page) {
	return dispatch => {
		dispatch({ type: INCREASE_UP_VOTE, id, page})
	}
}

export function removeFeedRow(id, page) {
	return dispatch => {
		dispatch({ type: REMOVE_SELECTED_HIT, id, page})
	}
}