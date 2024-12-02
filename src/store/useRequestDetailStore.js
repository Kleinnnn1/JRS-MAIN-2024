import { create } from "zustand";

export const useRequestDetailStore = create((set) => ({
    description: "", // Add description to the state
    jobPosition: "",
    location: "",
    deptReqAssId: "",
    requestId: "",
    idNumber: "",
    setAssignmentData: (
      description, // Include description
      jobPosition,
      location,
      deptReqAssId,
      requestId,
      idNumber
    ) =>
      set({
        description,
        jobPosition,
        location,
        deptReqAssId,
        requestId,
        idNumber,
      }),
    clearAssignmentData: () =>
      set({
        description: "", // Clear description
        jobPosition: "",
        location: "",
        deptReqAssId: "",
        requestId: "",
        idNumber: "",
      }),
  }));
  