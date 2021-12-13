import * as React from "react";

export interface CommitTextBoxProps {
  value: string;
  textArea?: boolean;
  onCommit: (value: string) => void;
}

const CommitTextBox: React.FC<CommitTextBoxProps> = ({
  value,
  textArea = false,
  onCommit,
}) => {
  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  const props = {
    value: editingValue ?? value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditingValue(e.target.value),
    onBlur: () => {
      if (editingValue != null) {
        setEditingValue(null);
        onCommit(editingValue);
      }
    },
  } as const;
  if (textArea) {
    return <textarea {...props} />;
  } else {
    return <input type="text" {...props} />;
  }
};

export default CommitTextBox;
