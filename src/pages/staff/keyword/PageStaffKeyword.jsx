import React, { useState, useEffect } from "react";
import supabase from "../../../service/supabase"; // Adjust path based on where you set up your Supabase client

// Function to fetch current user's full name and match job category
async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) {
    return null;
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    throw new Error(authError.message);
  }

  const userId = authData?.user?.id;

  // Fetch additional user details from the `User` table using the user's id
  const { data: profileData, error: profileError } = await supabase
    .from("User")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Merge authData with profileData
  return {
    ...authData.user,
    ...profileData,
  };
}

function AddKeyword() {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [keywordsList, setKeywordsList] = useState([]);
  const [staffJobCategory, setStaffJobCategory] = useState("");

  // Fetch keywords for the selected category
  const fetchKeywords = async (category) => {
    if (!category) return;

    const { data, error } = await supabase
      .from("keyword_mappings") // Replace with your table name
      .select("keyword")
      .eq("category", category);

    if (error) {
      setMessage(`Error fetching keywords: ${error.message}`);
    } else {
      setKeywordsList(data);
    }
  };

  // Fetch staff details and match job category
  const fetchStaffJobCategory = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setMessage("User not found.");
        return;
      }

      const { data, error } = await supabase
        .from("Maintenance_staff")
        .select("jobCategory")
        .eq("staffName", user.fullName)
        .single();

      if (error) {
        setMessage(`Error fetching staff job category: ${error.message}`);
      } else {
        setStaffJobCategory(data?.jobCategory || "");
        setCategory(data?.jobCategory || "");
        fetchKeywords(data?.jobCategory); // Fetch keywords for the staff's job category
      }
    } catch (err) {
      setMessage(`Error fetching staff data: ${err.message}`);
    }
  };

  // Handle the category change to fetch the relevant keywords
  useEffect(() => {
    fetchStaffJobCategory(); // Fetch job category and staff details when the component mounts
  }, []);

  useEffect(() => {
    fetchKeywords(category);
  }, [category]);

  // Handle form submission for adding a new keyword
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !keyword) {
      setMessage("Please select a category and enter a keyword.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("keyword_mappings") // Replace with your table name
        .insert([{ category: category, keyword: keyword }]);

      if (error) {
        // Check for duplicate error based on unique constraint violation
        if (error.code === "23505") {
          setMessage(
            `The keyword "${keyword}" is already duplicated in this category.`
          );
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else {
        setMessage(`Keyword "${keyword}" added to category "${category}"`);
        setKeyword("");
        fetchKeywords(category); // Re-fetch the keywords after adding
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  // Handle keyword deletion
  const handleDelete = async (keywordToDelete) => {
    try {
      const { data, error } = await supabase
        .from("keyword_mappings") // Replace with your table name
        .delete()
        .eq("category", category)
        .eq("keyword", keywordToDelete);

      if (error) {
        setMessage(`Error deleting keyword: ${error.message}`);
      } else {
        setMessage(
          `Keyword "${keywordToDelete}" deleted from category "${category}"`
        );
        fetchKeywords(category); // Re-fetch the keywords after deletion
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Add a New Keyword
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Job Category
            </label>
            {/* Replacing the dropdown with a text field */}
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled // Prevent modification of the job category by the user
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="keyword"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Keyword
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter new keyword"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Keyword
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Display Keywords for the Selected Category */}
        {category && keywordsList.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-4">
              {keywordsList.map((item) => (
                <div
                  key={item.keyword}
                  className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full"
                >
                  <span>{item.keyword}</span>
                  <button
                    onClick={() => handleDelete(item.keyword)}
                    className="text-red-600 hover:text-red-800"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddKeyword;

// import React, { useState, useEffect } from "react";
// import supabase from "../../../service/supabase"; // Adjust path based on where you set up your Supabase client

// function AddKeyword() {
//   const [category, setCategory] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [message, setMessage] = useState("");
//   const [keywordsList, setKeywordsList] = useState([]);

//   // Fetch keywords for the selected category
//   const fetchKeywords = async (category) => {
//     if (!category) return;

//     const { data, error } = await supabase
//       .from("keyword_mappings") // Replace with your table name
//       .select("keyword")
//       .eq("category", category);

//     if (error) {
//       setMessage(`Error fetching keywords: ${error.message}`);
//     } else {
//       setKeywordsList(data);
//     }
//   };

//   // Handle the category change to fetch the relevant keywords
//   useEffect(() => {
//     fetchKeywords(category);
//   }, [category]);

//   // Handle form submission for adding a new keyword
//   // Handle form submission for adding a new keyword
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category || !keyword) {
//       setMessage("Please select a category and enter a keyword.");
//       return;
//     }

//     try {
//       const { data, error } = await supabase
//         .from("keyword_mappings") // Replace with your table name
//         .insert([{ category: category, keyword: keyword }]);

//       if (error) {
//         // Check for duplicate error based on unique constraint violation
//         if (error.code === "23505") {
//           // Unique constraint violation error code
//           setMessage(
//             `The keyword "${keyword}" is already duplicated in this category.`
//           );
//         } else {
//           setMessage(`Error: ${error.message}`);
//         }
//       } else {
//         setMessage(`Keyword "${keyword}" added to category "${category}"`);
//         setKeyword("");
//         fetchKeywords(category); // Re-fetch the keywords after adding
//       }
//     } catch (err) {
//       setMessage(`Error: ${err.message}`);
//     }
//   };

//   // Handle keyword deletion
//   const handleDelete = async (keywordToDelete) => {
//     try {
//       const { data, error } = await supabase
//         .from("keyword_mappings") // Replace with your table name
//         .delete()
//         .eq("category", category)
//         .eq("keyword", keywordToDelete);

//       if (error) {
//         setMessage(`Error deleting keyword: ${error.message}`);
//       } else {
//         setMessage(
//           `Keyword "${keywordToDelete}" deleted from category "${category}"`
//         );
//         fetchKeywords(category); // Re-fetch the keywords after deletion
//       }
//     } catch (err) {
//       setMessage(`Error: ${err.message}`);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
//           Add a New Keyword
//         </h2>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex flex-col">
//             <label
//               htmlFor="category"
//               className="text-sm font-medium text-gray-600 mb-2"
//             >
//               Job Category
//             </label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="" className="hidden">
//                 Select Category
//               </option>
//               <option value="Electrician">Electrician</option>
//               <option value="Carpenter">Carpenter</option>
//               <option value="Plumber">Plumber</option>
//               <option value="Welder">Welder</option>
//               <option value="Housekeeper">Housekeeper</option>
//               <option value="Cluster Leader">Cluster Leader</option>
//               <option value="Street Sweeper & Ground Sweeper">
//                 Street Sweeper & Ground Sweeper
//               </option>
//               <option value="Tile Setter">Tile Setter</option>
//               <option value="Aircon Technicians">Aircon Technicians</option>
//               <option value="Elevator Attendants">Elevator Attendants</option>
//               <option value="Busser">Busser</option>
//               <option value="Gardener/Landscaper">Gardener/Landscaper</option>
//               <option value="Engineer">Engineer</option>
//               <option value="Foreman">Foreman</option>
//               <option value="Architect">Architect</option>
//               <option value="Painter">Painter</option>
//               <option value="Draftsman">Draftsman</option>
//               <option value="Gymnasium Staff">Gymnasium Staff</option>
//               <option value="Campus Grass & Bushes Maintainer">
//                 Campus Grass & Bushes Maintainer
//               </option>
//               <option value="Laborer">Laborer</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label
//               htmlFor="keyword"
//               className="text-sm font-medium text-gray-600 mb-2"
//             >
//               Keyword
//             </label>
//             <input
//               type="text"
//               id="keyword"
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               placeholder="Enter new keyword"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Add Keyword
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-4 text-center text-sm ${
//               message.includes("Error") ? "text-red-500" : "text-green-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* Display Keywords for the Selected Category */}
//         {category && keywordsList.length > 0 && (
//           <div className="mt-6">
//             <div className="flex flex-wrap gap-4">
//               {keywordsList.map((item) => (
//                 <div
//                   key={item.keyword}
//                   className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full"
//                 >
//                   <span>{item.keyword}</span>
//                   <button
//                     onClick={() => handleDelete(item.keyword)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     x
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddKeyword;
