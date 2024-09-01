import { useLogout } from "../auth/useLogout";

export default function MyProfileDropdown() {
  const { logout } = useLogout();

  const handleSelectChange = (event) => {
    if (event.target.value === "Logout") {
      logout();
    }
    // You can handle other options here if needed
  };

  return (
    <select
      id="profileDropdown"
      name="profile"
      className="bg-yellow-400 border-none focus:ring-0 focus:outline-none text-lg"
      defaultValue="Kenneth"
      onChange={handleSelectChange} // Handle change event
    >
      <option value="Kenneth" disabled hidden>
        Kenneth
      </option>
      <option value="Profile">Profile</option>
      <option value="Logout">Logout</option>
    </select>
  );
}
