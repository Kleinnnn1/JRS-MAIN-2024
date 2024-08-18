import React from 'react';

const PageSubTitle = ({ title, iconSrc }) => {
    return (
        <div className="flex items-center rounded bg-custom-blue m-2 p-2">
            <img src={iconSrc} alt="Icon" className="w-9 h-9 ml-4" />
            <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>{title}</p>
        </div>
    );
};

export default PageSubTitle;