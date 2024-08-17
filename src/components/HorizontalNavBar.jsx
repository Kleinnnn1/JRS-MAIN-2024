import MyProfileDropdown from "./MyProfileDropdown";

export default function HorizontalNavBar() {
  return (
    <div className="py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button type="button" className="text-lg text-gray-600 sidebar-toggle">
        <i className="ri-menu-line"></i>
      </button>
      <a href="#" className="text-xs ml-8">
        joms@ustp.edu.ph +384-3478-984
      </a>
      <div className="text-xs font-semibold underline ml-auto">
        <MyProfileDropdown />
      </div>
    </div>
  );
}
