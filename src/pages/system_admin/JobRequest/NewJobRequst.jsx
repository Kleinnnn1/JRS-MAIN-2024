import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function NewJobRequest() {
  const [fields, setFields] = useState([{ number: 1 }]); // Initial state with one field
  const navigate = useNavigate(); // Initialize useNavigate

  const addField = () => {
    setFields([...fields, { number: fields.length + 1 }]); // Add a new field with an incremented number
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      const newFields = fields.filter((_, i) => i !== index);
      // Reassign numbers to maintain the sequence
      const updatedFields = newFields.map((field, i) => ({ ...field, number: i + 1 }));
      setFields(updatedFields);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here

    // Display SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'Submitted',
      text: 'The job request has been successfully submitted!',
    });

    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="m-10 border border-black">
      <div className="bg-yellow-500 text-black text-md p-3 font-bold text-center">
        JOB REQUEST FORM
      </div>
      <div className="bg-white p-8 shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="flex justify-evenly items-center">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`requestId-${index}`}>
                  Item No.
                </label>
                <input
                  type="text"
                  id={`requestId-${index}`}
                  name={`requestId-${index}`}
                  className="border border-black rounded p-3 h-8 w-12"
                  value={field.number}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`requestTitle-${index}`}>
                  Work Description
                </label>
                <input
                  type="text"
                  id={`requestTitle-${index}`}
                  name={`requestTitle-${index}`}
                  className="border border-black rounded h-8 p-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`description-${index}`}>
                  Location
                </label>
                <input
                  id={`description-${index}`}
                  name={`description-${index}`}
                  className="border border-black rounded h-8 p-3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`priority-${index}`}>
                  Photo
                </label>
                <div
                  id={`priority-${index}`}
                  name={`priority-${index}`}
                  className="flex items-center text-center border border-black h-8 w-52 rounded"
                  required
                >
                  <div className='bg-gray-400 h-8 rounded-l-md w-20 text-xs'>Choose Image</div>
                </div>
              </div>

              <div className="flex justify-end text-center">
                {index === fields.length - 1 ? (
                  <div
                    type="button"
                    onClick={addField}
                    className="w-12 h-8 mt-7 bg-green-500 text-white text-3xl font-bold rounded-md hover:bg-black flex items-center justify-center"
                  >
                    <Add />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="w-12 h-8 mt-7 bg-red-500 text-white text-3xl font-bold rounded-md hover:bg-black flex items-center justify-center"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-32 h-10 bg-blue-500 text-white text-lg font-bold rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
