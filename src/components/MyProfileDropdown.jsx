export default function MyProfileDropdown() {
  return (
    <select
      id="profileDropdown" // Unique id for the dropdown
      name="profile" // Name attribute for form handling
      className="bg-yellow-400 border-none focus:ring-0 focus:outline-none text-lg"
      defaultValue="Kenneth"
    >
      <option value="Kenneth" disabled hidden>
        Kenneth
      </option>
      <option value="Profile">Profile</option>
      <option value="Logout">Logout</option>
    </select>
  );
}
