import Swal from "sweetalert2";

export default function RequestorSaveChangesButton() {
    const handleSaveChanges = () => {
        Swal.fire({
            title: "Do you want to save changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Saved!",
                    text: "Your changes have been saved.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
        });
    };

    return (
        <button
            className="bg-blue-400 p-3 rounded-lg mr-5 text-white hover:bg-blue-500 active:bg-blue-600"
            onClick={handleSaveChanges}
        >
            Save Changes
        </button>
    );
}
