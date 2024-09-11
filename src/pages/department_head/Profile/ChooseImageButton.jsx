import { useState } from "react";

export default function ChooseImageButton({ setSelectedFile }) {
  const [avatarName, setAvatarName] = useState("No file chosen");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarName(file.name); // Display the file name
      setSelectedFile(file); // Set the selected file in parent state
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="avatar"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Choose Image
      </label>
      <span className="mt-2">{avatarName}</span> {/* Display file name */}
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the actual file input
      />
    </div>
  );
}

// import { useState } from "react";

// export default function ChooseImageButton({ setSelectedFile }) {
//   // const handleFileChange = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     setSelectedFile(file); // Set the selected file in state
//   //   }
//   // };

//   const [avatar, setAvatar] = useState(null);

//   return (
//     <label htmlFor="avatar" className="cursor-pointer">
//       <input
//         className="flex items-center border border-black py-2 px-4"
//         id="avatar"
//         type="file"
//         accept="image/*"
//         onChange={(e) => setAvatar(e.target.files[0])}
//       />
//     </label>
//   );
// }

// export default function ChooseImageButton() {
//   return (
//     <div className="flex items-center border border-black py-2 px-4">
//       <button className="  rounded-lg">Upload Image</button>
//     </div>
//   );
// }
