// make sure to import createStore from redux in order to use
// this allows components to connect to the store
import { createStore } from "redux";

// initialize state
const initialState = {
  name: "",
  category: "",
  authorFirst: "",
  authorLast: "",
  ingredients: [],
  instructions: [],
  recipes: []
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_AUTHOR_FIRST = "UPDATE_AUTHOR_FIRST";
export const UPDATE_AUTHOR_LAST = "UPDATE_AUTHOR_LAST";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const ADD_INSTRUCTIONS = "ADD_INSTRUCTIONS";
export const CREATE_RECIPE = "CREATE_RECIPE";

// initialize reducer and build the switch statement inside the reducer
// switch should test the type property of the action object
// then it should return the state unaltered as the default
// destructuring the action obj makes it easy to access its properties
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // each case should update the piece of state that it needs to, and copy the rest of state in an immutable way
    case UPDATE_NAME: {
      return {
        ...state,
        name: payload
      };
    }
    case UPDATE_CATEGORY: {
      return {
        ...state,
        category: payload
      };
    }
    case UPDATE_AUTHOR_FIRST: {
      return {
        ...state,
        authorFirst: payload
      };
    }
    case UPDATE_AUTHOR_LAST: {
      return {
        ...state,
        authorLast: payload
      };
    }
    case ADD_INGREDIENTS: {
      // working with an array, so we'll need to make a copy of that list before making changes
      const newIngredients = [...state.ingredients, payload];
      return {
        ...state,
        ingredients: newIngredients
      };
    }
    case ADD_INSTRUCTIONS: {
      const addInstructions = [...state.instructions, payload];
      return {
        ...state,
        instructions: addInstructions
      };
    }
    case CREATE_RECIPE: {
      const {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      } = state;
      const recipe = {
        name,
        category,
        authorFirst,
        authorLast,
        ingredients,
        instructions
      };
      const newRecipes = [...state.recipes, recipe];
      // copy state and set recipes to new copied array
      return {
        ...state,
        recipes: newRecipes
      };
    }
    default:
      return state;
  }
}

// exporting
export default createStore(reducer);
