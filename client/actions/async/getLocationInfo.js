import fetch from 'isomorphic-fetch';
import { setLocationInfoDataAction, setLocationInfoStateAction } from '../index';

const getLocationInfo = (url) => {
  return (dispatch) => {
    console.log(`get data for ${url}`);
    dispatch(setLocationInfoStateAction({ state: 'LOADING' }));
    return fetch(`http://localhost:3000/api/${url}`, {
      mode: 'no-cors',
    }).then((resp) => {
      console.log(resp);
      if (resp.ok) {
        console.log('got data');
        return resp.json();
      }
      dispatch(setLocationInfoStateAction({ state: 'ERROR' }));
      console.log(resp.status);
      return {
        errorCode: resp.status,
        errorMessage: resp.statusText,
      };
    }).then((data) => {
      console.log(data);
      dispatch(setLocationInfoDataAction({ data }));
      dispatch(setLocationInfoStateAction({ state: 'OK' }));
    });
  };
};

export default getLocationInfo;
