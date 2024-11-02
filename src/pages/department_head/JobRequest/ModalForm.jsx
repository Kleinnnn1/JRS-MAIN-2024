import FormAssignStaff from "./FormAssignStaff";

export default function ModalForm({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") onClose();
  };

  return (
    <div
      id="modalBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutsideModal}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
          aria-label="Close Modal"
        >
          &times;
        </button>
        {/* Render the form component and pass onSubmit handler */}
        <FormAssignStaff onSubmit={onSubmit} />
      </div>
    </div>
  );
}
