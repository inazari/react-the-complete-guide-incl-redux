import React, {Component, Fragment} from 'react'
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE  = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1,
    bacon: 0.9
}

class BurgerBuilder extends Component{
   state = {
       ingredients: {
           salad: 1,
           bacon: 0,
           cheese: 0,
           meat: 0
       },
       totalPrice: 4
   }

    addIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {[type]: updatedCount};
        const updatedIngredients = {...this.state.ingredients, ...updatedIngredient};

        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];

        if(oldCount !== 0){
            const updatedCount = oldCount - 1;
            const updatedIngredient = {[type]: updatedCount};
            const updatedIngredients = {...this.state.ingredients, ...updatedIngredient};

            const priceDeduction = INGREDIENTS_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        }

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (<Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
            />
            <button onClick={()=>{this.addIngredientHandler('bacon')}}>add bacon</button>
        </Fragment>)
    }
}

export default BurgerBuilder;
