import * as React from "react";

export interface AbstractFileLoadButtonProps {
  accept: string;
  onFileLoaded(file: File): void;
  children(props: AbstractLoadButtonRenderProps): React.ReactChild;
  onInteractionComplete?(): void;
}
export interface AbstractLoadButtonRenderProps {
  onClick(): void;
}

type Props = AbstractFileLoadButtonProps;
const AbstractFileLoadButton: React.FC<Props> = ({
  accept,
  onFileLoaded,
  onInteractionComplete = () => {},
  children,
}) => {
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

      onFileLoaded(file);
      onInteractionComplete();
    },
    [onFileLoaded, onInteractionComplete]
  );

  return (
    <>
      {children({ onClick })}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={onFileChange}
      />
    </>
  );
};

export default AbstractFileLoadButton;
