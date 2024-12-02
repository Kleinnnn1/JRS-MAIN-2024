import { create } from "zustand";

export const useRequestDetailStore = create((set) => ({
   
    fullName: "", 
    description: "", 
    jobCategory: "", 
    requestDate: "", 
    location: "", 
    image: "", 
    priority: "", 
    
    setAssignmentData: (
        fullName, // Include description
        description,
        jobCategory,
        requestDate,
        image,
        priority,
    ) =>
      set({
        fullName, // Include description
        description,
        jobCategory,
        requestDate,
        image,
        priority,
      }),
    clearAssignmentData: () =>
      set({
        
    fullName: "", 
    description: "", 
    jobCategory: "", 
    requestDate: "", 
    location: "", 
    image: "", 
    priority: "", 
      }),
  }));
  