const locationInfo = (state = {
  data: null,
  state: 'NO_DATA',
}, action) => {
  console.log(action);
  switch (action.type) {
    case 'set-location-info-data':
      return { ...state, data: action.data };
    case 'set-location-info-state':
      return { ...state, state: action.state };
    default:
      return state;
  }
};

export default locationInfo;
