import deepFreeze from 'deep-freeze';

import settings from './settings';

describe('settings reducer', () => {
  it('returns the initial state', () => {
    const stateBefore = undefined;
    const action = {};
    const stateAfter = {
      settings: {},
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles FETCH_SETTINGS_START', () => {
    let stateBefore = undefined;
    const action = { type: 'FETCH_SETTINGS_START' };
    let stateAfter = {
      settings: {},
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);

    const sets = {
      primaryCategories: ['pc1', 'pc2'],
      secondaryCategories: ['sc10', 'sc11'],
      tags: ['tag100', 'tag101']
    };
    stateBefore = {
      settings: sets,
      error: '',
      loading: false
    };
    stateAfter = {
      settings: sets,
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles FETCH_SETTINGS_SUCCESS', () => {
    const sets1 = {
      primaryCategories: ['pc1', 'pc2'],
      secondaryCategories: ['sc10', 'sc11'],
      tags: ['tag100', 'tag101']
    };
    let stateBefore = {
      settings: {},
      error: '',
      loading: true
    };
    let action = { type: 'FETCH_SETTINGS_SUCCESS', settings: sets1 };
    let stateAfter = {
      settings: sets1,
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);

    const sets2 = {
      primaryCategories: ['pca', 'pcb'],
      secondaryCategories: ['scaa', 'scbb'],
      tags: ['tagaaa', 'tagbbb']
    };
    stateBefore = {
      settings: sets1,
      error: '',
      loading: true
    };
    action = { type: 'FETCH_SETTINGS_SUCCESS', settings: sets2 };
    stateAfter = {
      settings: sets2,
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles FETCH_SETTINGS_FAIL', () => {
    const error = 'Settings fail';
    let stateBefore = {
      settings: {},
      error,
      loading: true
    };
    const action = { type: 'FETCH_SETTINGS_FAIL', error };
    let stateAfter = {
      settings: {},
      error,
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);

    const sets = {
      primaryCategories: ['pc1', 'pc2'],
      secondaryCategories: ['sc10', 'sc11'],
      tags: ['tag100', 'tag101']
    };
    stateBefore = {
      settings: sets,
      error: '',
      loading: true
    };
    stateAfter = {
      settings: sets,
      error: error,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(settings(stateBefore, action)).toEqual(stateAfter);
  });
});
