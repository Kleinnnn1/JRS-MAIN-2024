import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";


export async function getClientSatisfactionSurvey(){
    const currentUser = await getCurrentUser();
    const { data, error } = await supabase
      .from("Client_satisfaction_survey")
      .select("*") // Select all columns
    //   .eq("idNumber", currentUser.idNumber); // Match the idNumber from the current user's profile
  
    if (error) {
      console.error("Error fetching requests:", error);
      throw new Error("Request could not be loaded");
    }
    console.log(data);
  
    return data; // Return the fetched data
  }



  
export async function insertSurvey(newSurvey) {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.idNumber) {
      console.error("No current user or idNumber found.");
      throw new Error("User not authenticated or idNumber is missing");
    }
  
    // Prepare the data to insert
    const cssData = {
      name: currentUser.idNumber, // Add requestor here
      email: currentUser.idNumber,
      clientType: newSurvey.clientType,
      role: newSurvey.role, // Ensure priority is included
      sex: newSurvey.sex,
      age: newSurvey.age,
      region: newSurvey.region,
      campus: newSurvey.campus,
      transactedOffice: newSurvey.transactedOffice,
      serviceAvailed: newSurvey.serviceAvailed,
      ccAwareness: newSurvey.ccAwareness,
      ccVisibility: newSurvey.ccVisibility,
      ccHelp: newSurvey.ccHelp,
      SQD0: newSurvey.SQD0,
      SQD1: newSurvey.SQD1,
      SQD2: newSurvey.SQD2,
      SQD3: newSurvey.SQD3,
      SQD4: newSurvey.SQD4,
      SQD5: newSurvey.SQD5,
      SQD6: newSurvey.SQD6,
      SQD7: newSurvey.SQD7,
      SQD8: newSurvey.SQD8,
      comments: newSurvey.comments
    };
  
    // Log the request data to verify
    console.log("Request Data to Insert:", cssData);
  
    // Insert the request into the "Request" table
    const { data, error } = await supabase.from("Client_satisfaction_survey").insert(cssData);
  
    if (error) {
      console.error("Error inserting request:", error);
      throw new Error("Request could not be inserted");
    }
  
    return data; // Return the inserted request data
  }
  
  
  