import * as React from "react";

export interface CommitTextBoxProps {
  value: string;
  onCommit: (value: string) => void;
}

const CommitTextBox: React.FC<CommitTextBoxProps> = ({ value, onCommit }) => {
  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  return (
    <input
      type="text"
      value={editingValue ?? value}
      onChange={(e) => setEditingValue(e.target.value)}
      onBlur={() => {
        if (editingValue != null) {
          setEditingValue(null);
          onCommit(editingValue);
        }
      }}
    />
  );
};

export default CommitTextBox;
