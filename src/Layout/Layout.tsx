import React from "react";
import classes from "./Layout.module.css";
import Toolbar from "./Toolbar/Toolbar";

const Layout: React.FC = props => {
  return (
    <div className={classes.Layout}>
      <Toolbar />
      {props.children}
    </div>
  );
};
export default Layout;
