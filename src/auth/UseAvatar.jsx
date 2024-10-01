import React, { useMemo } from "react";
import { useUser } from "./useUser";
import DefaultImageUser from "../assets/images/DefaultImageUser.jpg";

const UseAvatar = React.memo(function UseAvatar() {
  const { user } = useUser();

  // Memoize user data to avoid recalculating unnecessarily
  const { lname, fname, avatar, userrole } = useMemo(() => {
    return user?.user_metadata || {};
  }, [user]);

  return (
    <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
      <img
        src={avatar || DefaultImageUser}
        alt={`Avatar of ${fname} ${lname}`}
        className="w-16 h-16 rounded-full border border-black object-cover mb-2"
      />
      <p className="font-semibold text-sm">
        {fname} {lname}
      </p>
      <p className="text-xs">{userrole}</p>
    </div>
  );
});

export default UseAvatar;

// import { useUser } from "./useUser";
// import DefaultImageUser from "../assets/images/DefaultImageUser.jpg"; // Ensure the path is correct

// function UseAvatar() {
//   const { user } = useUser();
//   const { lname, fname, avatar, userrole } = user?.user_metadata || {}; // Handle cases where user or user_metadata might be undefined

//   return (
//     <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
//       <img
//         src={avatar || DefaultImageUser} // Use default image if avatar is not available
//         alt={`Avatar of ${fname} ${lname}`} // Use backticks for template literals
//         className="w-16 h-16 rounded-full border border-black object-cover mb-2"
//       />
//       <p className="font-semibold text-sm">
//         {fname} {lname}
//       </p>
//       <p className="text-xs">{userrole}</p>
//     </div>
//   );
// }

// export default UseAvatar;

// import { useUser } from "./useUser";

// function UseAvatar() {
//   const { user } = useUser();
//   const { lname, fname, avatar, userrole } = user.user_metadata;

//   return (
//     <>
//       <img
//         src={avatar}
//         alt="Profile"
//         className="w-16 h-16 rounded-full  border border-black object-cover mb-2"
//       />
//       <p className="font-semibold text-xm">{${lname} + {fname} }</p>
//       <p className="text-xs">{userrole}</p>
//     </>
//   );
// }

// export default UseAvatar;
