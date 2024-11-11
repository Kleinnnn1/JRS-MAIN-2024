import { useState } from "react";

const SetTimeAssessment = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleAssessmentClick = () => {
    alert(
      `Time assessment set to: ${days} days, ${hours} hours, ${seconds} seconds`
    );
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Days Input */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-600">Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min="0"
          className="w-16 p-1 text-center text-sm font-medium rounded-lg bg-white border border-black"
        />
      </div>

      {/* Hours Input */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-600">Hours</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          min="0"
          max="23"
          className="w-16 p-1 text-center text-sm font-medium rounded-lg bg-white border border-black"
        />
      </div>

      {/* Seconds Input */}
      <div className="flex flex-col items-center">
        <label className="text-xs text-gray-600">Seconds</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          min="0"
          max="59"
          className="w-16 p-1 text-center text-sm font-medium rounded-lg bg-white border border-black"
        />
      </div>

      {/* Assessment Icon */}
    </div>
  );
};

export default SetTimeAssessment;
