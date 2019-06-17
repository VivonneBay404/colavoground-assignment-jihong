import React from "react";
import classes from "./Item.module.css";

type item = {
  key: string;
  name: string;
  price: number;
  rate: number;
  selected: boolean;
  clicked: () => void;
};

const item: React.FC<item> = props => {
  let check = <div className={classes.Check} />;
  if (props.selected) {
    check = <div className={classes.Check}>v</div>;
  }

  return (
    <div className={classes.Item} onClick={() => props.clicked()}>
      <div className={classes.nameNPriceWrapper}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{props.price}</div>
        <div className={classes.price}>{props.rate}</div>
      </div>
      {check}
    </div>
  );
};
export default item;
