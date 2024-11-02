import { create } from "zustand";

export const useAssignmentStore = create((set) => ({
  jobPosition: "",
  location: "",
  deptReqAssId: "",
  requestId: "",
  idNumber: "",
  setAssignmentData: (
    jobPosition,
    location,
    deptReqAssId,
    requestId,
    idNumber
  ) => set({ jobPosition, location, deptReqAssId, requestId, idNumber }), // Updated to include deptReqAssId
  clearAssignmentData: () =>
    set({
      jobPosition: "",
      location: "",
      deptReqAssId: "",
      requestId: "",
      idNumber: "",
    }), // Clear deptReqAssId as well
}));

// import { create } from "zustand";

// export const useAssignmentStore = create((set) => ({
//   jobPosition: "",
//   location: "",
//   setAssignmentData: (jobPosition, location) => set({ jobPosition, location }),
//   clearAssignmentData: () => set({ jobPosition: "", location: "" }),
// }));
