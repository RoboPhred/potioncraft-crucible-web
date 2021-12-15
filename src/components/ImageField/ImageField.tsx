import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

import { extname } from "@/paths";

import { useBooleanSetState } from "@/hooks/use-boolean-state";

import Button from "../Button";
import AbstractFileLoadButton from "../AbstractFileLoadButton";

export interface ImageFieldProps {
  imageResource: Uint8Array | null;
  imageResourceName: string | null;
  desiredWidth: number;
  desiredHeight: number;
  onChange(image: Uint8Array, resourceName: string): void;
}

const ImageField = ({
  imageResource,
  imageResourceName,
  desiredWidth,
  desiredHeight,
  onChange,
}: ImageFieldProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const imageUrl = React.useMemo(() => {
    if (imageResource == null || imageResourceName == null) {
      return null;
    }
    return URL.createObjectURL(
      new Blob([imageResource.buffer], {
        type: `image/${extname(imageResourceName)}`,
      })
    );
  }, [imageResource, imageResourceName]);

  const onFileLoaded = React.useCallback(
    (file: File) => {
      setLoading(true);
      file
        .arrayBuffer()
        .then((buffer) => {
          onChange(new Uint8Array(buffer), file.name);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [onChange]
  );

  return (
    <div
      style={{
        width: `${desiredWidth}px`,
        height: `${desiredHeight}px`,
        overflow: "hidden",
      }}
    >
      {!imageUrl && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "100%",
          }}
        >
          <AbstractFileLoadButton
            accept="image/*"
            onFileLoaded={onFileLoaded}
            disabled={isLoading}
          >
            {(props) => (
              <Button {...props}>
                <FontAwesomeIcon icon={faFileUpload} />
              </Button>
            )}
          </AbstractFileLoadButton>
        </div>
      )}
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
};

export default ImageField;
