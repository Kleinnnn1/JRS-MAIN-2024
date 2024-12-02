
//apiGetJobRequestById.js
import supabase from "./supabase";

export const getJobRequestById = async (requestId) => {
  try {
    const { data, error } = await supabase
      .from('Request')  // Replace with the correct table name
      .select('*')
      .eq('requestId', requestId)  // Assuming 'request_id' is the column in your table
      .single();  // Only fetch one row

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};