import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SearchBar from "../../../components/SearchBar";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { insertStaff } from "../../../service/apiAssignStaff";

export default function FormAssignStaff() {
  const { handleSubmit, reset } = useForm();

  // Fetch jobPosition and location from Zustand store
  const { jobPosition, location } = useAssignmentStore((state) => ({
    jobPosition: state.jobPosition,
    location: state.location,
  }));

  const staffName = {
    Electrician: ["Rey Telven", "Leonil M. Sumanting", "Astromer Lantaca, RME"],
    "Cluster Leader": ["Maribojoc, Roger", "Infante, Joan"],
    Welder: ["ERICH, RANGEL"],
    "Street Sweeper & Ground Sweeper": [
      "Agnes, Karl Frederick Von",
      "Concon, Terson",
      "Pacudan, Ramil",
      "Tampoy, Ramiro",
      "Umpay, Sonny",
    ],
    "Tile Setter": ["EDWIN, TAYTAY"],
    Plumber: ["JHONROY, SALDUA"],
    "Aircon Technicians": [
      "Yamie B. Facturanan Jr.",
      "Johnry Buayaban Llagas",
      "Edman Marc Duterte",
    ],
    Carpenter: ["RODENDS, ENDAB", "GERSON, GUYO"],
    "Elevator Attendants": ["James Lister B. Doday", "John Rey Bactong"],
    Busser: ["Baguio, Leonard"],
    "Gardener/Landscaper": [
      "Berdin, Lito",
      "Bolongaita, Ronie",
      "Calderon, Sephfierd",
      "Sano, Rodel",
      "Saraus, Vilmo",
    ],
    Housekeeper: [
      "Amper, Ariel",
      "Acebu, Bryan",
      "Apus, Nolejun",
      "Bacong, Teodora",
      "Balbutin, Amor",
      "Calderon, Alex",
      "Colanse, Dexter",
      "Dacaya, Michael",
      "De Lima, Gerald",
      "Edrote, Emmanuel",
      "Esid, Joelito",
      "Intia, Vilma",
      "Gustilo, Mario",
      "Guidaben, Margie",
      "Mendoza, Mark Anthony",
      "Mabalatan, Nilo",
      "Missiona, Jessa Mae Jenn",
      "Navarro, Gerry",
      "Odchigue, Ruel",
      "Olano, Joel",
      "Ompoc, Allan",
      "Pajullas, Jerome",
      "Quiño, Michael",
      "Repal, Ricky",
      "Saldua, Jomark",
      "Taglinao, Warren",
    ],
    Engineer: ["LONGAKIT, JEANLOVE"],
    Foreman: ["GIL, LADERA"],
    Architect: ["NALINGPONGUIT, DAHLIA"],
    Painter: [
      "RODEL, DOSOL",
      "ORLANDO, OSIAS JR.",
      "MANUTA, RINGHARD",
      "CARLITO, CASIA",
    ],
    Draftsman: ["SABANDAL, BABY JOY", "INTONG, REY JUSTINE D."],
    "Gymnasium Staff": ["Ronald Cadampog", "Jory V. Gallogo", "Gerald Catubig"],
    "Campus Grass & Bushes Maintainer": [
      "Pantonial, Carmelito",
      "Balbutin, Junmar",
    ],
    Laborer: [
      "ROBERTO, ABOGAA",
      "PALAGTIW, IAN DEXTER",
      "KIM, YANA",
      "JOSE, MAÑUS",
      "JERRY, PATAY JR.",
    ],
  };

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      jobPosition: jobPosition || "",
      location: location || "",
      staffName: "",
    },
  ]);

  // Update the assignments when the jobPosition and location from Zustand store change
  useEffect(() => {
    setAssignments((currentAssignments) => {
      return currentAssignments.map((assignment, index) =>
        index === 0 // Only set on the first row or modify as per requirement
          ? {
              ...assignment,
              jobPosition: jobPosition || assignment.jobPosition,
              location: location || assignment.location,
            }
          : assignment
      );
    });
  }, [jobPosition, location]);

  const handleAddRow = () => {
    setAssignments([
      ...assignments,
      {
        id: assignments.length + 1,
        jobPosition: jobPosition || "",
        location: location || "",
        staffName: "",
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment
      )
    );
  };

  const onSubmit = async () => {
    const hasEmptyFields = assignments.some(
      (assignment) =>
        !assignment.jobPosition || !assignment.location || !assignment.staffName
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    try {
      // Loop through each assignment and insert staff
      for (const assignment of assignments) {
        await insertStaff({
          staffName: assignment.staffName,
          jobPosition: assignment.jobPosition, // Add other fields if necessary
        });
      }
      toast.success("Staff assignment(s) successfully submitted.");
      reset();
      setAssignments([
        {
          id: 1,
          jobPosition: jobPosition || "",
          location: location || "",
          staffName: "",
        },
      ]);
    } catch (error) {
      console.error("Failed to assign staff:", error);
      toast.error("An error occurred while assigning staff. Please try again.");
    }
  };

  return (
    <div className="rounded-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Assign Staff" />
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">No. of Staff</th>
                <th className="px-4 py-2 border">Job Position</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Staff Name</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.id}>
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      value={assignment.jobPosition}
                      onChange={(e) =>
                        handleInputChange(
                          assignment.id,
                          "jobPosition",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      value={assignment.location}
                      onChange={(e) =>
                        handleInputChange(
                          assignment.id,
                          "location",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={assignment.staffName}
                      onChange={(e) =>
                        handleInputChange(
                          assignment.id,
                          "staffName",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      required
                    >
                      {staffName[assignment.jobPosition]?.map((staff, idx) => (
                        <option key={idx} value={staff}>
                          {staff}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-2 border text-center">
                    {index === assignments.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleAddRow}
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                      >
                        +
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(assignment.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Assign Staff
          </button>
        </div>
      </form>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import SearchBar from "../../../components/SearchBar";
// import { useAssignmentStore } from "../../../store/useAssignmentStore";
// import { insertStaff } from "../../../service/apiAssignStaff";

// export default function FormAssignStaff() {
//   const { handleSubmit, reset } = useForm();

//   // Fetch jobPosition and location from Zustand store
//   const { jobPosition, location } = useAssignmentStore((state) => ({
//     jobPosition: state.jobPosition,
//     location: state.location,
//   }));

//   // const jobCategory = [
//   //   "Electrician",
//   //   "Cluster Leader",
//   //   "Welder",
//   //   "Street Sweeper & Ground Sweeper",
//   //   "Tile Setter",
//   //   "Plumber",
//   //   "Aircon Technicians",
//   //   "Carpenter",
//   //   "Elevator Attendants",
//   //   "Busser",
//   //   "Gardener/Landscaper",
//   //   "Housekeeper",
//   //   "Engineer",
//   //   "Foreman",
//   //   "Architect",
//   //   "Painter",
//   //   "Draftsman",
//   //   "Gymnasium Staff",
//   //   "Campus Grass & Bushes Maintainer",
//   //   "Laborer",
//   // ];

//   const staffName = {
//     Electrician: ["Rey Telven", "Leonil M. Sumanting", "Astromer Lantaca, RME"],
//     "Cluster Leader": ["Maribojoc, Roger", "Infante, Joan"],
//     Welder: ["ERICH, RANGEL"],
//     "Street Sweeper & Ground Sweeper": [
//       "Agnes, Karl Frederick Von",
//       "Concon, Terson",
//       "Pacudan, Ramil",
//       "Tampoy, Ramiro",
//       "Umpay, Sonny",
//     ],
//     "Tile Setter": ["EDWIN, TAYTAY"],
//     Plumber: ["JHONROY, SALDUA"],
//     "Aircon Technicians": [
//       "Yamie B. Facturanan Jr.",
//       "Johnry Buayaban Llagas",
//       "Edman Marc Duterte",
//     ],
//     Carpenter: ["RODENDS, ENDAB", "GERSON, GUYO"],
//     "Elevator Attendants": ["James Lister B. Doday", "John Rey Bactong"],
//     Busser: ["Baguio, Leonard"],
//     "Gardener/Landscaper": [
//       "Berdin, Lito",
//       "Bolongaita, Ronie",
//       "Calderon, Sephfierd",
//       "Sano, Rodel",
//       "Saraus, Vilmo",
//     ],
//     Housekeeper: [
//       "Amper, Ariel",
//       "Acebu, Bryan",
//       "Apus, Nolejun",
//       "Bacong, Teodora",
//       "Balbutin, Amor",
//       "Calderon, Alex",
//       "Colanse, Dexter",
//       "Dacaya, Michael",
//       "De Lima, Gerald",
//       "Edrote, Emmanuel",
//       "Esid, Joelito",
//       "Intia, Vilma",
//       "Gustilo, Mario",
//       "Guidaben, Margie",
//       "Mendoza, Mark Anthony",
//       "Mabalatan, Nilo",
//       "Missiona, Jessa Mae Jenn",
//       "Navarro, Gerry",
//       "Odchigue, Ruel",
//       "Olano, Joel",
//       "Ompoc, Allan",
//       "Pajullas, Jerome",
//       "Quiño, Michael",
//       "Repal, Ricky",
//       "Saldua, Jomark",
//       "Taglinao, Warren",
//     ],
//     Engineer: ["LONGAKIT, JEANLOVE"],
//     Foreman: ["GIL, LADERA"],
//     Architect: ["NALINGPONGUIT, DAHLIA"],
//     Painter: [
//       "RODEL, DOSOL",
//       "ORLANDO, OSIAS JR.",
//       "MANUTA, RINGHARD",
//       "CARLITO, CASIA",
//     ],
//     Draftsman: ["SABANDAL, BABY JOY", "INTONG, REY JUSTINE D."],
//     "Gymnasium Staff": ["Ronald Cadampog", "Jory V. Gallogo", "Gerald Catubig"],
//     "Campus Grass & Bushes Maintainer": [
//       "Pantonial, Carmelito",
//       "Balbutin, Junmar",
//     ],
//     Laborer: [
//       "ROBERTO, ABOGAA",
//       "PALAGTIW, IAN DEXTER",
//       "KIM, YANA",
//       "JOSE, MAÑUS",
//       "JERRY, PATAY JR.",
//     ],
//   };

//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       jobPosition: jobPosition || "", // Initialize with Zustand values
//       location: location || "",
//       staffName: "",
//     },
//   ]);

//   // Update the assignments when the jobPosition and location from Zustand store change
//   useEffect(() => {
//     setAssignments((currentAssignments) => {
//       return currentAssignments.map((assignment, index) =>
//         index === 0 // Only set on the first row or modify as per requirement
//           ? {
//               ...assignment,
//               jobPosition: jobPosition || assignment.jobPosition,
//               location: location || assignment.location,
//             }
//           : assignment
//       );
//     });
//   }, [jobPosition, location]);

//   const handleAddRow = () => {
//     setAssignments([
//       ...assignments,
//       {
//         id: assignments.length + 1,
//         jobPosition: jobPosition || "", // Optionally initialize with Zustand values
//         location: location || "",
//         staffName: "",
//       },
//     ]);
//   };

//   const handleRemoveRow = (id) => {
//     if (assignments.length > 1) {
//       setAssignments(assignments.filter((assignment) => assignment.id !== id));
//     }
//   };

//   const handleInputChange = (id, field, value) => {
//     setAssignments(
//       assignments.map((assignment) =>
//         assignment.id === id ? { ...assignment, [field]: value } : assignment
//       )
//     );
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = assignments.some(
//       (assignment) =>
//         !assignment.jobPosition || !assignment.location || !assignment.staffName
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     toast.success("Staff assignment(s) successfully submitted.");
//     reset();
//     setAssignments([
//       {
//         id: 1,
//         jobPosition: jobPosition || "", // Reset with Zustand values if needed
//         location: location || "",
//         staffName: "",
//       },
//     ]);
//   };

//   return (
//     <div className="rounded-lg">
//       <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
//         <SearchBar title="Assign Staff" />
//       </header>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border text-center">No. of Staff</th>
//                 <th className="px-4 py-2 border">Job Position</th>
//                 <th className="px-4 py-2 border">Location</th>
//                 <th className="px-4 py-2 border">Staff Name</th>
//                 <th className="px-4 py-2 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignments.map((assignment, index) => (
//                 <tr key={assignment.id}>
//                   <td className="px-4 py-2 border text-center">{index + 1}</td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="text"
//                       value={assignment.jobPosition}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "jobPosition",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       disabled
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="text"
//                       value={assignment.location}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "location",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       disabled
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={assignment.staffName}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "staffName",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       required
//                     >
//                       {staffName[assignment.jobPosition]?.map((staff, idx) => (
//                         <option key={idx} value={staff}>
//                           {staff}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   <td className="px-4 py-2 border text-center">
//                     {index === assignments.length - 1 ? (
//                       <button
//                         type="button"
//                         onClick={handleAddRow}
//                         className="bg-green-600 text-white px-2 py-1 rounded mr-2"
//                       >
//                         +
//                       </button>
//                     ) : null}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveRow(assignment.id)}
//                       className="bg-red-600 text-white px-2 py-1 rounded"
//                     >
//                       -
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="p-4 flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Assign Staff
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

// export default function FormAssignStaff() {
//   const { handleSubmit, reset } = useForm();

//   const bgmsStaff = [
//     "Olano, Joel",
//     "Baguio, Leonard",
//     "Tampoy, Ramiro",
//     "Amper, Ariel",
//     "Odchigue, Ruel",
//     "Ompoc, Allan",
//     "Saraus, Vilmo",
//     "Pajullas, Jerome",
//     "Navarro, Gerry",
//     "Saldua, Jomark",
//     "Calderon, Alex",
//     "Apus, Nolejun",
//     "Sano, Rodel",
//     "Mendoza, Mark Anthony",
//     "Balbutin, Junmar",
//     "Bolongaita, Ronie",
//     "Missiona, Jessa Mae Jenn",
//     "De Lima, Gerald",
//     "Acebu, Bryan",
//     "Guidaben, Margie",
//     "Pantonial, Carmelito",
//     "Calderon, Sephfierd",
//     "Edrote, Emmanuel",
//     "Umpay, Sonny",
//     "Berdin, Lito",
//     "Repal, Ricky",
//     "Intia, Vilma",
//     "Balbutin, Amor",
//     "Mabalatan, Nilo",
//     "Maribojoc, Roger",
//     "Taglinao, Warren",
//     "Esid, Joelito",
//     "Quiño, Michael",
//     "Bacong, Teodora",
//     "Gustilo, Mario",
//     "Dacaya, Michael",
//     "Infante, Joan",
//     "Agnes, Karl Frederick Von",
//     "Colanse, Dexter",
//     "Pacudan, Ramil",
//     "Concon, Terson",
//   ];

//   const cswsStaff = [
//     "ROBERTO, ABOGAA",
//     "PALAGTIW, IAN DEXTER",
//     "KIM, YANA",
//     "JOSE, MAÑUS",
//     "JERRY, PATAY JR.",
//     "RODEL, DOSOL",
//     "ORLANDO, OSIAS JR.",
//     "MANUTA, RINGHARD",
//     "JHONROY, SALDUA",
//     "EDWIN, TAYTAY",
//     "CARLITO, CASIA",
//     "ERICH, RANGEL",
//     "GERSON, GUYO",
//     "RODENDS, ENDAB",
//     "GIL, LADERA",
//     "SABANDAL, BABY JOY",
//     "INTONG, REY JUSTINE D.",
//     "LONGAKIT, JEANLOVE",
//     "NALINGPONGUIT, DAHLIA",
//   ];

//   const mewsStaff = [
//     "Ronald Cadampog",
//     "Jory V. Gallogo",
//     "Gerald Catubig",
//     "John Rey Bactong",
//     "James Lister B. Doday",
//     "Rey Telven",
//     "Randy Perez",
//     "Leonil M. Sumanting",
//     "Astromer Lantaca, RME",
//     "Yamie B. Facturanan Jr.",
//     "Johnry Buayaban Llagas",
//     "Edman Marc Duterte",
//   ];

//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       staffName: "",
//       department: "BGMS",
//       taskDescription: "",
//       priority: "Low",
//     },
//   ]);

//   const priorityOptions = ["Low", "Medium", "High"];

//   const handleAddRow = () => {
//     setAssignments([
//       ...assignments,
//       {
//         id: assignments.length + 1,
//         staffName: "",
//         department: "BGMS",
//         taskDescription: "",
//         priority: "Low",
//       },
//     ]);
//   };

//   const handleRemoveRow = (id) => {
//     if (assignments.length > 1) {
//       setAssignments(assignments.filter((assignment) => assignment.id !== id));
//     }
//   };

//   const handleInputChange = (id, field, value) => {
//     setAssignments(
//       assignments.map((assignment) =>
//         assignment.id === id ? { ...assignment, [field]: value } : assignment
//       )
//     );
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = assignments.some(
//       (assignment) =>
//         !assignment.staffName ||
//         !assignment.department ||
//         !assignment.taskDescription ||
//         !assignment.priority
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     toast.success("Staff assignment(s) successfully submitted.");
//     reset();
//     setAssignments([
//       {
//         id: 1,
//         staffName: "",
//         department: "BGMS",
//         taskDescription: "",
//         priority: "Low",
//       },
//     ]);
//   };

//   return (
//     <div className="rounded-lg">
//       <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
//         <h2>Staff Assignment Form</h2>
//       </header>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border text-center">Item No.</th>
//                 <th className="px-4 py-2 border">Staff Name</th>
//                 <th className="px-4 py-2 border">Department</th>
//                 <th className="px-4 py-2 border">Task Description</th>
//                 <th className="px-4 py-2 border">Priority</th>
//                 <th className="px-4 py-2 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignments.map((assignment, index) => (
//                 <tr key={assignment.id}>
//                   <td className="px-4 py-2 border text-center">{index + 1}</td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={assignment.staffName}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "staffName",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       required
//                     >
//                       <option value="">Select Staff</option>
//                       {[assignment.department].map((staff, idx) => (
//                         <option key={idx} value={staff}>
//                           {staff}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={assignment.department}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "department",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       required
//                     >
//                       {Object.keys().map((department) => (
//                         <option key={department} value={department}>
//                           {department}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="text"
//                       value={assignment.taskDescription}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "taskDescription",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       required
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={assignment.priority}
//                       onChange={(e) =>
//                         handleInputChange(
//                           assignment.id,
//                           "priority",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       required
//                     >
//                       {priorityOptions.map((priority, idx) => (
//                         <option key={idx} value={priority}>
//                           {priority}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveRow(assignment.id)}
//                       className="bg-red-600 text-white px-2 py-1 rounded"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="p-4">
//           <button
//             type="button"
//             onClick={handleAddRow}
//             className="bg-green-600 text-white px-4 py-2 rounded mr-2"
//           >
//             Add Row
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Submit Assignments
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
