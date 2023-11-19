import { X } from "lucide-react";
import React from "react";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
  onDelete?: () => void | undefined;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props;
  return (
    <div
      className={"embla-thumbs__slide group".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div>
        <img
          className="embla-thumbs__slide__img"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
      {props.onDelete && (
        <button
          onClick={props.onDelete}
          className="absolute top-0 right-0 hidden group-hover:flex bg-black"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
