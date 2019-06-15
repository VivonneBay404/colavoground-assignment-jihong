import React from "react";
import classes from "./Button.module.css";

const Button: React.FC = props => {
  return <button className={classes.Button}>{props.children}</button>;
};
export default Button;
