import PropTypes from "prop-types";
import { useNavigate, useState } from "react-router-dom";
import HomeSidebarIcon from "/src/assets/images/iconSideBarHome.png";

export default function SidebarItemDropDown({
  main_name,
  main_url,
  sub_items,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMainClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (main_url) {
      navigate(main_url);
    }
  };

  const handleSubItemClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <div>
      <div
        onClick={handleMainClick}
        className="group-[.active]:bg-blue-950 group-[.active]:text-white cursor-pointer flex items-center py-1 px-4 my-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md"
      >
        <img
          src={HomeSidebarIcon}
          alt="Job Request Icon"
          className="w-4 h-4 mr-3"
        />
        <span className="text-sm">{main_name}</span>
        <svg
          className={`ml-auto transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="ml-8 mt-2 space-y-2">
          {sub_items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSubItemClick(item.url)}
              className="flex items-center py-1 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Define PropTypes for the component
SidebarItemDropDown.propTypes = {
  main_name: PropTypes.string.isRequired, // main_name is required and should be a string
  main_url: PropTypes.string, // main_url is optional and should be a string
  sub_items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Each sub-item must have a name which is a required string
      url: PropTypes.string, // Each sub-item may have a url which is an optional string
    })
  ).isRequired, // sub_items is required and should be an array of item objects
};
