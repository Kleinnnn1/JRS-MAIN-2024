import supabase from "./supabase";

export async function signUp({
  fname,
  lname,
  idnumber,
  email,
  password,
  userrole,
  contactnumber,
  departmentid,
  jobid,
}) {
  try {
    console.log("SignUp Data:", {
      fname,
      lname,
      idnumber,
      email,
      password,
      userrole,
      contactnumber,
      departmentid,
      jobid,
    });

    // Sign up the user with email and password and pass metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fname,
          lname,
          idnumber,
          userrole,
          contactnumber,
          departmentid,
          jobid,
        },
      },
    });

    if (authError) throw new Error(`Auth Error: ${authError.message}`);

    // If sign up is successful, store additional user data in the "profiles" table
    const { user } = authData;

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id, // Use the user's ID as the foreign key
        fname,
        lname,
        idnumber,
        password,
        email,
        userrole,
        contactnumber,
        departmentid,
        jobid,
        avatar: "",
      },
    ]);

    if (profileError) throw new Error(`Profile Error: ${profileError.message}`);

    return authData;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error; // re-throw the error to be caught by the mutation's onError
  }
}

export async function updateUserInformation({ fname, lname, contactNumber }) {
  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      throw new Error(userError.message);
    }

    console.log("Updating user information...");
    console.log("User ID:", user.id);
    console.log("Update data:", { fname, lname, contactnumber: contactNumber });

    // Update the user's information in the "profiles" table
    const { data, error } = await supabase
      .from("profiles")
      .update({
        fname,
        lname,
        contactnumber: contactNumber, // Ensure column name matches your table schema
      })
      .eq("id", user.id); // Use the current user's ID to update

    if (error) {
      console.error("Error updating user information:", error.message);
      throw new Error(error.message);
    }

    console.log("User information updated successfully:", data);

    // Optionally, fetch and log the current session to ensure it's valid
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error fetching session:", sessionError.message);
      throw new Error(sessionError.message);
    }

    console.log("Current session data:", sessionData);

    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// export async function updateUserInformation({ fname, lname, contactNumber }) {
//   // Update the user's first name, last name, and contact number in the profiles table directly
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError) {
//     console.error("Error fetching user:", userError.message);
//     throw new Error(userError.message);
//   }

//   const { data, error } = await supabase
//     .from("profiles")
//     .update({
//       fname,
//       lname,
//       contactnumber: contactNumber, // Correct column name is 'contactnumber'
//     })
//     .eq("id", user.id); // Update based on the current user's ID

//   if (error) {
//     console.error("Error updating user information:", error.message);
//     throw new Error(error.message);
//   }

//   // Ensure session is refreshed after update to prevent logout
//   await supabase.auth.refreshSession();

//   console.log("User information updated successfully:", data);
//   return data;
// }

// export async function updateContactNumber({ contactNumber }) {
//   // Get the current user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError) {
//     console.error("Error fetching user:", userError.message);
//     throw new Error(userError.message);
//   }

//   // Update the contact number in Supabase
//   const { data, error } = await supabase
//     .from("profiles")
//     .update({ contactnumber: contactNumber }) // Correct column name is 'contactnumber'
//     .eq("id", user.id); // Update based on the current user's ID

//   // Handle error
//   if (error) {
//     console.error("Error updating contact number:", error.message);
//     throw new Error(error.message);
//   }

//   // Log success message
//   console.log("Contact number updated successfully:", data);

//   return data;
// }

export async function updatePassword({ password }) {
  // Update the user's password using Supabase Auth API
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error("Error updating password:", error.message);
    throw new Error(error.message);
  }

  console.log("Password updated successfully.");
  return true;
}

export async function updateAvatar({ avatar }) {
  const imageName = `${Date.now()}-${avatar.name.replace(/[^\w.-]/g, "")}`;

  try {
    // 1. Upload the avatar image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    console.log("Upload successful");

    // 2. Get the public URL for the uploaded image
    const { data, error: urlError } = supabase.storage
      .from("avatars")
      .getPublicUrl(imageName);

    if (urlError) {
      throw new Error(`Failed to get public URL: ${urlError.message}`);
    }

    const publicURL = data.publicUrl;

    if (!publicURL) {
      throw new Error(
        "Public URL is undefined. Response Data: " + JSON.stringify(data)
      );
    }

    console.log("Public URL:", publicURL);

    // 3. Get the current user session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(`Failed to get session: ${sessionError.message}`);
    }

    const user = sessionData?.session?.user;

    if (!user) {
      throw new Error("User is not logged in");
    }

    console.log("User ID:", user.id);

    // 4. Update the user's profile with the new avatar URL
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update({ avatar: publicURL })
      .eq("id", user.id)
      .select(); // Ensure .select() to retrieve the updated record

    if (profileError) {
      console.error("Error updating profile:", profileError);
      throw new Error(`Failed to update profile: ${profileError.message}`);
    }

    // Log profileData for debugging
    console.log("Profile update response data:", profileData);

    // Check if profileData and profileData.data are defined and contain the expected data
    if (profileData && profileData.length > 0 && profileData[0]) {
      console.log("Updated Profile Data:", profileData[0]);
      return profileData[0]; // Return the updated profile data
    } else {
      console.error(
        "Profile update response data is empty or not as expected:",
        profileData
      );
      throw new Error("Profile update did not return data");
    }
  } catch (error) {
    console.error("Error in updateAvatar:", error.message);
    throw error;
  }
}

export async function login({ idnumber, password }) {
  // Fetch user by idnumber and include all necessary fields
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select(
      "id, email, userrole, avatar, fname, lname, idnumber, contactnumber, departmentid, jobid"
    )
    .eq("idnumber", idnumber)
    .single();

  if (userError || !userData) {
    throw new Error("Provided ID number or password are incorrect");
  }

  // Authenticate with email from fetched user data
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });

  if (authError) throw new Error(authError.message);

  // Update user metadata with the additional profile information
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      userrole: userData.userrole,
      avatar: userData.avatar,
      fname: userData.fname,
      lname: userData.lname,
      idnumber: userData.idnumber,
      contactnumber: userData.contactnumber,
      departmentid: userData.departmentid,
      jobid: userData.jobid,
    },
  });

  if (metadataError) {
    console.error("Failed to update user metadata:", metadataError.message);
  }

  // Return combined user data including updated metadata
  return {
    ...authData,
    user: {
      ...authData.user,
      userrole: userData.userrole,
      avatar: userData.avatar,
      fname: userData.fname,
      lname: userData.lname,
      idnumber: userData.idnumber,
      contactnumber: userData.contactnumber,
      departmentid: userData.departmentid,
      jobid: userData.jobid,
    },
  };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw new Error(authError.message);

  // Fetch additional user details from the `profiles` table using the user's id
  const userId = authData?.user?.id;
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  // Merge authData with profileData
  return {
    ...authData.user,
    ...profileData,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
