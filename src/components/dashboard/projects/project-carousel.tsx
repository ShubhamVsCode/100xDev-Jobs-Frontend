"use client";
import Carousel from "./carousel";
import { getObjectURL } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel-react";

type PropType = {
  images: string[] | undefined;
  options?: EmblaOptionsType;
  showArrows?: boolean;
  showThumbs?: boolean;
  fullWidth?: boolean;
  height?: string;
  className?: string;
};

const ProjectCarousel = ({
  images,
  options,
  className,
  fullWidth,
  height,
  showArrows,
  showThumbs,
}: PropType) => {
  if (!images) {
    return null;
  }
  return (
    <Carousel
      slides={Array.from(Array(images?.length).keys())}
      imageByIndex={(index) => getObjectURL(images?.at(index) as string)}
      showArrows={showArrows}
      fullWidth={fullWidth}
      height={height}
      showThumbs={showThumbs}
      options={options}
      className={className || "!p-0"}
    />
  );
};

export default ProjectCarousel;
