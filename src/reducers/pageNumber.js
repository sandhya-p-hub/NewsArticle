import { CURRENT_PAGE_NUMBER } from '../helpers/constants';

export default function pageNumber(state = 0, action = {}) {
	switch (action.type) {
		case CURRENT_PAGE_NUMBER:
			return action.pageNumber;
		default: return state;
	}
}