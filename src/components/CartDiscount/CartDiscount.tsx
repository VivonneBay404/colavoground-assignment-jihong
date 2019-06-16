import React from "react";
import classes from "./CartDiscount.module.css";

type cartDiscount = {
  key: string;
  name: string;
  rate: number;
  //   clicked: () => void;
};

const cartDiscount: React.FC<cartDiscount> = props => {
  return (
    <div className={classes.CartDiscount}>
      {/* <button onClick={() => props.clicked(props.name)}>버튼</button> */}
      <div className={classes.nameNPriceWrapper}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{props.rate}</div>
      </div>
      <div className={classes.check}>수정</div>
    </div>
  );
};
export default cartDiscount;
