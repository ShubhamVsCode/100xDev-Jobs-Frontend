import { getObjectURL } from "@/lib/utils";
import React from "react";

const ProfileHead = ({
  name,
  designation = "Learner",
  imgUrl,
}: {
  name: string;
  designation?: string;
  imgUrl: string;
}) => {
  return (
    <div className="relative">
      <div className="profile-head bg-gradient-to-b from-[#6237DD] to-transparent h-36 overflow-visible"></div>
      <div className="h-36 absolute top-0">
        <div className="flex items-center gap-5 px-6 pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getObjectURL(imgUrl)}
            alt="avatar"
            className="rounded-full border w-[80px] h-[80px]"
          />
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-sm">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
