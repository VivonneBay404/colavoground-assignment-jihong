import React, { Component } from "react";
import classes from "./ItemCounter.module.css";
import Button from "../../UI/Button/Button";

interface props {
  canceled: () => void;
  clickedItem: any;
  countChangeHandler: (value: number) => void;
  itemDeleteHandler: () => void;
}

class ItemCounter extends Component<props> {
  state = {
    inputValue: +""
  };

  eventValueHandler = (event: any) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    console.log(this.state.inputValue);
    return (
      <div className={classes.ItemCounter}>
        <div>{this.props.clickedItem.name}</div>
        <div className={classes.Input}>
          <input
            type="number"
            onChange={event => this.eventValueHandler(event)}
          />
        </div>

        <div>
          <Button clicked={this.props.itemDeleteHandler}>삭제</Button>
          <Button
            clicked={() => this.props.countChangeHandler(this.state.inputValue)}
          >
            완료
          </Button>
        </div>
      </div>
    );
  }
}

export default ItemCounter;
