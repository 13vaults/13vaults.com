import { ComponentProps, useRef } from "react";
import mediumZoom, { Zoom, ZoomOptions } from "medium-zoom";
import Image from "next/image";

type ImageZoomProps = ComponentProps<typeof Image> & {
  options?: ZoomOptions;
};

export default function ImageZoom({ options, ...props }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom(options);
    }

    return zoomRef.current;
  }

  function attachZoom(image: HTMLImageElement | null) {
    const zoom = getZoom();

    if (image) {
      zoom?.attach(image);
    } else {
      zoom?.detach();
    }
  }

  return <Image {...props} alt={props.alt as string} ref={attachZoom} />;
}
