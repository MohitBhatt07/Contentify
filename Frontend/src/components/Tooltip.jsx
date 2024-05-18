import React, { useState } from 'react';

const Tooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const closeTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="ml-2 relative inline-block">
      <span
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        onMouseOver={toggleTooltip}
        onMouseLeave={closeTooltip}
      >
        &#9432;
      </span>
      {isTooltipVisible && (
        <div
          className="absolute z-10 py-2 px-4 w-52 bg-white border border-gray-300 rounded-md shadow-md"
          onMouseLeave={closeTooltip}
        >
          <p className='text-sm font-semibold text-violet-800'>TIP : you can write table name and entity name in either one word(eg. train , person,name ,etc.) 
            or you can use camel case for multiple words (eg. train_name , person_age , etc.).
          </p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
