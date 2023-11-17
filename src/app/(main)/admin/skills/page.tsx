"use client";

import ProfileAPI from "@/api/profile";
import { Button } from "@/components/ui/button";
import { getObjectURL } from "@/lib/utils";
import { SkillType } from "@/lib/validations/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);

  const getAllSkills = async () => {
    const response = (await ProfileAPI.getAllSkills()) as {
      skills: SkillType[];
    };
    const skills = response?.skills;

    setSkills(skills as SkillType[]);
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  return (
    <div className="space-y-5">
      <Link href={"/admin/skills/create"}>
        <Button>Create new skill</Button>
      </Link>
      <section className="grid grid-cols-5 gap-4">
        {skills?.map((skill) => {
          return (
            <div
              className="flex flex-col rounded-md shadow-md border px-5 py-3"
              key={skill._id}
            >
              <p className="text-lg">{skill.name}</p>
              <p className="text-sm">Level: {skill.level}</p>
              <img
                src={getObjectURL(skill.picture)}
                alt=""
                className="w-24 mx-auto"
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AdminSkillsPage;
