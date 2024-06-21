import { createStore } from 'redux';
// Define action types
const ADD_OBJECT = 'ADD_OBJECT';
const DELETE_OBJECT = 'DELETE_OBJECT';
const UPDATE_OBJECT = 'UPDATE_OBJECT';
const LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA';

// Define action creators
export const addObject = (object) => ({
  type: ADD_OBJECT,
  payload: object,
});

export const deleteObject = (id) => ({
  type: DELETE_OBJECT,
  payload: id,
});

export const updateObject = (object) => ({
  type: UPDATE_OBJECT,
  payload: object,
});

export const loadInitialData = (data) => ({
  type: LOAD_INITIAL_DATA,
  payload: data,
});

// Define initial state
const initialState = {
  objects: [],
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OBJECT:
      return {
        ...state,
        objects: [...state.objects, action.payload],
      };
    case DELETE_OBJECT:
      return {
        ...state,
        objects: state.objects.filter((obj) => obj.id !== action.payload),
      };
    case UPDATE_OBJECT:
      return {
        ...state,
        objects: state.objects.map((obj) =>
          obj.id === action.payload.id ? action.payload : obj
        ),
      };
    case LOAD_INITIAL_DATA:
      return {
        ...state,
        objects: action.payload,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
