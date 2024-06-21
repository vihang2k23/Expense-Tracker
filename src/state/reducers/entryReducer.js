const initialState = {
    objects: [],
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_OBJECT:
        return {
          ...state,
          objects: [...state.objects, action.payload],
        };
      default:
        return state;
    }
  };