<<<<<<< HEAD:src/pages/requestor/RequestorGlobalComponents/RequestorProfile.jsx
import ProfilePic from "/src/assets/images/BabyKaren.jpg";
=======
import useUserStore from "../../../store/useUserStore";
import ProfilePic from "/src/assets/images/kennimg.jpg";
import DefaultImageUser from "../../../assets/images/DefaultImageUser.jpg";
>>>>>>> RaphaelMerge3:src/pages/department_head/Dashboard/Profile.jsx

export default function Profile() {
  const { userMetadata } = useUserStore();
  return (
    <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
      <img
        src={userMetadata.avatar || DefaultImageUser}
        alt="Profile"
        className="w-16 h-16 rounded-full  border border-black object-cover mb-2"
      />
<<<<<<< HEAD:src/pages/requestor/RequestorGlobalComponents/RequestorProfile.jsx
      <p className="font-semibold text-xm">Karen C. Cadalo</p>
      <p className="text-xs">Faculty Teacher</p>
=======
      <p className="font-semibold text-xm">
        {userMetadata.fName} {userMetadata.lName}
      </p>
      <p className="text-xs">{userMetadata.role}</p>
>>>>>>> RaphaelMerge3:src/pages/department_head/Dashboard/Profile.jsx
    </div>
  );
}
