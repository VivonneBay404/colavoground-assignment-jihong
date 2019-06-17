import React from "react";
import classes from "./CartItem.module.css";

type cartItem = {
  key: string;
  name: string;
  price: number;
  count: number;
  clicked: () => void;
};

const cartItem: React.FC<cartItem> = props => {
  return (
    <div className={classes.CartItem}>
      {/* <button onClick={() => props.clicked(props.name)}>버튼</button> */}
      <div className={classes.nameNPriceWrapper}>
        <div className={classes.Name}>{props.name}</div>
        <div className={classes.Price}>{props.price}</div>
      </div>
      <div className={classes.check} onClick={props.clicked}>
        {props.count}
      </div>
    </div>
  );
};
export default cartItem;
