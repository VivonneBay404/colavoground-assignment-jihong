import React from "react";
import classes from "./Item.module.css";

type item = {
  key: string;
  name: string;
  price: number;
  rate: number;
  clicked: () => void;
};

const item: React.FC<item> = props => {
  return (
    <div className={classes.Item} onClick={() => props.clicked()}>
      {/* <button onClick={() => props.clicked(props.name)}>버튼</button> */}
      <div className={classes.nameNPriceWrapper}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{props.price}</div>
        <div className={classes.price}>{props.rate}</div>
      </div>
      <div className={classes.check}>v</div>
    </div>
  );
};
export default item;
