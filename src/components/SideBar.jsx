import PropTypes from "prop-types";

export default function SideBar({ children }) {
  return (
    <nav className="fixed left-0 top-0 w-64 h-full bg-blue-950 p-4 z-50 sidebar-menu transition-transform">
      {children}
    </nav>
  );
}

SideBar.propTypes = {
  children: PropTypes.node, // children can be any valid React node
};
