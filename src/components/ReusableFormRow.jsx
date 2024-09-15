import React from "react";
import PropTypes from "prop-types";

function FormRow({
  label = "",
  error = "",
  children,
  labelClassName = "",
  containerClassName = "",
  errorClassName = "",
}) {
  const childId = React.isValidElement(children) ? children.props.id : null;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={childId}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className={`text-red-500 text-sm ${errorClassName}`}>
          {error}
        </span>
      )}
    </div>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default FormRow;

// import React from "react";
// import PropTypes from "prop-types";

// function FormRow({
//   label,
//   error,
//   children,
//   labelClassName,
//   containerClassName,
//   errorClassName,
// }) {
//   const childId = React.isValidElement(children) ? children.props.id : null;

//   return (
//     <div className={`mb-4 ${containerClassName}`}>
//       {label && (
//         <label
//           htmlFor={childId}
//           className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
//         >
//           {label}
//         </label>
//       )}
//       {children}
//       {error && (
//         <span className={`text-red-500 text-sm ${errorClassName}`}>
//           {error}
//         </span>
//       )}
//     </div>
//   );
// }

// FormRow.propTypes = {
//   label: PropTypes.string, // The label text for the form field
//   error: PropTypes.string, // The error message to display
//   children: PropTypes.node.isRequired, // The form field (input, select, etc.)
//   labelClassName: PropTypes.string, // Optional class names for the label
//   containerClassName: PropTypes.string, // Optional class names for the container div
//   errorClassName: PropTypes.string, // Optional class names for the error message
// };

// FormRow.defaultProps = {
//   label: "",
//   error: "",
//   labelClassName: "",
//   containerClassName: "",
//   errorClassName: "",
// };

// export default FormRow;
