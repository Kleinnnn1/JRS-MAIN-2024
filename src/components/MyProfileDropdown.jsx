import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../auth/useLogout";
import useUserStore from "../store/useUserStore";

export default function MyProfileDropdown() {
  const { userMetadata } = useUserStore();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Kenneth");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "Logout") {
      logout();
    } else if (value === "Profile") {
      navigate("/department_head/myprofile");
      setSelectedOption("Kenneth"); // Reset to "Kenneth" after navigating
    }
  };

  return (
    <select
      id="profileDropdown"
      name="profile"
      className="bg-yellow-400 border-none focus:ring-0 focus:outline-none text-lg"
      value={selectedOption} // Controlled component with state
      onChange={handleSelectChange} // Handle change event
    >
      <option value="Kenneth" disabled hidden>
        {userMetadata.lName}
      </option>
      <option value="Profile">Profile</option>
      <option value="Logout">Logout</option>
    </select>
  );
}
