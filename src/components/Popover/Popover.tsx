import * as React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import { FocusOn, AutoFocusInside } from "react-focus-on";

import styles from "./Popover.module.css";

console.log("what the fuck");
console.log("styles for popover", styles);

export interface PopoverProps {
  placement: "center-screen";
  isOpen: boolean;
  backdropClassname?: string;
  className?: string;
  children: React.ReactNode;
}

const Popover = ({
  placement,
  isOpen,
  backdropClassname,
  className,
  children,
}: PopoverProps) => {
  const Container: React.ComponentType | null = React.useMemo(() => {
    switch (placement) {
      case "center-screen":
        return PopoverCenterContainer;
      default:
        console.error(`Unknown popover placement: ${placement}`);
        return null;
    }
  }, [placement]);

  if (!isOpen || !Container) {
    return null;
  }

  const contentNode = (
    <>
      <PopoverBackdrop className={backdropClassname} />
      <Container>
        <FocusOn
          // previous implementation in another project had issues between popper and autoFocus.
          // Currently, Popover doesnt use popper and only supports center-screen, but leaving this here for the future.
          autoFocus={false}
        >
          <div className={classNames(styles["popover-content"], className)}>
            <AutoFocusInside className={styles["popover-autofocuser"]}>
              {children}
            </AutoFocusInside>
          </div>
        </FocusOn>
      </Container>
    </>
  );

  return createPortal(contentNode, document.body);
};

export default Popover;

interface PopoverBackdropProps {
  className?: string;
}
const PopoverBackdrop = ({ className }: PopoverBackdropProps) => (
  <div className={classNames(styles["popover-backdrop"], className)} />
);

const PopoverCenterContainer: React.FC = ({ children }) => (
  <div className={styles["popover-container--center"]}>{children}</div>
);
