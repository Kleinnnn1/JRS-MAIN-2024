import { create } from "zustand";

export const useAssignmentStore = create((set) => ({
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

// import { create } from "zustand";

// export const useAssignmentStore = create((set) => ({
//   jobPosition: "",
//   location: "",
//   deptReqAssId: "",
//   requestId: "",
//   idNumber: "",
//   setAssignmentData: (
//     jobPosition,
//     location,
//     deptReqAssId,
//     requestId,
//     idNumber
//   ) => set({ jobPosition, location, deptReqAssId, requestId, idNumber }), // Updated to include deptReqAssId
//   clearAssignmentData: () =>
//     set({
//       jobPosition: "",
//       location: "",
//       deptReqAssId: "",
//       requestId: "",
//       idNumber: "",
//     }), // Clear deptReqAssId as well
// }));

// import { create } from "zustand";

// export const useAssignmentStore = create((set) => ({
//   jobPosition: "",
//   location: "",
//   setAssignmentData: (jobPosition, location) => set({ jobPosition, location }),
//   clearAssignmentData: () => set({ jobPosition: "", location: "" }),
// }));
