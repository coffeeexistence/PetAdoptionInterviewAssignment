// @flow

import reducer, { addSavedProfile } from '../../app/redux-store/savedProfiles';

const testProfile1 = {
  id: 1001,
  type: 'cat',
  name: 'Patronus',
  img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg',
  sex: 'M',
  age: 8,
  profile:
    'Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet.'
};

const testProfile2 = {
  id: 1001,
  type: 'cat',
  name: 'Patronus',
  img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg',
  sex: 'M',
  age: 8,
  profile:
    'Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet.'
};

describe('reducer', () => {
  it('ADD_SAVED_PROFILE should add the profile to the beginning of the state (unshift)', () => {
    const initialState = [testProfile1];
    const action = addSavedProfile(testProfile2);
    expect(reducer(initialState, action)).toEqual([testProfile2, testProfile1]);
  });
});
