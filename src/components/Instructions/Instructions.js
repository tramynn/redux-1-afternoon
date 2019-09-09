import React, { Component } from "react";
import store, { ADD_INSTRUCTIONS, CREATE_RECIPE } from "./../../store";
import { Link } from "react-router-dom";

class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      instructions: reduxState.instructions,
      input: ""
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      // retrieve store data with getState
      const reduxState = store.getState();
      this.setState({
        instructions: reduxState.instructions
      });
    });
  }

  handleChange(val) {
    this.setState({
      input: val
    });
  }

  addInstruction() {
    // Send data to Redux state
    store.dispatch({
      type: ADD_INSTRUCTIONS,
      payload: this.state.input
    });
    this.setState({
      input: ""
    });
  }
  create() {
    // Create new recipe in Redux state
    store.dispatch({
      type: CREATE_RECIPE
    });
  }
  render() {
    const instructions = this.state.instructions.map((instruction, i) => {
      return <li key={i}>{instruction}</li>;
    });
    return (
      <div className="List forms">
        <h2>Instructions:</h2>
        <div className="form_items_container">
          <ol className="list">{instructions}</ol>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addInstruction()}>
            Add Instruction
          </button>
        </div>
        <Link to="/add/ingredients">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/">
          <button className="right_button" onClick={() => this.create()}>
            Create
          </button>
        </Link>
      </div>
    );
  }
}

export default Instructions;
