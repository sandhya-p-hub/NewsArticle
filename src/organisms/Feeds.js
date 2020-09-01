import React from 'react';
import { connect } from 'react-redux';
import { setUpVoteCount, removeFeedRow } from '../actions';

import * as moment from 'moment';

import Navigation from './Navigation';

const Feeds = (props) => {
	const { data, pageNumber, setUpVoteCount, removeFeedRow } = props;
	console.log("dataa",data)
	console.log("FeedPageNo",pageNumber)

	let feedData = [];
	data.map(el => {
		if(pageNumber === el.page) {
			feedData= el.hits;
		}
	});

	function _upVoteClick(id) {
		setUpVoteCount(id, pageNumber)
	}
	return <div className="xt__feed">
		<table className="xt__feed__table">
			<thead>
				<tr>
					<th className="xt__feed__table__th" width="90">Comments</th>
					<th className="xt__feed__table__th" width="70">Vote Count</th>
					<th className="xt__feed__table__th" width="70">Upvote</th>
					<th className="xt__feed__table__th">News Details</th>
				</tr>
			</thead>
			<tbody>
				{feedData.map((item) => {
					const { num_comments, objectID, points, title, url, author, created_at } = item;
					return <tr key={objectID} className="xt__feed__table__row">
						<td className="xt__feed__table__td">{num_comments && num_comments || 0}</td>
						<td className="xt__feed__table__td">{points}</td>
						<td className="xt__feed__table__td"><button className="xt__chevron-up" onClick={() => _upVoteClick(objectID)} /></td>
						<td className="xt__feed__table__td">{title} 
							<strong className="xt__feed__table__inline"> {url}</strong> 
							<span className="xt__feed__table__inline"> by </span> 
							{author} 
							<strong className="xt__feed__table__inline"> {moment(created_at).startOf('hour').fromNow()} </strong>
							<button className="xt__hide-button" onClick={() => removeFeedRow(objectID, pageNumber)}>[hide]</button>
						</td>
					</tr>
				})}
			</tbody>
		</table>
		<Navigation />
	</div>
}

const mapStateToProps = (state) => {
	return {
		data: state.feeds,
		pageNumber: state.pageNumber
	}
}

export default connect(mapStateToProps, { setUpVoteCount, removeFeedRow })(Feeds);