import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

export default function StatusCardAndCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6">
  <div className="grid lg:grid-cols-3 gap-5 h-[50vh]">
    {/* NOTIFICATION */}
        <div
          className="bg-white border border-black border-opacity-30 lg:col-span-2 shadow-md shadow-black/60 flex flex-col justify-between h-full"
          style={{
            borderRadius: '12px', // Rounded corners for a modern look
            overflow: 'hidden', // Ensures content stays within the rounded corners
          }}
        >
          <div
            className="bg-yellow-400 border-b border-black border-opacity-10px"
            style={{
              padding: '12px', // Adds more space around the text
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adds subtle shadow to the header
            }}
          >
            <div className="text-xl text-black font-semibold">
              Notifications
            </div>
          </div>
          <div
            className="p-4 flex-grow"
            style={{
              backgroundColor: '#f7f7f7', // Light gray background for the notification body
              color: '#4a4a4a', // Dark gray text color
              fontSize: '1rem', // Slightly larger font size for readability
              lineHeight: '1.5', // Increases line height for better readability
            }}
          >
            <p>No new notifications</p> {/* Placeholder for the notifications content */}
          </div>
        
        </div>


        {/* CALENDAR */}
       
        <div className="bg-red border-b border-black p-10 lg:col-span-1 shadow-md shadow-black/60 flex flex-col justify-between h-full rounded-lg">
        <div
          className="text-xl text-black font-semibold flex-grow flex items-center justify-center"
          style={{
            backgroundColor: '#f0f0f0', // Light gray background for contrast
            padding: '20px', // Adds space around the text
            borderRadius: '8px', // Smooths the corners of the container
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
            textTransform: 'uppercase', // Makes the text uppercase
            letterSpacing: '2px', // Adds spacing between letters for a modern look
            fontFamily: "'Roboto', sans-serif", // Sets the font to Roboto
            color: '#333', // Dark gray text color
            fontSize: '1.5rem', // Increases font size
            transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
          }}   >
          CALENDAR
        </div>

        <div className="p-4 flex-grow flex items-center justify-center"> {/* Use flexbox to center */}
            <Calendar
            onChange={setDate}
            value={date}
            />
        </div>    
        </div>
        

      </div>
    </div>
  );
}

