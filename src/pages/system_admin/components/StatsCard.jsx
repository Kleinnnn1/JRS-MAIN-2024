import PropTypes from "prop-types";

const StatsCard = ({ title, value, dateRange, iconSrc, textColor }) => (
    <div className="bg-white border border-gray-300 rounded p-4 w-80">
        <p className="text-s font-inter text-left">{title}</p>
        <div className="flex items-center mt-4">
            <div>
                <p className={`text-xl font-bold ${textColor} font-inter`}>{value}</p>
                <p className="text-xs font-inter text-left">{dateRange}</p>
            </div>
            <img src={iconSrc} alt={`${title} Icon`} className="w-14 h-12 ml-20 mb-5" />
        </div>
    </div>
);

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dateRange: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
};

export default StatsCard;
