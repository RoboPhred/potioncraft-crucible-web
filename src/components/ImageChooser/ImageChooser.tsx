import * as React from "react";

import { extname } from "@/paths";

export interface ImageChooserProps {
  imageResource: Uint8Array | null;
  imageResourceName: string | null;
  desiredWidth: number;
  desiredHeight: number;
  onChange(image: Uint8Array, resourceName: string): void;
}

const ImageChooser = ({
  imageResource,
  imageResourceName,
  desiredWidth,
  desiredHeight,
  onChange,
}: ImageChooserProps) => {
  const [imageRef, setImageRef] = React.useState<HTMLImageElement | null>(null);
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

  const isOversized =
    imageRef &&
    (imageRef.clientWidth > desiredWidth ||
      imageRef.clientHeight > desiredHeight);

  return (
    <div>
      <div
        style={{
          width: `${desiredWidth}px`,
          height: `${desiredHeight}px`,
          overflow: "hidden",
        }}
      >
        {!imageUrl && <span>No Image Chosen</span>}
        {imageUrl && <img ref={(ref) => setImageRef(ref)} src={imageUrl} />}
        {isOversized &&
          `Image is oversized.  It may not render properly in-game.  Please choose an image that is ${desiredWidth} by ${desiredHeight} or smaller.`}
      </div>
    </div>
  );
};

export default ImageChooser;
