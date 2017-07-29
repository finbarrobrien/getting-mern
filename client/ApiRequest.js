import fetch from 'isomorphic-fetch';

const ApiRequest = (url) => {
  return fetch(url, {
    mode: 'no-cors',
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return {
      errorCode: resp.status,
      errorMessage: resp.statusText,
    };
  }).then((data) => {
    return data;
  }).catch((err) => {
    console.log(err);
  });
};

export default ApiRequest;
