const ADD_OBJECT = 'ADD_OBJECT';

// Define action creators
export const addObject = (object) => ({
  type: ADD_OBJECT,
  payload: object,
});