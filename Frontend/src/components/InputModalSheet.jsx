import React from "react";
import { GiTireIronCross } from "react-icons/gi";

const InputModalSheet = ({ children, onClose, isOpen }) => {
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".modal-content")) onClose();
  };

  return (
    <div
      onClick={handleOutsideClick}
      className={`z-10 fixed  flex justify-center items-center inset-0  overflow-y-auto px-4 py-6 sm:px-0 bg-gray-900 bg-opacity-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? "opacity-100 translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="modal-content relative z-20 m-auto rounded-lg px-5 py-6 bg-white w-1/2">
        <div onClick={onClose} className="right-10  absolute h-6 w-6  flex rounded-full items-center justify-center  bg-red-400">
          <button className="  text-white" >
            <GiTireIronCross />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default InputModalSheet;
