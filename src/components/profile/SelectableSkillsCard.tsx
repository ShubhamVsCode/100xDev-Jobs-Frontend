import { cn, getObjectURL } from "@/lib/utils";
import { SkillType } from "@/lib/validations/auth";
import { useEffect, useState } from "react";

type propType = SkillType & {
  isSelected: boolean;
  onClickHandler: (skill: SkillType) => void;
};
const SelectableSkillsCard = ({
  _id,
  name,
  level,
  picture,
  slug,
  isSelected,
  onClickHandler,
}: propType) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <div
      className={cn(
        "flex flex-col justify-between items-center border rounded-md border-white/10 px-4 py-2",
        selected && "border-green-500"
      )}
      onClick={() => {
        onClickHandler({ _id, name, level, picture, slug });
        setSelected((prev) => !prev);
      }}
    >
      <p className="">{name}</p>
      <img src={getObjectURL(picture)} alt={name} width={50} height={50} />
    </div>
  );
};

export default SelectableSkillsCard;
