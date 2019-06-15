import React, { Component } from "react";
import classes from "./Cart.module.css";
import Button from "../../UI/Button/Button";
import axios from "axios";

class Cart extends Component {
  render() {
    return (
      <div className={classes.Cart}>
        <div>박지홍</div>
        <Button>시술</Button>
        <Button>할인</Button>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get(
        "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Cart;
