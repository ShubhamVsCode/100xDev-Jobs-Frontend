import { ProjectType, UserType } from "@/lib/validations/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProjectState {
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  removeProject: () => void;
  setProjectFields: (field: keyof ProjectType, value: string) => void;
  thumbnails: {
    uploaded: string[];
    notUploaded: File[];
  };
  setUploadedThumbnails: (thumbnails: string[]) => void;
  setNotUploadedThumbnails: (thumbnails: File[]) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
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
  thumbnails: {
    uploaded: [],
    notUploaded: [],
  },
  setUploadedThumbnails: (thumbnails) =>
    set((state) => ({
      ...state,
      thumbnails: { ...state.thumbnails, uploaded: thumbnails },
    })),
  setNotUploadedThumbnails: (thumbnails) =>
    set((state) => ({
      ...state,
      thumbnails: { ...state.thumbnails, notUploaded: thumbnails },
    })),
}));

export default useProjectStore;
