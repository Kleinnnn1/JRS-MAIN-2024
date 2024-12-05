import PropTypes from "prop-types";
import { useState } from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";

export default function SideBar({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex relative">

      {children}

    </div>
  );
}

SideBar.propTypes = {
  children: PropTypes.node, // children can be any valid React node
};
