import { combineReducers } from 'redux';

import feeds from './reducers/feeds';
import pageNumber from './reducers/pageNumber';
import chartData from './reducers/chartData';

export default combineReducers({
  feeds,
  pageNumber,
  chartData
});