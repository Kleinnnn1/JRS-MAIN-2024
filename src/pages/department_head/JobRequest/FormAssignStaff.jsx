import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SearchBar from "../../../components/SearchBar";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { insertStaff } from "../../../service/apiAssignStaff";

export default function FormAssignStaff({ onClose }) {
  const { handleSubmit, reset } = useForm();
  //test commit

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
    console.log("Assignments before submission:", assignments);
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
      onClose();
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
                      <option value="" className="hidden">
                        Select Staff
                      </option>
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
