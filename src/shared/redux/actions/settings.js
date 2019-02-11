import {
  fetchSettingsByType,
  addListItem,
  removeListItem
} from '../../firebase/db/settings';

export const FETCH_SETTINGS_START = 'FETCH_SETTINGS_START';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAIL = 'FETCH_SETTINGS_FAIL';
export const ADD_SETTING_START = 'ADD_SETTING_START';
export const ADD_SETTING_SUCCESS = 'ADD_SETTING_SUCCESS';
export const ADD_SETTING_FAIL = 'ADD_SETTING_FAIL';
export const REMOVE_SETTING_START = 'REMOVE_SETTING_START';
export const REMOVE_SETTING_SUCCESS = 'REMOVE_SETTING_SUCCESS';
export const REMOVE_SETTING_FAIL = 'REMOVE_SETTING_FAIL';

const fetchSettingsStart = () => ({
  type: FETCH_SETTINGS_START
});

const fetchSettingsSuccess = (settings) => ({
  type: FETCH_SETTINGS_SUCCESS,
  settings
});

const fetchSettingsFail = (error) => ({
  type: FETCH_SETTINGS_FAIL,
  error
});

export const fetchSettings = (type) => async (dispatch) => {
  dispatch(fetchSettingsStart());
  try {
    const settings = await fetchSettingsByType(type);
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    dispatch(fetchSettingsFail(err.message));
  }
};

const addSettingStart = () => ({
  type: ADD_SETTING_START
});

const addSettingSuccess = (setting) => ({
  type: ADD_SETTING_SUCCESS,
  setting
});

const addSettingFail = (error) => ({
  type: ADD_SETTING_FAIL,
  error
});

export const addSetting = (type, list, item) => async (dispatch) => {
  dispatch(addSettingStart());
  try {
    await addListItem(type, list, item);
    dispatch(addSettingSuccess({ list, item }));
  } catch (err) {
    dispatch(addSettingFail(err.message));
  }
};

const removeSettingStart = () => ({
  type: REMOVE_SETTING_START
});

const removeSettingSuccess = (setting) => ({
  type: REMOVE_SETTING_SUCCESS,
  setting
});

const removeSettingFail = (error) => ({
  type: REMOVE_SETTING_FAIL,
  error
});

export const removeSetting = (type, list, item) => async (dispatch) => {
  dispatch(removeSettingStart());
  try {
    await removeListItem(type, list, item);
    dispatch(removeSettingSuccess({ list, item }));
  } catch (err) {
    dispatch(removeSettingFail(err.message));
  }
};
