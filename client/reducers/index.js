import { combineReducers } from 'redux';
import locationList from './locationList';
import locationInfo from './locationInfo';
import copyright from './copyright';
import error from './error';

const loc8r = combineReducers({ copyright, locationList, locationInfo, error });
export default loc8r;
