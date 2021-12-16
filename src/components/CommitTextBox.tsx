import * as React from "react";

import TextBox, { TextBoxProps } from "./TextBox";

export interface CommitTextBoxProps extends TextBoxProps {
  onCommit: (value: string) => void;
}

const CommitTextBox: React.FC<CommitTextBoxProps> = ({
  value,
  onCommit,
  ...props
}) => {
  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditingValue(e.target.value);
    },
    []
  );
  const onBlur = React.useCallback(() => {
    if (editingValue != null) {
      setEditingValue(null);
      onCommit(editingValue);
    }
  }, []);
  return (
    <TextBox
      {...props}
      value={editingValue ?? value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default CommitTextBox;
