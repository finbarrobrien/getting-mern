import fetch from 'isomorphic-fetch';
import { setLocationListDataAction, setLocationListStateAction } from '../index';

const getLocationList = ({ lat, lng, distance }) => {
  return (dispatch) => {
    dispatch(setLocationListStateAction({ state: 'LOADING' }));
    return fetch(`http://localhost:3000/api/location?lng=${lng}&lat=${lat}&distance=${distance}`, {
      mode: 'no-cors',
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      dispatch(setLocationListStateAction({ state: 'ERROR' }));
      dispatch(setLocationListDataAction({ data: null }));
      return {
        errorCode: resp.status,
        errorMessage: resp.statusText,
      };
    }).then((data) => {
      console.log(data);
      dispatch(setLocationListDataAction({ data }));
      dispatch(setLocationListStateAction({ state: 'OK' }));
    });
  };
};

export default getLocationList;
