import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRequest } from "../../../service/apiRequestorRequestTable";
import toast from "react-hot-toast";
import supabase from "../../../service/supabase"; // Assume you've initialized Supabase in a separate file

export default function RequestorJobRequestForm({ closeModal }) {
  const { handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [jobRequests, setJobRequests] = useState([
    {
      id: 1,
      description: "",
      location: "",
      category: "Carpenter",
      photo: null,
      priority: "",
    },
  ]);
  const [keywordMapping, setKeywordMapping] = useState({});
  const priorityOptions = ["Low", "Medium", "High"];

  // Fetch the keyword mappings from Supabase
  useEffect(() => {
    const fetchKeywordMappings = async () => {
      const { data, error } = await supabase
        .from("keyword_mappings")
        .select("category, keyword");

      if (error) {
        toast.error(error.message);
      } else {
        const mapping = data.reduce((acc, { category, keyword }) => {
          if (!acc[category]) acc[category] = [];
          acc[category].push(keyword);
          return acc;
        }, {});
        setKeywordMapping(mapping);
      }
    };

    fetchKeywordMappings();
  }, []);

  const { mutate } = useMutation({
    mutationFn: insertRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleAddRow = () => {
    if (jobRequests.length < 9) {
      setJobRequests([
        ...jobRequests,
        {
          id: jobRequests.length + 1,
          description: "",
          location: "",
          category: "",
          photo: null,
          priority: "",
        },
      ]);
    } else {
      toast.error("You can only add up to 9 job requests.");
    }
  };

  const handleRemoveRow = (id) => {
    if (jobRequests.length > 1) {
      setJobRequests(jobRequests.filter((request) => request.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setJobRequests(
      jobRequests.map((request) => {
        if (request.id === id) {
          let updatedRequest = { ...request, [field]: value };

          if (field === "description" && keywordMapping) {
            const matchedJob = Object.keys(keywordMapping).find((job) =>
              keywordMapping[job].some((keyword) =>
                value.toLowerCase().includes(keyword)
              )
            );

            updatedRequest = {
              ...updatedRequest,
              category: matchedJob || "", // Set category if matched, else keep empty
            };
          }

          return updatedRequest;
        }
        return request;
      })
    );
  };

  const onSubmit = async () => {
    const hasEmptyFields = jobRequests.some(
      (request) =>
        !request.description ||
        !request.location ||
        !request.category ||
        !request.priority
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    try {
      const formattedRequests = await Promise.all(
        jobRequests.map(async (request) => {
          let imageFile = request.photo;

          // If there's an image, upload it
          if (imageFile) {
            const imageName = `${Date.now()}_${imageFile.name}`;
            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from("request_image")
                .upload(imageName, imageFile);

            if (uploadError) {
              console.error("Error uploading image:", uploadError);
              toast.error("Image upload failed");
              throw uploadError;
            }

            const { data: publicUrlData } = supabase.storage
              .from("request_image")
              .getPublicUrl(imageName);

            imageFile = publicUrlData?.publicUrl || null;
          }

          // Log to verify the imageFile is processed correctly
          console.log("Processed Request Data:", {
            description: request.description,
            location: request.location,
            jobCategory: request.category,
            image: imageFile, // Log the uploaded image URL
            priority: request.priority,
          });

          return {
            description: request.description,
            location: request.location,
            jobCategory: request.category,
            image: imageFile, // Use the uploaded image URL
            priority: request.priority,
          };
        })
      );

      // Log the entire formatted requests array
      console.log("Final Formatted Requests to Submit:", formattedRequests);

      formattedRequests.forEach((formattedData) => {
        mutate(formattedData);
      });

      toast.success("Your job request(s) have been submitted successfully.");
      navigate("/requestor/job_request_table");
      closeModal();

      setJobRequests([
        {
          id: 1,
          description: "",
          location: "",
          category: "",
          photo: null,
          priority: "",
        },
      ]);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to submit job request(s).");
    }
  };

  return (
    <div className="rounded-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <SearchBar title="Job Request Form" />
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">Item No.</th>
                <th className="px-4 py-2 border">Job Description</th>
                <th className="px-4 py-2 border">Location (Bldg/Office)</th>
                <th className="px-4 py-2 border">Job Category</th>
                <th className="px-4 py-2 border">Photo (OPTIONAL)</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobRequests.map((request, index) => (
                <tr key={request.id}>
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      id={`description-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.description}
                      onChange={(e) =>
                        handleInputChange(
                          request.id,
                          "description",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      id={`location-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.location}
                      onChange={(e) =>
                        handleInputChange(
                          request.id,
                          "location",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      id={`category-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.category}
                      onChange={(e) =>
                        handleInputChange(
                          request.id,
                          "category",
                          e.target.value
                        )
                      }
                      required
                    >
                      {Object.keys(keywordMapping).map((category, idx) => (
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="file"
                      id={`photo-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      onChange={(e) =>
                        handleInputChange(
                          request.id,
                          "photo",
                          e.target.files[0]
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      id={`priority-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.priority || ""}
                      onChange={(e) =>
                        handleInputChange(
                          request.id,
                          "priority",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="" className="hidden">
                        Select
                      </option>
                      {priorityOptions.map((priority, idx) => (
                        <option key={idx} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(request.id)}
                        className={`bg-red-600 text-white px-3 py-1 rounded-md ${
                          jobRequests.length === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={jobRequests.length === 1}
                      >
                        -
                      </button>
                      {index === jobRequests.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddRow}
                          className="bg-green-600 text-white px-3 py-1 rounded-md"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

RequestorJobRequestForm.propTypes = {
  onSubmit: PropTypes.func,
};

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../../../components/SearchBar";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { insertRequest } from "../../../service/apiRequestorRequestTable";
// import toast from "react-hot-toast";
// import supabase from "../../../service/supabase"; // Assume you've initialized Supabase in a separate file

// export default function RequestorJobRequestForm({ closeModal }) {
//   const { handleSubmit, reset } = useForm();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [jobRequests, setJobRequests] = useState([
//     {
//       id: 1,
//       description: "",
//       location: "",
//       category: "Carpenter",
//       photo: null,
//       priority: "",
//     },
//   ]);
//   const [keywordMapping, setKeywordMapping] = useState({});
//   const priorityOptions = ["Low", "Medium", "High"];

//   // Fetch the keyword mappings from Supabase
//   useEffect(() => {
//     const fetchKeywordMappings = async () => {
//       const { data, error } = await supabase
//         .from("keyword_mappings")
//         .select("category, keyword");

//       if (error) {
//         toast.error(error.message);
//       } else {
//         const mapping = data.reduce((acc, { category, keyword }) => {
//           if (!acc[category]) acc[category] = [];
//           acc[category].push(keyword);
//           return acc;
//         }, {});
//         setKeywordMapping(mapping);
//       }
//     };

//     fetchKeywordMappings();
//   }, []);

//   const { mutate } = useMutation({
//     mutationFn: insertRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["requests"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const handleAddRow = () => {
//     if (jobRequests.length < 9) {
//       setJobRequests([
//         ...jobRequests,
//         {
//           id: jobRequests.length + 1,
//           description: "",
//           location: "",
//           category: "",
//           photo: null,
//           priority: "",
//         },
//       ]);
//     } else {
//       toast.error("You can only add up to 9 job requests.");
//     }
//   };

//   const handleRemoveRow = (id) => {
//     if (jobRequests.length > 1) {
//       setJobRequests(jobRequests.filter((request) => request.id !== id));
//     }
//   };

//   const handleInputChange = (id, field, value) => {
//     setJobRequests(
//       jobRequests.map((request) => {
//         if (request.id === id) {
//           let updatedRequest = { ...request, [field]: value };

//           if (field === "description" && keywordMapping) {
//             const matchedJob = Object.keys(keywordMapping).find((job) =>
//               keywordMapping[job].some((keyword) =>
//                 value.toLowerCase().includes(keyword)
//               )
//             );

//             updatedRequest = {
//               ...updatedRequest,
//               category: matchedJob || "", // Set category if matched, else keep empty
//             };
//           }

//           return updatedRequest;
//         }
//         return request;
//       })
//     );
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = jobRequests.some(
//       (request) =>
//         !request.description ||
//         !request.location ||
//         !request.category ||
//         !request.priority
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     const formattedRequests = jobRequests.map((request) => ({
//       description: request.description,
//       location: request.location,
//       jobCategory: request.category,
//       image: request.photo,
//       priority: request.priority,
//     }));

//     formattedRequests.forEach((formattedData) => {
//       mutate(formattedData);
//     });

//     toast.success("Your job request(s) have been submitted successfully.");
//     navigate("/requestor/job_request_table");
//     closeModal();

//     setJobRequests([
//       {
//         id: 1,
//         description: "",
//         location: "",
//         category: "",
//         photo: null,
//         priority: "",
//       },
//     ]);
//   };

//   return (
//     <div className="rounded-lg">
//       <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
//         <div>
//           <SearchBar title="Job Request Form" />
//         </div>
//       </header>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border text-center">Item No.</th>
//                 <th className="px-4 py-2 border">Job Description</th>
//                 <th className="px-4 py-2 border">Location (Bldg/Office)</th>
//                 <th className="px-4 py-2 border">Job Category</th>
//                 <th className="px-4 py-2 border">Photo (OPTIONAL)</th>
//                 <th className="px-4 py-2 border">Priority</th>
//                 <th className="px-4 py-2 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobRequests.map((request, index) => (
//                 <tr key={request.id}>
//                   <td className="px-4 py-2 border text-center">{index + 1}</td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="text"
//                       id={`description-${request.id}`}
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       value={request.description}
//                       onChange={(e) =>
//                         handleInputChange(
//                           request.id,
//                           "description",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="text"
//                       id={`location-${request.id}`}
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       value={request.location}
//                       onChange={(e) =>
//                         handleInputChange(
//                           request.id,
//                           "location",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       id={`category-${request.id}`}
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       value={request.category}
//                       onChange={(e) =>
//                         handleInputChange(
//                           request.id,
//                           "category",
//                           e.target.value
//                         )
//                       }
//                       required
//                     >
//                       {Object.keys(keywordMapping).map((category, idx) => (
//                         <option key={idx} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <input
//                       type="file"
//                       id={`photo-${request.id}`}
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       onChange={(e) =>
//                         handleInputChange(
//                           request.id,
//                           "photo",
//                           e.target.files[0]
//                         )
//                       }
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       id={`priority-${request.id}`}
//                       className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                       value={request.priority || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           request.id,
//                           "priority",
//                           e.target.value
//                         )
//                       }
//                       required
//                     >
//                       <option value="" className="hidden">
//                         Select
//                       </option>
//                       {priorityOptions.map((priority, idx) => (
//                         <option key={idx} value={priority}>
//                           {priority}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveRow(request.id)}
//                         className={`bg-red-600 text-white px-3 py-1 rounded-md ${
//                           jobRequests.length === 1
//                             ? "opacity-50 cursor-not-allowed"
//                             : ""
//                         }`}
//                         disabled={jobRequests.length === 1}
//                       >
//                         -
//                       </button>
//                       {index === jobRequests.length - 1 && (
//                         <button
//                           type="button"
//                           onClick={handleAddRow}
//                           className="bg-green-600 text-white px-3 py-1 rounded-md"
//                         >
//                           +
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded-md"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// RequestorJobRequestForm.propTypes = {
//   onSubmit: PropTypes.func,
// };
