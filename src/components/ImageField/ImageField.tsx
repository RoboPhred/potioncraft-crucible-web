import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { extname } from "@/paths";

import Button from "../Button";
import AbstractFileLoadButton from "../AbstractFileLoadButton";

import styles from "./ImageField.module.css";

export interface ImageFieldProps {
  className?: string;
  imageResource: Uint8Array | null;
  imageResourceName: string | null;
  onChange(image: Uint8Array, resourceName: string): void;
}

const ImageField = ({
  className,
  imageResource,
  imageResourceName,
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
      className={classNames(
        styles["imagefield"],
        imageUrl && styles["imagefield--has-image"],
        className
      )}
    >
      <div className={styles["imagefield-upload"]}>
        <AbstractFileLoadButton accept="image/png" onFileLoaded={onFileLoaded}>
          {(props) => (
            <Button {...props} disabled={isLoading}>
              <FontAwesomeIcon color="inherit" icon={faFileUpload} />
            </Button>
          )}
        </AbstractFileLoadButton>
      </div>
      {imageUrl && (
        <div className={styles["imagefield-image-container"]}>
          <img src={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default ImageField;
