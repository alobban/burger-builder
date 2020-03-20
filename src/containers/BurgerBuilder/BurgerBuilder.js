import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxill/Auxill';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-1b1ee.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     const ingredients = response.data;
    //     let price = this.state.totalPrice;
    //     let purchasable = this.state.purchasable;
    //     for (let ingredient in ingredients) {
    //       price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
    //       if (ingredients[ingredient] > 0) {
    //         purchasable = true;
    //       }
    //     }
    //
    //     this.setState({
    //       ingredients: response.data,
    //       totalPrice: price,
    //       purchasable: purchasable
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //     console.log(error)
    //   })
    // ;
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return  sum > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={!this.updatePurchaseState(this.props.ings)}
            price={this.props.totPrc}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        price={this.props.totPrc}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totPrc: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
