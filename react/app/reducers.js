import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import sitesReducer from 'site/sites/reducer';

export default combineReducers({
    routing: routeReducer,
    sites: sitesReducer
});
