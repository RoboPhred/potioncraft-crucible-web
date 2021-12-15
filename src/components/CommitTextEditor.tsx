import * as React from "react";

import TextBox from "./TextBox";

export interface CommitTextBoxProps {
  value: string;
  component?:
    | React.ComponentType<React.HTMLAttributes<HTMLInputElement>>
    | React.ComponentType<React.HTMLAttributes<HTMLTextAreaElement>>;
  onCommit: (value: string) => void;
}

const CommitTextEditor: React.FC<CommitTextBoxProps> = ({
  value,
  component: Component = TextBox,
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
  return <Component {...(props as any)} />;
};

export default CommitTextEditor;
