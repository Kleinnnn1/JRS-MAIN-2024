import PropTypes from 'prop-types';
import profilePicture from '/src/assets/images/SysAdIcons/Saturo_Gojo.png'; // Import your profile picture

export default function SysAdminHeader ()  {
    return (
        <div className="py-2 px-6 bg-yellow-400 flex items-center justify-between min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <div className="flex items-center">
                
                <a href="#" className="text-xs ">jrs@ustp.edu.ph +384-3478-984</a>
            </div>
            <div className="flex items-center">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className="text-xs font-inter">Saturo Gojo</p>
            </div>
        </div>
    );
}

