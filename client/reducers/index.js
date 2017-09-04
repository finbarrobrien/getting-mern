import { combineReducers } from 'redux';
import locationList from './locationList';
import locationInfo from './locationInfo';
import error from './error';

const loc8r = combineReducers({ locationList, locationInfo, error });
export default loc8r;
