
import PropTypes from "prop-types";

const StatusCard = ({ title, count, statusColor, statusText }) => (
    <div className='bg-white ml-6 mr-6'>
        <p className="text-s flex justify-center font-inter text-left">{title}</p>
        <div className="flex items-center mt-4">
            <div>
                <p className={`text-s ${statusColor} font-inter ml-4 text-left`}>{count}</p>
            </div>
            <div className={`${statusColor} ml-2 rounded`}>
                <p className="text-xs p-1 ml-2 mr-2 text-white font-inter text-center">{statusText}</p>
            </div>
        </div>
    </div>
);

export default StatusCard;
StatusCard.propTypes = {
title: PropTypes.string.isRequired, 
count: PropTypes.number.isRequired, 
statusColor: PropTypes.string,
statusText: PropTypes.string,
};