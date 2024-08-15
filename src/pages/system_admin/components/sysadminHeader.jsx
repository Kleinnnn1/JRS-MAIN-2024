import PropTypes from 'prop-types';
import profilePicture from '/src/assets/images/SysAdIcons/Saturo_Gojo.png'; // Import your profile picture

const SysAdminHeader = ({ headerText }) => {
    return (
        <div className="py-2 px-6 bg-yellow-400 flex items-center justify-between min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <div className="flex items-center">
                <button type="button" className="text-lg text-gray-600 sidebar-toggle">
                    <p className="text-xs">[ { headerText } ] </p>
                </button>
                <a href="#" className="text-xs ml-10">jrs@ustp.edu.ph +384-3478-984</a>
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

SysAdminHeader.propTypes = {
    headerText: PropTypes.string.isRequired, 
};

export default SysAdminHeader;
