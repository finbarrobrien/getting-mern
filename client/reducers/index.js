const loc8r = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'set-data':
      return Object.assign({}, state, { data: action.data });
    default:
      return state;
  }
}

export default loc8r;
