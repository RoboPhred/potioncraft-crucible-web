import * as React from "react";
import { SketchPicker, ColorResult } from "react-color";

import Popper from "../Popper";

import styles from "./ColorButton.module.css";

export interface ColorButtonProps {
  color: string;
  onChange(color: string): void;
}

const ColorButton = ({ color, onChange }: ColorButtonProps) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [bufferedColor, setBufferedColor] = React.useState<string | null>(null);

  const onClick = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onRequestClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSketchColorChange = React.useCallback((color: ColorResult) => {
    setBufferedColor(color.hex);
  }, []);

  const onSketchColorCommit = React.useCallback(
    (color: ColorResult) => {
      setBufferedColor(null);
      onChange(color.hex);
    },
    [onChange]
  );

  return (
    <>
      <svg
        width="50px"
        height="50px"
        ref={svgRef}
        className={styles["colorbutton-svg"]}
        onClick={onClick}
      >
        <circle cx={25} cy={25} r={25} fill={bufferedColor ?? color} />
      </svg>
      <Popper
        isOpen={isOpen}
        anchorEl={svgRef.current}
        onRequestClose={onRequestClose}
      >
        <SketchPicker
          color={color}
          onChange={onSketchColorChange}
          onChangeComplete={onSketchColorCommit}
        />
      </Popper>
    </>
  );
};

export default ColorButton;
