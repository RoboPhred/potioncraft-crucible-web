import * as React from "react";
import { SketchPicker, ColorResult } from "react-color";

import Popper from "../Popper";

import styles from "./ColorButton.module.css";

export interface ColorButtonProps {
  color: string;
  onChange(color: string): void;
  children?: React.ReactNode;
}

const radius = 17;

const ColorButton = ({ color, onChange, children }: ColorButtonProps) => {
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
    <label>
      <svg
        width={`${radius * 2}px`}
        height={`${radius * 2}px`}
        ref={svgRef}
        className={styles["colorbutton-svg"]}
        onClick={onClick}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={bufferedColor ?? color}
        />
      </svg>
      {children && (
        <span className={styles["colorbutton-label"]}>{children}</span>
      )}
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
    </label>
  );
};

export default ColorButton;
