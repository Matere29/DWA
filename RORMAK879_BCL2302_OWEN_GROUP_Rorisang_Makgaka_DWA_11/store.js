// Define the initial state
const initialState = {
  count: 0
};

// Define action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// Define action creators
const increment = () => ({
  type: INCREMENT
});

const decrement = () => ({
  type: DECREMENT
});

const reset = () => ({
  type: RESET
});

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case RESET:
      return {
        ...state,
        count: 0
      };
    default:
      return state;
  }
};

// Create the store
const createStore = (reducer) => {
  let state = reducer(undefined, {});
  const subscribers = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };
};

// Usage

// Create the store with the reducer
const store = createStore(reducer);

// Subscribe to the store updates
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log("Current count:", state.count);
});

// Dispatch actions to update the state
store.dispatch(increment()); // Current count: 1
store.dispatch(increment()); // Current count: 2
store.dispatch(decrement()); // Current count: 1
store.dispatch(reset());    // Current count: 0

// Unsubscribe from the store updates
unsubscribe();
