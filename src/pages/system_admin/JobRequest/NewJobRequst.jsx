import { useState } from 'react';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function SysAdminNewRequest() {
  const [fields, setFields] = useState([{ number: 1, jobType: '' }]); // Include jobType in initial state
  const navigate = useNavigate(); // Initialize useNavigate

  const addField = () => {
    setFields([...fields, { number: fields.length + 1, jobType: '' }]); // Add new field with jobType
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      const newFields = fields.filter((_, i) => i !== index);
      // Reassign numbers to maintain the sequence
      const updatedFields = newFields.map((field, i) => ({ ...field, number: i + 1 }));
      setFields(updatedFields);
    }
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here

    // Log each field for debugging
    fields.forEach(field => {
      console.log('Item No.:', field.number);
      console.log('Work Description:', field.workDescription);
      console.log('Location:', field.location);
      console.log('Photo:', field.photo);
      console.log('Job Type:', field.jobType);
    });

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
            <div key={index} className="flex flex-wrap mb-4 gap-10">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`requestId-${index}`}>
                  Item No.
                </label>
                <input
                  type="text"
                  id={`requestId-${index}`}
                  name="number"
                  className="border border-black rounded p-3 h-8 "
                  value={field.number}
                  readOnly
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`requestTitle-${index}`}>
                  Work Description
                </label>
                <input
                  type="text"
                  id={`requestTitle-${index}`}
                  name="workDescription"
                  className="border border-black rounded h-8 p-3 w-full"
                  value={field.workDescription || ''}
                  onChange={(e) => handleFieldChange(index, e)}
                  required
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`description-${index}`}>
                  Location
                </label>
                <input
                  type="text"
                  id={`description-${index}`}
                  name="location"
                  className="border border-black rounded h-8 p-3 w-full"
                  value={field.location || ''}
                  onChange={(e) => handleFieldChange(index, e)}
                  required
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`jobType-${index}`}>
                  Job Type
                </label>
                <input
                  type="text"
                  id={`jobType-${index}`}
                  name="jobType"
                  className="border border-black rounded h-8 p-3 w-full"
                  value={field.jobType || ''}
                  onChange={(e) => handleFieldChange(index, e)}
                  required
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor={`photo-${index}`}>
                  Photo
                </label>
                <div
                  id={`photo-${index}`}
                  name="photo"
                  className="flex items-center text-center border border-black h-8 w-full rounded"
                  required
                >
                  <div className='bg-gray-400 h-8 rounded-l-md w-20 text-xs'>Choose Image</div>
                </div>
              </div>

              <div className="flex items-center mt-6 justify-center w-full lg:w-auto">
                {index === fields.length - 1 ? (
                  <div
                    type="button"
                    onClick={addField}
                    className="w-12 h-8 bg-green-500 text-white text-3xl font-bold rounded-md hover:bg-black flex items-center justify-center"
                  >
                    <Add />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="w-12 h-8 bg-red-500 text-white text-3xl font-bold rounded-md hover:bg-black flex items-center justify-center"
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
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
