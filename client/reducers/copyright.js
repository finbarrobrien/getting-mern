const copyright = (state = {
  copyright: null,
}, action) => {
  switch (action.type) {
    case 'set-copyright-owner':
      return {
        ...state,
        copyright: {
          owner: action.data,
        },
      };
    case 'set-copyright-year':
      return {
        ...state,
        copyright: {
          year: action.data,
        },
      };
    default:
      return state;
  }
};

export default copyright;
