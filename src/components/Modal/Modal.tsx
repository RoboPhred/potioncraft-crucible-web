import * as React from "react";

import Popover from "../Popover";

import styles from "./Modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
}
const Modal = ({ isOpen, children }: ModalProps) => (
  <Popover
    placement="center-screen"
    isOpen={isOpen}
    className={styles["modal"]}
  >
    {children}
  </Popover>
);
export default Modal;
