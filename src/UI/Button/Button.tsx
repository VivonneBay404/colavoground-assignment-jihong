import React from "react";
import classes from "./Button.module.css";

type button = {
  children: string;
  clicked: () => void;
};

const Button: React.FC<button> = props => {
  return (
    <button className={classes.Button} onClick={props.clicked}>
      {props.children}
    </button>
  );
};
export default Button;
