import React from "react";

function FormRow({ label, error, children }) {
  const childId = React.isValidElement(children) ? children.props.id : null;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={childId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default FormRow;
