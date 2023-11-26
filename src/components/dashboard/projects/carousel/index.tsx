import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { Thumb } from "./carousel-thumb";
import "./carousel-css.css";
import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-arrow";
import { cn } from "@/lib/utils";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  imageByIndex: (index: number) => string;
  showArrows?: boolean;
  showThumbs?: boolean;
  fullWidth?: boolean;
  height?: string;
  className?: string;
} & (
  | {
      canDelete: true;
      onDelete: (index: number) => void;
    }
  | {
      canDelete?: false;
      onDelete?: never;
    }
);
const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const slideHeight =
    props.height === "lg"
      ? `![--slide-height:19rem]`
      : `![--slide-height:10rem]`;

  return (
    <div
      className={cn(
        "embla",
        props.height && `${slideHeight}`,
        (props.fullWidth || slides.length === 1) && "![--slide-size:100%]",
        props.className
      )}
    >
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={props.imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>
      {props.showArrows && slides.length > 0 && (
        <div
          className={cn("embla__buttons", !props?.showThumbs && "!bottom-1")}
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      )}

      {props?.showThumbs && (
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((index) =>
                props.canDelete ? (
                  <Thumb
                    onDelete={() => props.onDelete(index)}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={props.imageByIndex(index)}
                    key={index}
                  />
                ) : (
                  <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={props.imageByIndex(index)}
                    key={index}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
