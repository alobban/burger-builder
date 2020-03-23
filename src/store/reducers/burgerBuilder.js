import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredientAdded = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredientsAdded = updateObject(state.ingredients, updatedIngredientAdded);
      const updatedStateAdded = {
        ingredients: updatedIngredientsAdded,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedStateAdded);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredientRemoved = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedIngredientsRemoved = updateObject(state.ingredients, updatedIngredientRemoved);
      const updatedStateRemoved = {
        ingredients: updatedIngredientsRemoved,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedStateRemoved);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true
      });
    default:
      return state;
  }
};

export default burgerBuilder;
