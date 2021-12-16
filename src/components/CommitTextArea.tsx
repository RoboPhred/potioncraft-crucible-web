import * as React from "react";

import TextArea, { TextAreaProps } from "./TextArea";

export interface CommitTextAreaProps extends TextAreaProps {
  onCommit: (value: string) => void;
}

const CommitTextArea: React.FC<CommitTextAreaProps> = ({
  value,
  onCommit,
  ...props
}) => {
  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <TextArea
      {...props}
      value={editingValue ?? value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default CommitTextArea;
