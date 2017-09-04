const error = (state = {
  data: null,
  state: 'NO_DATA',
}, action) => {
  switch (action.type) {
    case 'set-error-data':
      return { ...state, data: action.data };
    case 'set-error-state':
      return { ...state, state: action.state };
    default:
      return state;
  }
};

export default error;
