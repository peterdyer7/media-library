import {
  FETCH_SETTINGS_START,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAIL,
  ADD_SETTING_START,
  ADD_SETTING_SUCCESS,
  ADD_SETTING_FAIL,
  REMOVE_SETTING_START,
  REMOVE_SETTING_SUCCESS,
  REMOVE_SETTING_FAIL
} from '../actions/settings';

const INITIAL_STATE = {
  settings: {},
  error: '',
  loading: false
};

const start = (state, action) => ({
  ...state,
  error: '',
  loading: false // loading is never true - to prevent page reloads - not necessary / undesirable with settings
});

const fail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});

const fetchSetttingsSuccess = (state, action) => ({
  ...state,
  settings: action.settings,
  loading: false
});

const addSetttingSuccess = (state, action) => {
  const list = state.settings[action.setting.list];
  const item = action.setting.item;
  let settings = state.settings;
  if (!list.includes(item)) {
    const updatedList = [...list, item];
    settings = { ...state.settings, [action.setting.list]: updatedList };
  }
  return {
    ...state,
    settings,
    loading: false
  };
};

const removeSetttingSuccess = (state, action) => {
  const list = state.settings[action.setting.list];
  const item = action.setting.item;
  const updatedList = list.filter((i) => i !== item);
  const settings = { ...state.settings, [action.setting.list]: updatedList };
  return {
    ...state,
    settings,
    loading: false
  };
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_START: {
      return start(state, action);
    }
    case FETCH_SETTINGS_SUCCESS: {
      return fetchSetttingsSuccess(state, action);
    }
    case FETCH_SETTINGS_FAIL: {
      return fail(state, action);
    }
    case ADD_SETTING_START: {
      return start(state, action);
    }
    case ADD_SETTING_SUCCESS: {
      return addSetttingSuccess(state, action);
    }
    case ADD_SETTING_FAIL: {
      return fail(state, action);
    }
    case REMOVE_SETTING_START: {
      return start(state, action);
    }
    case REMOVE_SETTING_SUCCESS: {
      return removeSetttingSuccess(state, action);
    }
    case REMOVE_SETTING_FAIL: {
      return fail(state, action);
    }
    default:
      return state;
  }
};

export default settings;
