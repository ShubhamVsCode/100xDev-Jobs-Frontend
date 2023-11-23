import { ProjectType, UserType } from "@/lib/validations/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProjectState {
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  removeProject: () => void;
  setProjectFields: (field: keyof ProjectType, value: string) => void;
  thumbnails: File[] | null;
  setThumbnail: (thumbnail: File) => void;
  setThumbnails: (thumbnails: File[]) => void;
}

const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      project: null,
      setProject: (project) => set((state) => ({ ...state, project })),
      removeProject: () => set((state) => ({ ...state, project: null })),
      setProjectFields: (field, value) =>
        set((state) => ({
          ...state,
          project: {
            ...state?.project!,
            [field]: value,
          },
        })),
      thumbnails: null,
      setThumbnail: (thumbnail) =>
        set((state) => ({
          ...state,
          thumbnails: [...state?.thumbnails!, thumbnail],
        })),
      setThumbnails: (thumbnails) =>
        set((state) => ({
          ...state,
          thumbnails,
        })),
    }),
    {
      name: "project-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProjectStore;
