import React, { useState, useEffect } from 'react';

export default function ReusableCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();

  // Function to generate the calendar for a specific month and year
  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const calendarDays = [];
    const weekHeader = daysOfWeek.map((day, index) => (
      <div key={index} className="text-center font-semibold">
        {day}
      </div>
    ));
    calendarDays.push(weekHeader);

    // Add empty days for the first week of the month
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, index) => (
      <div key={-index} className="text-center"></div>
    ));
    calendarDays.push(emptyDays);

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth() &&
        day === currentDate.getDate();
      const isSelected = selectedDate && selectedDate === `${month + 1}/${day}/${year}`;

      const dayClass = `text-center py-2 border cursor-pointer 
        ${isToday ? 'bg-yellow-500 text-white' : ''} 
        ${isSelected ? 'bg-green-500 text-white' : ''}`;

      calendarDays.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => handleDateClick(year, month, day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  // Handle date click event
  const handleDateClick = (year, month, day) => {
    const date = new Date(year, month, day);
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setSelectedDate(formattedDate);
  };

  // Event listeners for previous and next month buttons
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Modal close function
  const closeModal = () => {
    setSelectedDate(null);
  };

  useEffect(() => {
    // Generate the calendar when month or year changes
    generateCalendar(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="bg-gray-100 mt-2 flex items-center justify-center w-full">
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between max-h-full px-6 py-3 bg-custom-blue">
            <button onClick={handlePrevMonth} className="text-white">Previous</button>
            <h2 className="text-white text-xl items-center font-bold">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <button onClick={handleNextMonth} className="text-white">Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4" id="calendar" style={{ minHeight: 'calc(85vh - 250px)' }}>
            {generateCalendar(currentYear, currentMonth)}
          </div>
          {selectedDate && (
            <div id="myModal" className="modal fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
              <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                  <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Selected Date</p>
                    <button onClick={closeModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
                  </div>
                  <div className="text-xl font-semibold">{selectedDate}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
