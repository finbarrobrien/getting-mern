const setLocationInfoDataAction = ({ data }) => {
  return {
    type: 'set-location-info-data',
    data,
  };
};

const setLocationInfoStateAction = ({ state }) => {
  return {
    type: 'set-location-info-state',
    state,
  };
};

const setLocationListDataAction = ({ data }) => {
  return {
    type: 'set-location-list-data',
    data,
  };
};

const setLocationListStateAction = ({ state }) => {
  return {
    type: 'set-location-list-state',
    state,
  };
};

export {
  setLocationInfoDataAction,
  setLocationInfoStateAction,
  setLocationListDataAction,
  setLocationListStateAction
};
