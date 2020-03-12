import React, { Component } from 'react';

import Aux from '../../../hoc/Auxill';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[OrderSummary] Component Did Update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>
            {igKey}
          </span>
            : {this.props.ingredients[igKey]}
          </li>
        );
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><b>Total Price: ${this.props.price.toFixed(2)}</b></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;
