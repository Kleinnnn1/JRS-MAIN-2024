import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SetDate = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleIconClick = () => {
    alert("Check icon clicked!");
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="pl-8 pr-1 py-1 text-sm font-medium rounded-lg bg-white-100 text-black placeholder-white placeholder-opacity-50 placeholder-italic font-mono border border-black w-40"
        />

        {/* Left Icon */}
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          📅
        </span>

        {/* Right Icon with cursor-pointer and clickable */}
        <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleIconClick} // Action on icon click
        >
          ✅
        </span>
      </div>
    </div>
  );
};

export default SetDate;
