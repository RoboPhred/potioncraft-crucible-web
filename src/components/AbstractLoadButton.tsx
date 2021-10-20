import * as React from "react";

import useLoadMapConfig from "@/services/map-config/hooks/use-load-map-file";

export interface AbstractLoadButtonProps {
  onInteractionComplete?(): void;
  children(props: AbstractLoadButtonRenderProps): React.ReactChild;
}
export interface AbstractLoadButtonRenderProps {
  disabled: boolean;
  onClick(): void;
}

type Props = AbstractLoadButtonProps;
const AbstractLoadButton: React.FC<Props> = ({
  onInteractionComplete = () => {},
  children,
}) => {
  const { disabled, onLoadSave } = useLoadMapConfig();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const onFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        onInteractionComplete();
        return;
      }
      const file = files[0];

      onLoadSave(file);
      onInteractionComplete;
    },
    [onLoadSave]
  );

  return (
    <>
      {children({ disabled, onClick })}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept=".json"
        onChange={onFileChange}
      />
    </>
  );
};

export default AbstractLoadButton;