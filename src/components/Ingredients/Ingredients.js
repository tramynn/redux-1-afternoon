import React, { Component } from "react";
import store, { ADD_INGREDIENTS } from "./../../store";
import { Link } from "react-router-dom";

class Ingredients extends Component {
  constructor(props) {
    super(props);
    // set up constructor to pull in its initial state from redux state
    const reduxState = store.getState();
    this.state = {
      ingredients: reduxState.ingredients,
      input: ""
    };
  }

  componentDidMount() {
    // subscribe takes a cb function as its argument that will fire anytime
    // there is an update in redux
    // every time this function fires, we want to use getState to get an updated
    // version of the redux state
    // then use this.setState to update our component's state with the new values
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        ingredients: reduxState.ingredients
      });
    });
  }
  handleChange(val) {
    this.setState({
      input: val
    });
  }
  addIngredient() {
    // Send data to Redux state
    store.dispatch({
      type: ADD_INGREDIENTS,
      payload: this.state.input
    });
    this.setState({
      input: ""
    });
  }
  render() {
    const ingredients = this.state.ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
    return (
      <div className="List forms">
        <h2>Ingredients:</h2>
        <div className="form_items_container">
          <ul className="list">{ingredients}</ul>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addIngredient()}>
            Add Ingredient
          </button>
        </div>
        <Link to="/add/author">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/add/instructions">
          <button className="right_button">Next</button>
        </Link>
      </div>
    );
  }
}

export default Ingredients;
