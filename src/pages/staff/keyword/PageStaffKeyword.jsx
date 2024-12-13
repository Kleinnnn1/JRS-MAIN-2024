import React, { useState, useEffect } from "react";
import supabase from "../../../service/supabase"; // Adjust path based on where you set up your Supabase client

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

  const { data: profileData, error: profileError } = await supabase
    .from("User")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

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
  const [showKeywords, setShowKeywords] = useState(false);

  const fetchKeywords = async (category) => {
    if (!category) return;

    const { data, error } = await supabase
      .from("keyword_mappings")
      .select("keyword")
      .eq("category", category);

    if (error) {
      setMessage(`Error fetching keywords: ${error.message}`);
    } else {
      setKeywordsList(data);
    }
  };

  const fetchStaffJobCategory = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setMessage("User not found.");
        return;
      }

      const { data, error } = await supabase
        .from("User")
        .select("jobCategory")
        .eq("fullName", user.fullName)
        .single();

      if (error) {
        setMessage(`Error fetching staff job category: ${error.message}`);
      } else {
        setStaffJobCategory(data?.jobCategory || "");
        setCategory(data?.jobCategory || "");
        fetchKeywords(data?.jobCategory);
      }
    } catch (err) {
      setMessage(`Error fetching staff data: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchStaffJobCategory();
  }, []);

  useEffect(() => {
    fetchKeywords(category);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !keyword) {
      setMessage("Please select a category and enter a keyword.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("keyword_mappings")
        .insert([{ category: category, keyword: keyword }]);

      if (error) {
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
        fetchKeywords(category);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (keywordToDelete) => {
    try {
      const { data, error } = await supabase
        .from("keyword_mappings")
        .delete()
        .eq("category", category)
        .eq("keyword", keywordToDelete);

      if (error) {
        setMessage(`Error deleting keyword: ${error.message}`);
      } else {
        setMessage(
          `Keyword "${keywordToDelete}" deleted from category "${category}"`
        );
        fetchKeywords(category);
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
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled
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

        <button
          onClick={() => setShowKeywords((prev) => !prev)}
          className="w-full py-2 mt-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {showKeywords ? "Hide Keywords" : "Show Keywords"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        {category && showKeywords && keywordsList.length > 0 && (
          <div className="mt-6 max-h-40 max-w-full overflow-y-auto border border-gray-300 rounded-md p-2">
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
