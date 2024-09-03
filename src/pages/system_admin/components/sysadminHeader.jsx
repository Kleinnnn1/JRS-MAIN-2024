
import profilePicture from '/src/assets/images/SysAdIcons/Saturo_Gojo.png'; // Import your profile picture
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function SysAdminHeader() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to handle dropdown change
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        if (value === 'Profile') {
            navigate('/system_admin/myprofile'); // Redirect to "myprofile" route
        } else if (value === 'Logout') {
            // Handle logout logic here
        }
    };

    return (
        <div className="py-2 px-6 bg-yellow-400 flex items-center justify-between min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <div className="flex items-center">
                <a href="#" className="text-xs">jrs@ustp.edu.ph +384-3478-984</a>
            </div>
            <div className="flex items-center">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className='bg-yellow-400 font-bold text-xs font-inter'>Satoru</p>
                <select
                    id="profileDropdown"
                    name="profile"
                    className="bg-yellow-400 text-xs font-inter border-none focus:ring-0 focus:outline-none text-lg"
                    defaultValue=""
                    onChange={handleDropdownChange} // Attach the change handler
                >
                    <option value="" disabled></option>
                    <option value="Profile">[Profile]</option>
                    <option value="Logout">Logout</option>
                </select>
            </div>
        </div>
    );
}
