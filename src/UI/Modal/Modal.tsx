import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

type modal = {
  show: boolean;
  canceled: () => void;
};

const Modal: React.FC<modal> = props => {
  return (
    <>
      <Backdrop show={props.show} canceled={props.canceled} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-200vh)"
        }}
      >
        {props.children}
      </div>
    </>
  );
};
export default Modal;
