const locationList = (state = {
  data: null,
  state: 'NO_DATA',
}, action) => {
  switch (action.type) {
    case 'set-location-list-data':
      return { ...state, data: action.data };
    case 'set-location-list-state':
      return { ...state, state: action.state };
    default:
      return state;
  }
};

export default locationList;
