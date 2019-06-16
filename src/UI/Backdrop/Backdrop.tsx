import React from "react";
import classes from "./Backdrop.module.css";

type backdrop = {
  show: boolean;
  canceled: () => void;
};

const backdrop: React.FC<backdrop> = props => {
  return (
    <div
      className={classes.Backdrop}
      style={{ display: props.show ? "block" : "none" }}
      onClick={props.canceled}
    >
      {props.children}
    </div>
  );
};
export default backdrop;
