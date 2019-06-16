import React from "react";
import classes from "./SmallModal.module.css";
import Backdrop from "../../Backdrop/Backdrop";

type smallModal = {
  show: boolean;
  canceled: () => void;
};

const smallModal: React.FC<smallModal> = props => {
  return (
    <>
      <Backdrop show={props.show} canceled={props.canceled} />
      <div
        className={classes.SmallModal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-200vh)"
        }}
      >
        {props.children}
      </div>
    </>
  );
};
export default smallModal;
