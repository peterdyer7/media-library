import deepFreeze from 'deep-freeze';

import { images } from './images';

describe('images reducer', () => {
  it('returns the initial state', () => {
    const stateBefore = undefined;
    const action = {};
    const stateAfter = {
      images: [],
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(images(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles IMAGE_UPLOAD_START', () => {
    const image1 = {
      id: '123',
      active: false,
      status: 'loading',
      name: 'image123.jpg',
      properties: []
    };
    let stateBefore = undefined;
    let action = { type: 'IMAGE_UPLOAD_START', image: image1 };
    let stateAfter = {
      images: [image1],
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(images(stateBefore, action)).toEqual(stateAfter);

    const image2 = {
      id: '456',
      active: false,
      status: 'loading',
      name: 'image456.jpg',
      properties: []
    };
    stateBefore = {
      images: [image1],
      error: '',
      loading: false
    };
    action = { type: 'IMAGE_UPLOAD_START', image: image2 };
    stateAfter = {
      images: [image2, image1],
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(images(stateBefore, action)).toEqual(stateAfter);
  });
});
