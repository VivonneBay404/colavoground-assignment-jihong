import React from "react";
import classes from "./CartDiscount.module.css";

type cartDiscount = {
  key: string;
  name: string;
  rate: number;
  clicked: () => void;
  discountedItems: { name: string; price: number; id: string; count: number }[];
};

const cartDiscount: React.FC<cartDiscount> = props => {
  const discountedItems = props.discountedItems;
  const discountedItemsList = discountedItems.map(e => {
    return <span className={classes.DiscountedItem}>{e.name}</span>;
  });
  return (
    <div className={classes.CartDiscount}>
      <div className={classes.nameNPriceWrapper}>
        <div className={classes.Name}>{props.name}</div>
        {discountedItemsList}
        <div className={classes.Price}>{props.rate}</div>
      </div>
      <div className={classes.check} onClick={props.clicked}>
        수정
      </div>
    </div>
  );
};
export default cartDiscount;
